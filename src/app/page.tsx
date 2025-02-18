import styles from "./page.module.scss";
import { notFound } from "next/navigation";
import HeroLei from "@/components/heros/HeroLei";
import AnimatedSection from "../components/mainLayoutComponents/sections/animatedSection";
import SimpleSlider from "@/components/sliders/simpleSlider";
import type {
  tOpera,
  tAutrice,
  tOpereAutrici,
  tCitazioni,
  tAutriciCitazioni,
  tTemi,
  tAutriciTemi,
} from "@/type";
import {
  getAutrici,
  getOpere,
  getOpereAutrici,
  getCitazioni,
  getAutriciCitazioni,
  getTemi,
  getTemiAutrici,
} from "@/utility/fetchdati";
import { formatDataFromApi } from "@/utility/generic";
import Temi from "@/components/temi/temi";
/**
 * PAGINA
 * Utilizzare le pagine per fetchare i dati e passarli ai componenti
 * Mantenere le pagine componenti server-side
 * Passare i dati ai componenti tramite props
 */

export default async function Home() {
  const autrici = await getAutrici(notFound);
  const opere = await getOpere();
  const citazioni = await getCitazioni();
  const opereAutrici = await getOpereAutrici();
  const autriciCitazioni = await getAutriciCitazioni();
  const temi = await getTemi();
  const temiautrici = await getTemiAutrici();
  console.log(temi, "temi");
  return (
    <main className={`${styles.home}`}>
      <HeroLei
        data={autrici && datahero(autrici as tAutrice[])}
        assetsURL={process.env.NEXT_PUBLIC_ASSETS_URL}
      />
      <AnimatedSection classname={styles.section1} animateOnce={false}>
        <div className={`${styles.home__content} mainwrapper`}>
          <h1>Le Invisibili</h1>
          <p>
            è dedicato alle molte donne che, nella storia, hanno svolto un ruolo
            cruciale nello sviluppo della cultura, pur rimanendo spesso
            nell'ombra. Queste donne, che si sono distinte in vari campi come la
            letteratura, la scienza, l'arte e la filosofia, hanno sfidato le
            convenzioni del loro tempo e hanno contribuito in modo significativo
            al progresso delle idee e delle pratiche culturali.
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection classname={styles.section2} animateOnce={false}>
        {opere?.length && (
          <SimpleSlider
            autrici={autrici as tAutrice[]}
            opereAutrici={opereAutrici as tOpereAutrici[]}
            data={citazioni as tCitazioni[]}
            opere={opere as tOpera[]}
            autriciCitazioni={autriciCitazioni as tAutriciCitazioni[]}
            id={0}
          />
        )}
      </AnimatedSection>
      <AnimatedSection classname={styles.section3} animateOnce={false}>
        {temi?.length && (
          <Temi
            data={temi as tTemi[]}
            temiAutrici={temiautrici as tAutriciTemi[]}
            autrici={autrici as tAutrice[]}
          />
        )}
      </AnimatedSection>
    </main>
  );
}

/* struttura dati per la hero */
function datahero(data: tAutrice[]) {
  return data
    .filter((item: any) => {
      return item.in_homepage === true;
    })
    .sort((a: any, b: any) => {
      return a.Posizione - b.Posizione;
    })
    .map((item: any) => {
      const nascita = formatDataFromApi(item.data_di_nascita, {
        year: "numeric",
      });
      const morte = formatDataFromApi(item.data_di_morte, {
        year: "numeric",
      });

      return {
        nome: item.nome + " " + item.cognome || null,
        descrizione: item.abstract || null,
        image: item.immagine_principale || null,
        data_nascita: nascita || null,
        data_morte: morte || null,
        link: item.slug || null,
      };
    });
}
