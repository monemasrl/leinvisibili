"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./nav.module.scss";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import navigation from "../../../../public/data/navigation.json";
import { useLenis } from "@studio-freight/react-lenis";
import { useMediaQuery } from "react-responsive";
function NavBar() {
  const landscape = useMediaQuery({ query: "(min-width: 1024px)" });
  const pathN = usePathname();
  const [mobile, setMobile] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // funzione per gestire lo scroll con smooth scroll LENIS
  const scroll = useLenis();

  const t = navigation.navigation;

  function isHome() {
    if (pathN === "/") {
      return true;
    }
    return false;
  }
  function handleScroll() {
    if (landscape) {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    setMobile(false);
  }, [pathN]);

  return (
    <header
      className={`
        ${style.header} 
        ${scrolling ? style.scrolling : ""} 
        ${!isHome() ? style.page : ""}
        `}
    >
      <nav className={`${style.mainNavBar}`}>
        <div className={style.mainNavBar__logo}>
          <Link href="/" className={style.title}>
            <>
              <div
                className={`${style.mainTitle} ${
                  scrolling ? style.title__scrolling : ""
                }`}
              >
                Le Invisibili <span>web archive</span>
              </div>
            </>
          </Link>
        </div>
        <div
          className={`${style.mainNavBar__navBlock} ${style.mainNavBar__inner}`}
        >
          <ul className={style.mainNavBar__navBlock__nav}>
            {t.map(
              (
                item: {
                  name?: string;
                  url?: string;
                  sub?: { name: string; url: string }[];
                },
                index
              ) => (
                <li
                  className={`${
                    pathN.includes(item.url || "") && style.activeLink
                  }`}
                  key={index}
                >
                  <Link href={item.url || "/"}>{item.name}</Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div
          className={`${style.burger} ${
            isHome() ? style.burger__home : style.burger__inner
          }`}
          onClick={() => setMobile(true)}
        >
          <RxHamburgerMenu />
        </div>
        <AnimatePresence>
          {mobile && (
            <motion.div
              key="mobileMenu"
              className={style.navMobile}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div
                className={style.navMobile__close}
                onClick={() => setMobile(false)}
              >
                <RxCross2 />
              </div>
              <a href="/">
                <Image
                  src="/image/logo-studio-dentistico-vincenzi.png"
                  width={220}
                  height={40}
                  alt="logo"
                />
              </a>

              <ul className={style.navMobile__nav}>
                {t.map((item, index) => (
                  <li
                    className={`${
                      pathN.includes(item.url || "") && style.activeLink
                    }`}
                    key={index}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        scroll?.scrollTo(item.url || "", { offset: -100 });
                        setMobile(false);
                      }}
                      href={item.url || ""}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <hr style={{ width: "50%" }} />
              <div className={style.navMobile__generic}>
                Via della Stazione 27, Barga - 0583 711372 - info@vtservices.it
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
export default NavBar;
