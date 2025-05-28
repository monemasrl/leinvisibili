import { tOpera, tAutrice } from "@/type";
import React from "react";
import Link from "next/link";
import { formatDataFromApi } from "@/utility/generic";
import style from "./archivio.module.scss";
import Image from "next/image";
function ArchivioLista({
  result,
  abstract = false,
}: {
  result: tAutrice[] | tOpera[];
  abstract?: boolean;
}) {
  if (result) {
    return (
      <div className={style.results}>
        {result.map((item: any) => {
          if (item.opera) {
            return (
              <div className={style.result} key={item.opera}>
                <h2>{item.opera}</h2>
                <ul className={style.boxAutrice}>
                  {item.autrice.map((autrice: tAutrice) => {
                    return (
                      <li key={autrice.id}>
                        <Link href={`/autrici/${autrice.slug}`}>
                          <h3>
                            {autrice.nome} {autrice.cognome}
                          </h3>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          } else {
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
                      width={100}
                      height={100}
                      alt={"item.titolo"}
                    />
                  </div>
                  <div className={style.text}>
                    <Link href={`/autrici/${item.slug}`}>
                      <h2>
                        {item.nome} {item.cognome}
                      </h2>
                    </Link>

                    {item.pseudonimi && (
                      <ul className={style.pseudonimi}>
                        {item.pseudonimi.length > 0 &&
                          item.pseudonimi.map(
                            (item: { pseudonimo: string }, index: number) => {
                              return <li key={index}>{item.pseudonimo}</li>;
                            }
                          )}
                      </ul>
                    )}
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
                    {item.abstract && (
                      <div
                        className={style.abstract}
                        dangerouslySetInnerHTML={{ __html: item.abstract }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    return <div>...Caricamento Dati...</div>;
  }
}

export default ArchivioLista;
