import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import { formatDataFromApi } from "@/utility/generic";
import Link from "next/link";
import ImagePreload from "@/components/loaders/imagePreLoad";
import ScrollFix from "@/components/scroll/scrollFix";

async function Page() {
  try {
    const data = await getDataFromApi("blog");
    if (data) {
      return (
        <div className={style.container}>
          <h1>News ed Eventi</h1>
          <section className={style.eventi}>
            {data.map((item, index) => {
              return (
                <div key={index} className={style.evento}>
                  <div className={style.img}>
                    {item.immagine_principale ? (
                      <ImagePreload
                        image={{
                          url:
                            process.env.NEXT_PUBLIC_ASSETS_URL +
                            item.immagine_principale,
                          width: 150,
                          height: 150,
                          alt: item.titolo,
                        }}
                        loader={{
                          url: "/image/leiloader.svg",
                          width: 150,
                          height: 150,
                        }}
                        type="fixed"
                        round
                      />
                    ) : (
                      <ImagePreload
                        image={{
                          url: "/image/leiloader.svg",
                          width: 150,
                          height: 150,
                          alt: item.titolo,
                        }}
                        type="fixed"
                        round
                      />
                    )}
                  </div>
                  <div className={style.text}>
                    <h2>
                      <Link href={"/news/" + item.slug}>{item.titolo}</Link>
                    </h2>
                    <p>{item.abstract}</p>
                    <ul>
                      {" "}
                      {item.data_inizio && (
                        <li>
                          {formatDataFromApi(item.data_inizio, {
                            month: "long",
                            day: "numeric",
                          })}
                        </li>
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
          <ScrollFix />
        </div>
      );
    }
  } catch (error) {
    console.log(error);
    return <div className={style.container}>Errore caricamento dati</div>;
  }
}
export default Page;
