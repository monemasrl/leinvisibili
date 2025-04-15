import React from "react";
import { formatDataFromApi, indiceAlfabetico } from "@/utility/generic";
import Link from "next/link";
import style from "./style.module.scss";
import Image from "next/image";
function Indice({ data, type }: { data: any; type: "temi" | "autrici" }) {
  if (!data) return "non ci sono dati";
  const datiOrdinati = indiceAlfabetico(data, type);
  const col1 = datiOrdinati.slice(0, 13);
  const col2 = datiOrdinati.slice(13, 26);

  return (
    <div className={style.content}>
      <div className={style.left}>
        <ul className={style.datiColonna}>
          {col1.map((item: any, index: number) => {
            if (item.data.length === 0) return null;
            return (
              <li key={index}>
                {type === "temi" ? (
                  <>
                    <div className={style.lettera}>{item.lettera}</div>
                    {item.data.map((item: any, index: number) => {
                      return (
                        <div key={index}>
                          <Link href={`/temi/${item.slug}`}>{item.titolo}</Link>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className={style.results}>
                    <div className={style.lettera}>{item.lettera}</div>
                    {item.data.map((item: any, index: number) => {
                      return (
                        <div className={style.result} key={item.id}>
                          <div className={style.autrice}>
                            <div>
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_ASSETS_URL +
                                  item.immagine_principale
                                }
                                sizes="(max-width: 460px) 40vw"
                                width={60}
                                height={60}
                                alt={"item.titolo"}
                              />
                            </div>
                            <div className={style.text}>
                              <Link href={`/autrici/${item.slug}`}>
                                <h2>
                                  {item.nome} {item.cognome}
                                </h2>
                              </Link>
                              <ul className={style.data}>
                                <li>
                                  {item.data_di_nascita
                                    ? formatDataFromApi(item.data_di_nascita, {
                                        year: "numeric",
                                      })
                                    : ""}
                                </li>
                                <li>
                                  {item.data_di_morte
                                    ? formatDataFromApi(item.data_di_morte, {
                                        year: "numeric",
                                      })
                                    : ""}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.right}>
        <ul className={style.datiColonna}>
          {col2.map((item: any, index: number) => {
            if (item.data.length === 0) return null;
            return (
              <li key={index}>
                {type === "temi" ? (
                  <>
                    <div className={style.lettera}>{item.lettera}</div>
                    {item.data.map((item: any, index: number) => {
                      return (
                        <div key={index}>
                          <Link href={`/temi/${item.slug}`}>{item.titolo}</Link>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className={style.results}>
                    <div className={style.lettera}>{item.lettera}</div>
                    {item.data.map((item: any, index: number) => {
                      return (
                        <div className={style.result} key={item.id}>
                          <div className={style.autrice}>
                            <div>
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_ASSETS_URL +
                                  item.immagine_principale
                                }
                                sizes="(max-width: 460px) 40vw"
                                width={60}
                                height={60}
                                alt={"item.titolo"}
                              />
                            </div>
                            <div className={style.text}>
                              <Link href={`/autrici/${item.slug}`}>
                                <h2>
                                  {item.nome} {item.cognome}
                                </h2>
                              </Link>
                              <ul className={style.data}>
                                <li>
                                  {item.data_di_nascita
                                    ? formatDataFromApi(item.data_di_nascita, {
                                        year: "numeric",
                                      })
                                    : ""}
                                </li>
                                <li>
                                  {item.data_di_morte
                                    ? formatDataFromApi(item.data_di_morte, {
                                        year: "numeric",
                                      })
                                    : ""}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Indice;
