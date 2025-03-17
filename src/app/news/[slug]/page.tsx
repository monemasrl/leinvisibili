import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import ScrollFix from "@/components/scroll/scrollFix";
import ImagePreload from "@/components/loaders/imagePreLoad";
async function Page({ params }: { params: { slug: string } }) {
  try {
    const data = await getDataFromApi("blog", { slug: params.slug });
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
            />
            <h1>{data[0].titolo}</h1>
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
