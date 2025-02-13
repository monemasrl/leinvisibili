"use client";
import React from "react";
import style from "./Hero.module.scss";
import Image from "next/image";
import Link from "next/link";
import freccia from "../../../public/image/freccia.svg";
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
  const [boxOpen, setBoxOpen] = React.useState<number | null>(null);

  return (
    <div className={style.hero}>
      {data?.map((item, index) => {
        return (
          <div
            className={`${style.hero__box} ${boxOpen != null && style.open}`}
            key={index}
            onClick={() => setBoxOpen(index)}
          >
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
      {data && boxOpen != null && (
        <div className={style.hero__content}>
          <div
            className={style.closeArea}
            onClick={() => setBoxOpen(null)}
          ></div>
          <div className={style.hero__content__box}>
            {assetsURL && (
              <Image
                src={assetsURL + data[boxOpen].image || ""}
                width={485}
                height={675}
                alt={data[boxOpen].nome || ""}
              />
            )}
            <div className={style.hero__content__box__text}>
              <div className={style.data}>
                {" "}
                {data[boxOpen].data_nascita} - {data[boxOpen].data_morte}
                <h2>{data[boxOpen].nome}</h2>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: data[boxOpen].descrizione || "",
                }}
              />

              <Link
                className={style.link}
                href={`/autrice/${data[boxOpen].link}`}
              >
                Scopri di più
                <Image src={freccia} width={200} height={3} alt="freccia" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroLei;
