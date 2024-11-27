"use client";

import style from "./map.module.scss";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

type Taddress = {
  city: string;
  number?: string;
  street: string;
};

async function fetchMapData(indirizzo: string) {
  const data = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${indirizzo}&format=json&polygon=1&addressdetails=1`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((errore) => console.log(errore + "error fetching data map"));

  return data;
}

const Mappa = dynamic(() => import("./mapLeaflet"));

function LeafletMain({ address }: { address: Taddress | null }) {
  const [mapdata, setMapdata] = useState<any | undefined>([]);
  const [error, setError] = useState("");

  function createAddress(
    street: string | null,
    city: string | null,
    numero: string | null
  ): string | null {
    if (city && street) {
      const streetsplit = street?.split(" ");
      const address = streetsplit?.join("+");
      const citySplit = city?.split(" ");
      const cityAddress = citySplit?.join("+");
      const addressString = `${address}+${numero}+${cityAddress}`;
      return addressString;
    } else {
      return null;
    }
  }

  useEffect(() => {
    async function fetchData(address: Taddress) {
      const addressComposed = createAddress(
        address.street,
        address.number || "",
        address.city
      );

      const data: any =
        addressComposed && (await fetchMapData(addressComposed));

      if (data) {
        setMapdata(data);
      } else {
        setError(data.error);
      }
    }
    if (address !== null) {
      fetchData(address);
    }
  }, [address]);

  return (
    <div className={style.mappa}>
      {mapdata.length > 0 ? (
        <Mappa
          position={[parseFloat(mapdata[0].lat), parseFloat(mapdata[0].lon)]}
          zoom={13}
        />
      ) : (
        <div
          style={{ height: "100%", textAlign: "center", paddingTop: "2rem" }}
        >
          {error ? "Errore nel caricamento dati mappa" : "Loading..."}
        </div>
      )}
    </div>
  );
}
export default LeafletMain;
