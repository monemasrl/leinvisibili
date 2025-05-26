import style from "./footer.module.scss";
import Image from "next/image";
import navigation from "../../../../public/data/navigation.json";
import generic from "../../../../public/data/generic.json";

const immaginePatrocinio1 = "/image/sponsor/FinanziatoUnioneEuropea.png";
const immaginePatrocinio2 = "/image/sponsor/ministero.png";
const immaginePatrocinio3 = "/image/sponsor/italia-domani-logo-1024x301.png";
const immaginePatrocinio4 = "/image/sponsor/unical.png";
const immaginePatrocinio5 = "/image/sponsor/padova.png";
const immaginePatrocinio6 = "/image/sponsor/logo_cnr_affiancato.png";

const sponsor = [
  immaginePatrocinio1,
  immaginePatrocinio2,
  immaginePatrocinio3,
  immaginePatrocinio4,
  immaginePatrocinio5,
  immaginePatrocinio6,
];
const logo = "/image/logo_footer.svg";
function Footer() {
  const t = generic;

  return (
    <footer className={style.footer}>
      <div className={style.patrocinio}>
        <h2>Realizzato grazie al patrocinio di:</h2>
        <div className={style.patrocinio__container}>
          {sponsor.map((item, index) => {
            return (
              <div key={index} className={style.patrocinio__item}>
                <Image
                  src={item}
                  width={200}
                  height={100}
                  alt={`patrocinio ${index + 1}`}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.footer__first}>
        <div>
          <Image src={logo} width={300} height={91} alt="logo" loading="lazy" />
          <p>
            Questo progetto è dedicato alle molte donne che, nella storia, hanno
            svolto un ruolo cruciale nello sviluppo della cultura, pur rimanendo
            spesso nell’ombra. Queste donne, che si sono distinte in vari campi
            come la letteratura, la scienza, l&#39;arte e la filosofia, hanno
            sfidato le convenzioni del loro tempo e hanno contribuito in modo
            significativo al progresso delle idee e delle pratiche culturali.
          </p>
        </div>

        <div>
          <ul className={style.footer__nav}>
            {navigation.navigation.map((item, index) => {
              return <li key={index}>{item.name}</li>;
            })}
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <a href={`tel:${t.generics.telNumber}`}>
                {t.generics.label_tel}:{t.generics.telNumber}
              </a>
            </li>
            <li>
              {t.generics.label_iva}:{t.generics.iva}
            </li>
            <li>
              {t.generics.label_powered}:{t.generics.powered}
            </li>
          </ul>
          <p>{t.generics.footer_credit}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
