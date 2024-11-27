"use client";

import style from "./footer.module.scss";
import generic from "../../../../public/data/generic.json";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Footer() {
  const pathN = usePathname();
  const t = generic;

  return (
    <footer className={style.footer}>
      <div className={style.footer__first}>
        <Image
          src="/image/dott-vincenti-logo.png"
          width={180}
          height={38}
          alt="logo"
        />

        <ul>
          <li>
            <a href={`tel:${t.generics.telNumber}`}>
              {t.generics.label_tel}:{t.generics.telNumber}
            </a>
          </li>
          <li>
            {t.generics.label_iva}:{t.generics.iva}
          </li>
          <li>{t.generics.albo}</li>
          <li>
            {t.generics.label_powered}:{t.generics.powered}
          </li>
        </ul>
        <p>{t.generics.footer_credit}</p>
      </div>
    </footer>
  );
}

export default Footer;
