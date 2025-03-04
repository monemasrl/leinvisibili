import React from "react";
import style from "./page.module.scss";
import { getTemi, getDataFromApi } from "@/utility/fetchdati";
import { tTemi, tAutrice, tAutriciTemi, tLuoghi } from "../../../type";
import TemiAutrici from "@/components/temi/temiAutrici";
import Image from "next/image";
import anelli from "../../../../public/image/anelli.png";
async function Tema({ params }: { params: any }) {
  try {
    const data = (await getTemi(params.slug)) as tTemi[];
    const autrici = (await getDataFromApi("autrici")) as tAutrice[];
    const temiAutrici = (await getDataFromApi(
      "temi_autrici"
    )) as tAutriciTemi[];
    const luoghi = (await getDataFromApi("luoghi")) as tLuoghi[];
    if (data) {
      return (
        <div className={style.container}>
          <section className={style.section1}>
            <Image
              className={style.anelli}
              src={anelli}
              alt="anelli immagine grafica"
            />
            <div className={style.topTitle}>Area tematica:</div>
            <h1>{data[0]?.titolo}</h1>

            <TemiAutrici
              data={data}
              temiAutrici={temiAutrici}
              autrici={autrici}
              luoghi={luoghi}
            />
          </section>
          <section
            className={style.section2}
            dangerouslySetInnerHTML={{ __html: data[0].testo }}
          />
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
export default Tema;
