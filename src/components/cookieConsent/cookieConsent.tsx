"use client";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import style from "./cookieConsent.module.scss";
import { useRouter } from "next/navigation";

const CookieConsentBanner = () => {
  const { push } = useRouter();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentCookie = cookie.get("cookieConsent");

    if (!consentCookie || consentCookie === "rejected") {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "accepted", { expires: 365 });
  };

  const handleReject = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "rejected");
    push("https://google.com");
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className={style.wrapperCookie}>
      <h2>
        Questo sito utilizza cookies per migliorare l&apos;esperienza utente
      </h2>
      <p>
        Clicca su accetta per continuare, o consulta la nostra{" "}
        <a href="/cookie">cookie policy</a> e{" "}
        <a href="/privacy">privacy policy</a>
      </p>
      <button onClick={handleAccept}>Accetta</button>
      <button onClick={handleReject}>Rifiuta</button>
    </div>
  );
};

export default CookieConsentBanner;
