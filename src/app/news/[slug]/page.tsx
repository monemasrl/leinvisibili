import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import ScrollFix from "@/components/scroll/scrollFix";

async function Page({ params }: { params: { slug: string } }) {
  try {
    const data = await getDataFromApi("blog", { slug: params.slug });
    if (data) {
      return (
        <div className={style.container}>
          {data[0].titolo}
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
