import styles from "./page.module.scss";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import HeroLei from "@/components/heros/HeroLei";
/**
 * PAGINA
 * Utilizzare le pagine per fetchare i dati e passarli ai componenti
 * Mantenere le pagine componenti server-side
 * Passare i dati ai componenti tramite props
 */

async function getPage() {
  try {
    const pages = await directus.request(
      readItems("autrici", {
        filter: {
          status: "published",
          in_homepage: true,
        },
      })
    );
    if (!pages) {
      throw new Error("Page not found");
    }
    return pages;
  } catch (error) {
    console.error("errori", error);
    if (error) return notFound();
  }
}

export default async function Home() {
  const page = await getPage();
  const dataHero = page
    ?.filter((item) => {
      return item.in_homepage === true;
    })
    .sort((a, b) => {
      return a.Posizione - b.Posizione;
    })
    .map((item) => {
      console.log(item);
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

  return (
    <main className={`${styles.home}`}>
      <HeroLei data={dataHero} assetsURL={process.env.ASSETS_URL} />{" "}
    </main>
  );
}
