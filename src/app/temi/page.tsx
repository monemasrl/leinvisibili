import React from "react";
import style from "./page.module.scss";
import { getTemi } from "@/utility/fetchdati";
async function Temi() {
  return <h1>test</h1>;
  /* try {
    const data = await getTemi(params.slug);
    if (data) {
      return (
        <div className={style.container}>
          <h1>{data[0].titolo}</h1>
          <p>{data[0].testo}</p>
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
  } */
}

export default Temi;
