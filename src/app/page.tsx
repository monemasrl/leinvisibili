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
      return {
        nome: item.nome + " " + item.cognome || null,
        descrizione: item.contenuto || null,
        image: item.immagine_principale || null,
        data_nascita: item.data_di_nascita || null,
        data_morte: item.data_di_morte || null,
        link: item.slug || null,
      };
    });
  console.log(page);
  return (
    <main className={styles.main}>
      <HeroLei data={dataHero} assetsURL={process.env.ASSETS_URL} />{" "}
    </main>
  );
}
