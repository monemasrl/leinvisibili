import style from "./footer.module.scss";
import Image from "next/image";
import navigation from "../../../../public/data/navigation.json";
import generic from "../../../../public/data/generic.json";

const immaginePatrocinio = "/image/patrocinio-mockup.png";
const logo = "/image/logo_footer.svg";
function Footer() {
  const t = generic;

  return (
    <footer className={style.footer}>
      <div className={style.patrocinio}>
        <h2>Realizzato grazie al patrocinio di:</h2>
        <Image
          src={immaginePatrocinio}
          width={1055}
          height={160}
          alt="logo"
          loading="lazy"
        />
      </div>
      <div className={style.footer__first}>
        <div>
          <Image src={logo} width={300} height={91} alt="logo" loading="lazy" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
            voluptates optio. Aliquam praesentium voluptatum illo quia vitae.
            Eos molestiae minima quo soluta repellat cum harum dolorum laborum
            unde esse? Aliquid.
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
