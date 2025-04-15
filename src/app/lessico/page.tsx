import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import ScrollFix from "@/components/scroll/scrollFix";
import Indice from "@/components/indice/indice";

async function Temi() {
  try {
    const data = await getDataFromApi("temi");
    if (data) {
      return (
        <div className={style.container}>
          <div className={style.heading}>
            <h1>Lessico</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusamus, at culpa! Obcaecati voluptatem quisquam sint nobis sit
              maxime beatae numquam! Facilis iure quidem eveniet commodi
              sapiente, molestias nostrum doloremque? Id?
            </p>
          </div>
          <Indice data={data} type="temi" />
          <ScrollFix />
        </div>
      );
    } else {
      throw new Error("Errore nel caricamento dei dati");
    }
  } catch (e) {
    return (
      <div className={style.container}>
        <h1>Errore</h1>
        <p>{(e as Error).message}</p>
      </div>
    );
  }
}

export default Temi;
