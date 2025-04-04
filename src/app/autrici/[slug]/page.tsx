import React from "react";
import style from "./page.module.scss";
import {
  getDataAutriciPage,
  getDataLuoghi,
  getDataFromApi,
  getOpere,
} from "@/utility/fetchdati";
import { formatDataFromApi } from "@/utility/generic";
import { tAutrice } from "../../../type";
import Image from "next/image";
import Link from "next/link";
import ImagePreload from "@/components/loaders/imagePreLoad";
import ScrollFix from "@/components/scroll/scrollFix";
import { CiSaveDown2, CiLink } from "react-icons/ci";

async function Page({ params }: { params: any }) {
  try {
    const paramsData = await params;
    const data = await getDataAutriciPage(paramsData.slug);
    const luoghi = await getDataLuoghi();
    const autriciOpere = await getDataFromApi("autrici_opere_1", {});
    const opereTotali = await getOpere();

    if (data) {
      const autrice = data[0] as tAutrice;

      const luogoNascita =
        luoghi && luoghi.find((item) => item.id === autrice.luogo_nascita);
      const luogoMorte =
        luoghi && luoghi.find((item) => item.id === autrice.luogo_morte);
      const opere = () => {
        const autriceOpere = autrice.opere.map((opera) => {
          return autriciOpere?.find((item) => item.id === opera);
        });
        return autriceOpere?.map((opera) => {
          return opereTotali?.find((item) => item.id === opera?.opere_id);
        });
      };

      return (
        <div className={style.container}>
          <div className={style.left}>
            <section className={style.header}>
              <h1>
                {autrice.nome} {autrice.cognome}
              </h1>
              <ul className={style.data}>
                <li>
                  {formatDataFromApi(autrice.data_di_nascita, {
                    year: "numeric",
                  })}
                </li>
                <li>
                  {formatDataFromApi(autrice.data_di_morte, {
                    year: "numeric",
                  })}
                </li>
              </ul>{" "}
            </section>
            <div className={style.dividerH}>
              <Image
                src={"/image/hrule.svg"}
                width={250}
                height={15}
                alt="divider"
              />
            </div>
            <section
              className={style.mainText}
              dangerouslySetInnerHTML={{ __html: autrice.Contenuto }}
            />
            <div className={style.dividerH}>
              <Image
                src={"/image/hrule.svg"}
                width={250}
                height={15}
                alt="divider"
              />
            </div>
            <section className={style.opere}>
              <h2>Bibliografia</h2>
              <ul>
                {opere()?.map((opera) => {
                  return (
                    <li key={opera?.id} className={style.opera}>
                      <h3>{opera?.titolo}</h3>
                      <p>{opera?.info}</p>
                      <div className={style.opera__link}>
                        {opera?.file && (
                          <Link
                            target="_blank"
                            href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${opera?.file}`}
                          >
                            <span>
                              <CiSaveDown2 />
                            </span>{" "}
                            File Download
                          </Link>
                        )}
                        {opera?.link && (
                          <a target="_blank" href={opera?.link}>
                            <span>
                              <CiLink />
                            </span>{" "}
                            Risorsa esterna
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className={style.opere}>
              <h2>Fonti</h2>
              <ul>
                {autrice.fonti?.map((fonte, index) => {
                  console.log(fonte.link, "fonte.link");
                  return (
                    <li key={index}>
                      {fonte?.link ? (
                        <Link target="_blank" href={`${fonte.link}`}>
                          <h3>{fonte?.titolo}</h3>
                        </Link>
                      ) : (
                        <h3>{fonte?.titolo}</h3>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
          <div className={style.right}>
            <ImagePreload
              loader={{
                url: "/image/leiloader.svg",
                width: 200,
                height: 200,
              }}
              image={{
                url:
                  process.env.NEXT_PUBLIC_ASSETS_URL +
                    "/" +
                    autrice.immagine_principale || "",
                width: 300,
                height: 300,
                alt: autrice.nome + " " + autrice.cognome || "",
              }}
              type="fixed"
              backgroundColor="#7a4535"
              round
            />

            <ul className={style.datiPersonali}>
              <li>
                <div className={style.datiPersonali__titolo}>Nata</div>
                <div className={style.datiPersonali__dato}>
                  {autrice.nome} {autrice.cognome}
                </div>
              </li>
              {autrice.pseudonimi && (
                <li>
                  <div className={style.datiPersonali__titolo}>Pseudonimi</div>
                  <div className={style.datiPersonali__dato}>
                    {autrice.pseudonimi &&
                      autrice.pseudonimi
                        .map((item) => item.pseudonimo)
                        .join(", ")}
                  </div>
                </li>
              )}
              {autrice.data_di_nascita && (
                <li>
                  <div className={style.datiPersonali__titolo}>Nascita</div>
                  <div className={style.datiPersonali__dato}>
                    {luogoNascita?.Nome}{" "}
                    {formatDataFromApi(autrice.data_di_nascita)}
                  </div>
                </li>
              )}
              {autrice.data_di_morte && (
                <li>
                  <div className={style.datiPersonali__titolo}>Morte</div>
                  <div className={style.datiPersonali__dato}>
                    {luogoMorte?.Nome}{" "}
                    {formatDataFromApi(autrice.data_di_morte)}
                  </div>
                </li>
              )}
            </ul>
          </div>
          <ScrollFix />
        </div>
      );
    } else {
      console.log("errore caricamento dati");
      throw new Error("errore caricamento dati");
    }
  } catch (e) {
    console.error(e);
    return <div>errore caricamento dati</div>;
  }
}

export default Page;
