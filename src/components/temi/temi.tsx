import React from "react";
import style from "./temi.module.scss";
import { tTemi, tAutriciTemi, tAutrice } from "@/type";
import Image from "next/image";
function Temi({
  data,
  temiAutrici,
  autrici,
}: {
  data: tTemi[];
  temiAutrici: tAutriciTemi[];
  autrici: tAutrice[];
}) {
  function getAutriciFromTema(
    idAutrici: number,
    temiautrici: tAutriciTemi[],
    autrici: tAutrice[]
  ) {
    const idautrice = temiautrici.find(
      (idAutrice) => idAutrice.id === idAutrici
    );
    console.log(idautrice);
    const autriceData = autrici.find(
      (autrice) => autrice.id === idautrice?.autrici_id
    );
    return autriceData;
  }
  return (
    <div className={style.temi}>
      <h2>{data[0].titolo}</h2>
      <p dangerouslySetInnerHTML={{ __html: data[0].testo }} />
      <div className={style.temi__autrici}>
        {data[0].autrici.map((item, index) => {
          const autrice = getAutriciFromTema(item, temiAutrici, autrici);
          return (
            <div key={index} className={style.temi__autrici__box}>
              {autrice?.immagine_principale && (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_ASSETS_URL +
                    autrice?.immagine_principale
                  }
                  width={500}
                  height={500}
                  alt={"item.titolo"}
                />
              )}
              <div className={style.temi__autrici__box__text}>
                <h3>
                  {autrice?.nome} {autrice?.cognome}
                </h3>
                {autrice?.abstract && (
                  <p dangerouslySetInnerHTML={{ __html: autrice?.abstract }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Temi;
