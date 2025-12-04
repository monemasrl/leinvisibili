import React from "react";
import style from "./page.module.scss";
import {
  getDataAutriciPage,
  getDataLuoghi,
  getDataFromApi,
  getOpere,
} from "@/utility/fetchdati";
import { formatDataFromApi } from "@/utility/generic";
import { tAutrice, tAutriciFiles } from "../../../type";
import Image from "next/image";
import Link from "next/link";
import ImagePreload from "@/components/loaders/imagePreLoad";
import ScrollFix from "@/components/scroll/scrollFix";
import Gallery from "@/components/gallery/gallery";
import { CiSaveDown2, CiLink } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";

import TextHide from "@/components/mainLayoutComponents/textcontainer/textHide";
async function Page({ params }: { params: any }) {
  try {
    const paramsData = await params;
    const data = await getDataAutriciPage(paramsData.slug);
    const luoghi = await getDataLuoghi();
    const autriciOpere = await getDataFromApi("autrici_opere_1", {});
    const opereTotali = await getOpere();
    const autriciFiles = await getDataFromApi("autrici_files", {
      autrici_id: (data && data[0].id) || undefined,
    });

    if (data) {
      const autrice = data[0] as tAutrice;

      // array di immagini creati dalla junction collection

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
                  {autrice.nascita_incerta ? <span>ca.</span> : ""}
                  {formatDataFromApi(autrice.data_di_nascita, {
                    year: "numeric",
                  })}
                </li>
                <li>
                  {autrice.morte_incerta ? <span>ca.</span> : ""}
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
            <TextHide
              classStyle={style.mainText}
              contenuto={autrice.Contenuto}
            />
            <div className={style.dividerH}>
              <Image
                src={"/image/hrule.svg"}
                width={250}
                height={15}
                alt="divider"
              />
            </div>
            {autriciFiles && autriciFiles.length > 0 && (
              <section className={style.gallery}>
                <h2>Immagini</h2>
                <Gallery type="two" images={autriciFiles as tAutriciFiles[]} />
              </section>
            )}
            <section className={style.opere}>
              {autrice.opere && autrice.opere.length > 0 && (
                <h2>Bibliografia</h2>
              )}
              <ul>
                {opere()?.map((opera) => {
                  return (
                    <li
                      key={opera?.id}
                      className={`${style.opera} ${
                        (opera?.file || opera?.link) && style.opera__links
                      }`}
                    >
                      <h3>{opera?.titolo}</h3>
                      <div dangerouslySetInnerHTML={{ __html: opera?.info }} />
                      {(opera?.file || opera?.link) && (
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
                                <IoIosLink />
                              </span>{" "}
                              Risorsa esterna
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className={style.fonti}>
              {autrice.fonti && autrice.fonti.length > 0 && <h2>Fonti</h2>}
              <ul>
                {autrice.fonti?.map((fonte, index) => {
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
              classname="profilo"
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
                    {luogoNascita?.Nome},<br />
                    <div className={style.nascita}>
                      {autrice.nascita_incerta || autrice.nascita_solo_anno ? (
                        <span>ca.</span>
                      ) : null}
                      {formatDataFromApi(autrice.data_di_nascita, {
                        year: autrice.nascita_solo_anno ? "numeric" : undefined,
                      })}
                    </div>
                  </div>
                </li>
              )}
              {autrice.data_di_morte && (
                <li>
                  <div className={style.datiPersonali__titolo}>Morte</div>
                  <div className={style.datiPersonali__dato}>
                    {luogoMorte?.Nome},<br />
                    <div className={style.morte}>
                      {autrice.morte_incerta || autrice.morte_solo_anno ? (
                        <span>ca.</span>
                      ) : null}
                      {formatDataFromApi(autrice.data_di_morte, {
                        year: autrice.morte_solo_anno ? "numeric" : undefined,
                      })}
                    </div>
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
