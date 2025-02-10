"use client";
import React from "react";
import style from "./Hero.module.scss";
import Image from "next/image";

type Tdata = {
  nome: string | null;
  descrizione: string | null;
  image: string | null;
  data_nascita: string | null;
  data_morte: string | null;
  link: string | null;
};
function HeroLei({
  data,
  assetsURL,
}: {
  data: Tdata[] | undefined;
  assetsURL: string | undefined;
}) {
  console.log(data, "data");

  return (
    <div className={style.hero}>
      {data?.map((item, index) => {
        return (
          <div className={style.hero__box} key={index}>
            {item && assetsURL && (
              <Image
                src={assetsURL + item.image || ""}
                width={566}
                height={1080}
                alt={item.nome || ""}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default HeroLei;
