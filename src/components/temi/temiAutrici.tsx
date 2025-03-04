import React from "react";
import style from "./temi.module.scss";
import { tTemi, tAutriciTemi, tAutrice, tLuoghi } from "@/type";
import { formatDataFromApi } from "@/utility/generic";
import Image from "next/image";
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
          console.log(autrice?.luogo_morte, "test");

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
                <Image
                  src={
                    process.env.NEXT_PUBLIC_ASSETS_URL +
                    autrice?.immagine_principale
                  }
                  width={500}
                  height={500}
                  alt={"item.titolo"}
                />
              )}
              <div className={style.temi__autrici__box__text}>
                <h3>
                  {autrice?.nome} {autrice?.cognome}
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
  console.log(idautrice);
  const autriceData = autrici.find(
    (autrice) => autrice.id === idautrice?.autrici_id
  );
  return autriceData;
}
export default TemiAutrici;
