import React from "react";
import style from "./temi.module.scss";
import { tTemi, tAutriciTemi, tAutrice, tLuoghi } from "@/type";
import { formatDataFromApi } from "@/utility/generic";
import Link from "next/link";
import ImagePreload from "../loaders/imagePreLoad";
function TemiAutrici({
  data,
  temiAutrici,
  autrici,
  luoghi,
}: {
  data: tTemi[];
  temiAutrici: tAutriciTemi[];
  autrici: tAutrice[];
  luoghi: tLuoghi[];
}) {
  return (
    <>
      <div className={style.titoloLista}>Autrici di riferimento:</div>
      <div className={style.temi__autrici}>
        {data[0].autrici.map((item, index) => {
          const autrice = getAutriciFromTema(item, temiAutrici, autrici);
          const autriceLuoghi = {
            nascita:
              luoghi.find((luogo) => luogo.id === autrice?.luogo_nascita) ||
              null,
            morte:
              luoghi.find((luogo) => luogo.id === autrice?.luogo_morte) || null,
          };
          return (
            <div key={index} className={style.temi__autrici__box}>
              {autrice?.immagine_principale && (
                <ImagePreload
                  loader={{
                    url: "/image/leiloader.svg",
                    width: 100,
                    height: 100,
                  }}
                  image={{
                    url:
                      process.env.NEXT_PUBLIC_ASSETS_URL +
                        autrice?.immagine_principale || "",
                    width: 500,
                    height: 500,
                    alt: autrice.nome + " " + autrice.cognome || "",
                  }}
                  type="fixed"
                  backgroundColor="#7a4535"
                  round
                />
              )}
              <div className={style.temi__autrici__box__text}>
                <h3>
                  <Link href={`/autrici/${autrice?.slug}`}>
                    {autrice?.nome} {autrice?.cognome}
                  </Link>
                </h3>

                <ul>
                  {autrice?.data_di_nascita && (
                    <li>
                      {" "}
                      {autriceLuoghi?.nascita && autriceLuoghi?.nascita.Nome}-
                      {formatDataFromApi(autrice?.data_di_nascita, {
                        year: "numeric",
                      })}
                    </li>
                  )}
                  {autrice?.data_di_nascita && (
                    <li>
                      {autriceLuoghi?.morte && autriceLuoghi?.morte.Nome}-
                      {formatDataFromApi(autrice?.data_di_morte, {
                        year: "numeric",
                      })}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
function getAutriciFromTema(
  idAutrici: number,
  temiautrici: tAutriciTemi[],
  autrici: tAutrice[]
) {
  const idautrice = temiautrici.find((idAutrice) => idAutrice.id === idAutrici);

  const autriceData = autrici.find(
    (autrice) => autrice.id === idautrice?.autrici_id
  );
  return autriceData;
}
export default TemiAutrici;
