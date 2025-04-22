import styles from "./page.module.scss";
import HeroLei from "@/components/heros/HeroLei";
import AnimatedSection from "@/components/mainLayoutComponents/sections/animatedSection";
import SimpleSlider from "@/components/sliders/simpleSlider";

import type {
  tOpera,
  tAutrice,
  tOpereAutrici,
  tCitazioni,
  tAutriciCitazioni,
  tTemi,
  tAutriciTemi,
  tLuoghi,
  tBlog,
} from "@/type";
import { getDataFromApi } from "@/utility/fetchdati";
import { formatDataFromApi } from "@/utility/generic";
import Temi from "@/components/temi/temi";
import News from "@/components/news/news";
import Image from "next/image";
export const dynamic = "force-dynamic";
/**
 * PAGINA
 * Utilizzare le pagine per fetch dei dati e passarli ai componenti
 * Mantenere le pagine componenti server-side
 * Passare i dati ai componenti tramite props
 */

export default async function Home() {
  const autrici = await getDataFromApi("autrici", {
    status: "published",
  });
  const opere = await getDataFromApi("opere", {
    status: "published",
  });
  const citazioni = await getDataFromApi("citazioni", {
    in_homepage: true,
  });
  const opereAutrici = await getDataFromApi("opere_autrici");
  const autriciCitazioni = await getDataFromApi("autrici_citazioni");
  const temi = await getDataFromApi("temi", {
    status: "published",
    in_homepage: true,
  });
  const temiautrici = await getDataFromApi("temi_autrici");
  const luoghi = await getDataFromApi("luoghi", {
    status: "published",
  });
  const blog = await getDataFromApi(
    "blog",
    {
      status: "published",
      in_homepage: true,
    },
    2
  );

  return (
    <main className={`${styles.home}`}>
      <HeroLei
        data={autrici && datahero(autrici as tAutrice[])}
        assetsURL={process.env.NEXT_PUBLIC_ASSETS_URL}
      />
      <div className="divider">
        <Image src="/image/linea.svg" width={3} height={150} alt="divider" />
      </div>
      <AnimatedSection classname={styles.section1} animateOnce={false}>
        <div className={`${styles.home__content} mainwrapper`}>
          <h1>Le Invisibili</h1>
          <p>
            è dedicato alle molte donne che, nella storia, hanno svolto un ruolo
            cruciale nello sviluppo della cultura, pur rimanendo spesso
            nell&rsquo;ombra. Queste donne, che si sono distinte in vari campi
            come la letteratura, la scienza, l&apos;arte e la filosofia, hanno
            sfidato le convenzioni del loro tempo e hanno contribuito in modo
            significativo al progresso delle idee e delle pratiche culturali.
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection classname={styles.section4} animateOnce={false}>
        {blog && <News data={blog as tBlog[]} />}
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
      <section className="sectionTemi">
        {temi?.length && (
          <Temi
            mainTitle="In evidenza:"
            data={temi as tTemi[]}
            temiAutrici={temiautrici as tAutriciTemi[]}
            autrici={autrici as tAutrice[]}
            luoghi={luoghi as tLuoghi[]}
          />
        )}
      </section>
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
        nomeCompleto: item.nome + " " + item.cognome || null,
        nome: item.nome || null,
        cognome: item.cognome || null,
        descrizione: item.abstract || null,
        image: item.immagine_principale || null,
        data_nascita: nascita || null,
        data_morte: morte || null,
        link: item.slug || null,
      };
    });
}
