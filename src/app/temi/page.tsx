import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import generic from "../../../public/data/generic.json";
import Link from "next/link";
import ScrollFix from "@/components/scroll/scrollFix";
function datiOrdineAlfabetico(lista: any, alfabeto: string[]) {
  const dati = alfabeto.map((lettera, index) => {
    let dataPerLettera = [];
    dataPerLettera = [
      ...lista?.filter(
        (item: any) => item.titolo[0].toLowerCase() === lettera.toLowerCase()
      ),
    ];
    return { lettera: lettera, data: dataPerLettera };
  });
  return dati;
}
async function Temi() {
  try {
    const data = await getDataFromApi("temi");
    const alfabeto = generic.generics.alphabeth;
    const datiOrdinati = datiOrdineAlfabetico(data, alfabeto);
    const col1 = datiOrdinati.slice(0, 13);
    const col2 = datiOrdinati.slice(13, 26);

    if (data) {
      return (
        <div className={style.container}>
          <div className={style.heading}>
            <h1>Temi</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusamus, at culpa! Obcaecati voluptatem quisquam sint nobis sit
              maxime beatae numquam! Facilis iure quidem eveniet commodi
              sapiente, molestias nostrum doloremque? Id?
            </p>
          </div>
          <div className={style.content}>
            <div className={style.left}>
              <ul>
                {col1.map((item: any, index: number) => {
                  if (item.data.length === 0) return null;
                  return (
                    <li key={index}>
                      <div className={style.lettera}>{item.lettera}</div>
                      {item.data.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <Link href={`/temi/${item.slug}`}>
                              {item.titolo}
                            </Link>
                          </div>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={style.right}>
              <ul>
                {col2.map((item: any, index: number) => {
                  if (item.data.length === 0) return null;
                  return (
                    <li key={index}>
                      <div className={style.lettera}>{item.lettera}</div>
                      {item.data.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <Link href={`/temi/${item.slug}`}>
                              {item.titolo}
                            </Link>
                          </div>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
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
