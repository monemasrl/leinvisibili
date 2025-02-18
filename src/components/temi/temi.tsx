"use client";
import React from "react";
import style from "./temi.module.scss";
import { tTemi, tAutriciTemi, tAutrice, tLuoghi } from "@/type";
import Image from "next/image";
import { formatDataFromApi } from "@/utility/generic";
import freccia from "../../../public/image/freccia.svg";
import Link from "next/link";
import { motion } from "motion/react";

function Temi({
  data,
  temiAutrici,
  autrici,
  mainTitle,
  luoghi,
}: {
  data: tTemi[];
  temiAutrici: tAutriciTemi[];
  autrici: tAutrice[];
  mainTitle: string;
  luoghi: tLuoghi[];
}) {
  function getAutriciFromTema(
    idAutrici: number,
    temiautrici: tAutriciTemi[],
    autrici: tAutrice[]
  ) {
    const idautrice = temiautrici.find(
      (idAutrice) => idAutrice.id === idAutrici
    );
    console.log(idautrice);
    const autriceData = autrici.find(
      (autrice) => autrice.id === idautrice?.autrici_id
    );
    return autriceData;
  }
  return (
    <div className={style.temi}>
      {mainTitle && <h2>{mainTitle}</h2>}
      <div className={style.temi__box}>
        <h2>{data[0].titolo}</h2>
        <p dangerouslySetInnerHTML={{ __html: data[0].testo }} />
        <div className={style.temi__autrici}>
          {data[0].autrici.map((item, index) => {
            const autrice = getAutriciFromTema(item, temiAutrici, autrici);
            console.log(autrice?.luogo_morte, "test");

            const autriceLuoghi = {
              nascita:
                luoghi.find((luogo) => luogo.id === autrice?.luogo_nascita) ||
                null,
              morte:
                luoghi.find((luogo) => luogo.id === autrice?.luogo_morte) ||
                null,
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
        <div className={style.temi__footer}>
          <motion.div
            className={style.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 2, duration: 0.5 },
            }}
            exit={{ opacity: 0 }}
          >
            <Link href={`/temi/${data[0].slug}`}>Scheda tematica</Link>
            <Image src={freccia} width={220} height={6} alt="freccia" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Temi;
