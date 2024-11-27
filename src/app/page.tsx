import styles from "./page.module.scss";
import heroData from "../../public/data/hero.json";
import homeData from "../../public/data/home.json";
import staffData from "../../public/data/staff.json";
import AnimatedSection from "@/components/mainLayoutComponents/sections/animatedSection";
import LeafletMain from "@/components/map/Leaflet";
import Form from "@/components/form/netlifyForm";
import Parallax from "@/components/parallax/parallax";
import Gallery from "@/components/gallery/gallery";
import Image from "next/image";
import generic from "../../public/data/generic.json";

/**
 * PAGINA
 * Utilizzare le pagine per fetchare i dati e passarli ai componenti
 * Mantenere le pagine componenti server-side
 * Passare i dati ai componenti tramite props
 */

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const HeroDataLang = heroData["it"];
  const HomeDataLang = homeData["it"];
  const StaffDataLang = staffData["it"];
  const mapData = generic.generics;
  const HeroImage =
    "/image/studio-dentistico-dottor-vincenzi-slideshow_overlay-25.jpg";

  return (
    <main className={styles.main}>
      <section className={styles.section1}>
        <Parallax
          className={"parallaxSection1"}
          imageURL={HeroImage}
          alt="heroImage"
          text={HeroDataLang.titolo}
          buttonText={HeroDataLang.link}
          buttonScroll={HeroDataLang.linkURL}
        />
      </section>
      <AnimatedSection classname={styles.section2} scrollToMe="studio">
        <div className="subtitle">studio dentistico dott. vincenti</div>
        <h1 className="title">lo studio dentistico</h1>
        <p>
          Lo studio dentistico Dott. Vincenti, situato a Prato, si avvale di uno
          staff di professionisti qualificati e di attrezzature <br /> moderne
          per la prevenzione e la cura delle malattie della bocca e per le
          riabilitazioni su impianti.
        </p>
      </AnimatedSection>
      <AnimatedSection classname={styles.section3}>
        <Gallery type="one" images={HomeDataLang.gallery1} />
      </AnimatedSection>
      <AnimatedSection classname={styles.section4} scrollToMe="trattamenti">
        <div className="subtitle">
          I migliori specialisti per risolvere ogni vostro problema
        </div>
        <h2 className="title">I trattamenti</h2>
        <p>
          Mettiamo a disposizione dei pazienti, sia bambini che adulti, la
          nostra preparazione e professionalità per risolvere ogni tipo di
          esigenza.
        </p>
        <div className={styles.trattamenti}>
          {HomeDataLang.trattamenti.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.trattamenti__box} ${
                  styles["trattamenti__" + index.toString()]
                } `}
              >
                <div className={styles.trattamenti__box__imageBox}>
                  <Image
                    src={"/image/" + item.img}
                    width={item["img-width"]}
                    height={item["img-height"]}
                    alt={item.titolo}
                  />
                </div>
                <h3>{item.titolo}</h3>
                <p dangerouslySetInnerHTML={{ __html: item.descrizione }} />
              </div>
            );
          })}
        </div>
      </AnimatedSection>
      <AnimatedSection classname={styles.section5}>
        <Parallax
          className={"parallaxSection5"}
          imageURL="/image/dr_vincenti_center_band-1.jpg"
          alt="parallax"
          text="PER PRENDERSI CURA DI VOI<br /><span>con serietà e cortesia</span>"
        />
      </AnimatedSection>
      <AnimatedSection classname={styles.section6} scrollToMe="team">
        <div className="subtitle">Un team di professionisti qualificati</div>
        <h2 className="title">Il nostro team</h2>
        <p>
          Un gruppo stabile di professionisti sempre aggiornati che lavora
          insieme da anni si prende cura di ogni vostra esigenza e necessità con
          serietà e cortesia.
        </p>
        <div className={styles.staff}>
          {StaffDataLang.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.staff__box} ${
                  styles["staff__box__" + index.toString()]
                }`}
              >
                <Image
                  src={"/image/" + item.image}
                  width={300}
                  height={230}
                  alt={item.nome}
                />

                <h3>{item.nome}</h3>
                <p>{item.ruolo}</p>
                <hr />
                <p>{item.descrizione}</p>
              </div>
            );
          })}
        </div>
      </AnimatedSection>
      <AnimatedSection classname={styles.section7}>
        <Image
          src={"/image/foto-team-dott-vincenti.jpg"}
          width={1459}
          height={595}
          alt="foto-team"
        />
        <hr style={{ marginTop: "-4px" }} />
      </AnimatedSection>
      <AnimatedSection
        classname={styles.section8}
        width="1200px"
        scrollToMe="strumentazione"
      >
        <div className="subtitle">
          Attrezzature all’avanguardia per la tua sicurezza
        </div>
        <h2 className="title">Strumentazione e sicurezza</h2>
        <p>
          Lo studio è dotato di attrezzature moderne ed all’avanguardia,
          controllate da specialisti che,
          <br />
          nel rispetto delle normative vigenti, ne certificano periodicamente il
          corretto funzionamento.
          <br /> Le procedure di sterilizzazione prevedono l’utilizzo di moderne
          autoclavi di classe B (ad elevata efficacia)
          <br />
          con controllo e tracciabilità di tutto lo strumentario utilizzato.
        </p>
        <div className={styles.strumentazioneGallery}>
          <Gallery type="two" images={HomeDataLang.gallery2} />
        </div>
      </AnimatedSection>
      <AnimatedSection classname={styles.section9}>
        <hr style={{ marginTop: "0" }} />
        <Image
          src={"/image/periscopio-460x300.png"}
          width={460}
          height={300}
          alt="foto-team"
          style={{ marginTop: "-9px" }}
        />
      </AnimatedSection>
      <AnimatedSection classname={styles.section10} scrollToMe="contatti">
        <div className="subtitle">Non solo puntualità</div>
        <h1 className="title">Contatti e orari</h1>
        <p>
          Le terapie richiedono tempi adeguati per poter essere effettuate con
          qualità e precisione, oltre che con la dovuta calma.
          <br />
          Per questo gestiamo gli appuntamenti in modo da dedicare tutto il
          tempo necessario al tipo di seduta prevista,
          <br />
          garantendo massima concentrazione e tranquillità.
        </p>
        <div className={styles.contatti}>
          <div className={styles.contatti__box}>
            <Image
              src={"/image/icon-time-150x150.png"}
              width={150}
              height={150}
              alt="icon time"
            />
            <h3>Orari di apertura</h3>
            <p>Lunedì/Giovedì: 9.00 - 13.00 / 15.00 - 20.00</p>
            <hr />
            <p> Venerdì: 9.00 - 13.00</p>
          </div>
          <div className={styles.contatti__box}>
            <Image
              src={"/image/icon-medical-150x150.png"}
              width={150}
              height={150}
              alt="icon time"
            />
            <h3>emergenze</h3>
            <p>
              Per ogni esigenza al di fuori degli orari di apertura dello studio
              è possibile contattare il seguente numero:
              <span>346.7976813</span>
            </p>
          </div>

          <div className={styles.contatti__box}>
            <Image
              src={"/image/icon-telephone-150x150.png"}
              width={150}
              height={150}
              alt="icon time"
            />
            <h3>Appuntamenti</h3>
            <p>
              È possibile prenotare una visita chiamando il numero:
              <span>0574.514380</span>
            </p>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection classname={styles.section11}>
        <Form />
      </AnimatedSection>
      <AnimatedSection classname={styles.section12}>
        <LeafletMain
          address={{
            city: mapData.city,
            street: mapData.address,
            number: mapData.address_number,
          }}
        />
      </AnimatedSection>
    </main>
  );
}
