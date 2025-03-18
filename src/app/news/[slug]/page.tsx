import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import ScrollFix from "@/components/scroll/scrollFix";
import ImagePreload from "@/components/loaders/imagePreLoad";
import { formatDataFromApi } from "@/utility/generic";
import { PageProps } from "../../../../.next/types/app/page";
async function Page({ params }: PageProps) {
  try {
    const { slug } = await params;
    const data = await getDataFromApi("blog", { slug: slug });
    if (data) {
      return (
        <div className={style.container}>
          <header>
            <ImagePreload
              loader={{
                url: "/image/leiloader.svg",
                width: 150,
                height: 150,
              }}
              image={{
                url:
                  process.env.NEXT_PUBLIC_ASSETS_URL +
                  data[0].immagine_principale,
                width: 1200,
                height: 400,
                alt: data[0].titolo,
              }}
              type="fixed"
            />{" "}
            <div className={style.headerContent}>
              {data[0].data_inizio && data[0].data_fine && (
                <ul>
                  {" "}
                  {data[0].data_inizio && (
                    <li>{formatDataFromApi(data[0].data_inizio)}</li>
                  )}{" "}
                  {data[0].data_fine && (
                    <li>{formatDataFromApi(data[0].data_fine)}</li>
                  )}
                </ul>
              )}
              <h1>{data[0].titolo}</h1>
            </div>
          </header>
          <section className={style.mainContent}>
            <div
              dangerouslySetInnerHTML={{
                __html: data[0].testo,
              }}
            />
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
