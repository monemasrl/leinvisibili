import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import { get } from "http";
import { formatDataFromApi } from "@/utility/generic";
import Link from "next/link";
async function Page() {
  try {
    const data = await getDataFromApi("blog");
    if (data) {
      return (
        <div className={style.container}>
          <h1>New ed Eventi</h1>
          <section className={style.eventi}>
            {data.map((item, index) => {
              return (
                <div key={index} className={style.evento}>
                  <div className={style.img}>
                    {item.immagine_principale && (
                      <img
                        src={
                          process.env.NEXT_PUBLIC_ASSETS_URL +
                          item.immagine_principale
                        }
                        alt={item.titolo}
                        width="150"
                        height="150"
                      />
                    )}
                  </div>
                  <div className={style.text}>
                    <h2>
                      <Link href={item.slug}>{item.titolo}</Link>
                    </h2>
                    <p>{item.abstract}</p>
                    <ul>
                      {" "}
                      {item.data_inizio && (
                        <li>{formatDataFromApi(item.data_inizio)}</li>
                      )}{" "}
                      {item.data_fine && (
                        <li>{formatDataFromApi(item.data_fine)}</li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
    return <div className={style.container}>Errore caricamento dati</div>;
  }
}
export default Page;
