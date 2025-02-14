import styles from "./page.module.scss";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import HeroLei from "@/components/heros/HeroLei";
import AnimatedSection from "../components/mainLayoutComponents/sections/animatedSection";
import SimpleSlider from "@/components/sliders/simpleSlider";
import type { tOpera, tAutrice, tOpereAutrici } from "@/type";
import { getAutrici, getOpere, getOpereAutrici } from "@/utility/fetchdati";
/**
 * PAGINA
 * Utilizzare le pagine per fetchare i dati e passarli ai componenti
 * Mantenere le pagine componenti server-side
 * Passare i dati ai componenti tramite props
 */

export default async function Home() {
  const autrici = await getAutrici(notFound);
  const opere = await getOpere();
  const opereAutrici = await getOpereAutrici();
  const immaginiAutrici = getImmaginiAutrici(autrici as tAutrice[]);
  console.log(opere, "opereAutrici");
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
      <AnimatedSection classname={styles.section2}>
        {opere?.length && (
          <SimpleSlider
            immagini={immaginiAutrici}
            opereAutrici={opereAutrici as tOpereAutrici[]}
            data={opere as tOpera[]}
            id={0}
          />
        )}
      </AnimatedSection>
    </main>
  );
}

function getImmaginiAutrici(data: tAutrice[]) {
  return data.reduce((acc, item) => {
    acc[item.id] = item.immagine_principale;
    return acc;
  }, {} as { [key: number]: string });
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
      const nascita = new Date(Date.parse(item.data_di_nascita));
      const morte = new Date(Date.parse(item.data_di_morte));
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        //month: "long",
        //day: "numeric",
      };
      return {
        nome: item.nome + " " + item.cognome || null,
        descrizione: item.abstract || null,
        image: item.immagine_principale || null,
        data_nascita: nascita.toLocaleDateString("it-IT", options) || null,
        data_morte: morte.toLocaleDateString("it-IT", options) || null,
        link: item.slug || null,
      };
    });
}
function dataCitazioni(opere: tOpera[]) {
  return opere?.filter((item, index) => {
    return item.citazioni.some((item: any) => {
      return item.in_home === true;
    });
  });
}
