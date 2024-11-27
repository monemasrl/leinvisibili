"use client";
import { useState, useEffect } from "react";
import style from "./form.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import generic from "../../../public/data/generic.json";

function SuccessMessage({ status }: { status: string | null }) {
  const t = generic.FormContatti;
  return (
    <AnimatePresence>
      {status === "ok" && (
        <motion.div
          className={style.success}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div dangerouslySetInnerHTML={{ __html: t.success }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function Form() {
  const t = generic.FormContatti;
  const [nome, setNome] = useState<string>("");
  const [errorNome, setErrorNome] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [errorTel, setErrorTel] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [errorMail, setErrorMail] = useState<string>("");
  const [messaggio, setMessaggio] = useState<string>("");
  const [errorMessaggio, setErrorMessaggio] = useState<string>("");
  const [privacy, setPrivacy] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (nome.length < 3 && nome.length > 0) {
      setErrorNome(t.err_nome);
    } else {
      setErrorNome("");
    }
    if (tel.length < 8 && tel.length > 0) {
      setErrorTel(t.err_tel);
    } else {
      setErrorTel("");
    }

    if (mail.length < 6 && mail.length > 0) {
      setErrorMail(t.err_email);
    } else if (mail.length > 0 && !mail.includes("@")) {
      setErrorMail(t.err_email);
    } else {
      setErrorMail("");
    }

    if (messaggio.length < 10 && messaggio.length > 0) {
      setErrorMessaggio(t.err_messaggio);
    } else {
      setErrorMessaggio("");
    }

    //controllo sul submit del form netlify
    if (
      nome.length < 3 ||
      tel.length < 3 ||
      mail.length < 3 ||
      !mail.includes("@") ||
      messaggio.length < 10 ||
      !privacy
    ) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  }, [nome, mail, messaggio, tel, privacy]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setStatus("pending");
      setError(null);
      const myForm = event.target;
      const formData = new FormData(myForm);
      const res = await fetch("/netlifyFormContatti.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.status === 200) {
        setNome("");
        setTel("");
        setMail("");
        setMessaggio("");
        setStatus("ok");
        setPrivacy(false);
      } else {
        setStatus("error");
        setError(`${res.status} ${res.statusText}`);
      }
    } catch (e) {
      setStatus("error");
      setError(`${e}`);
    }
  };

  return (
    <form
      className={`${style.form} ${style.form__lavora}`}
      name="contatti"
      onSubmit={handleFormSubmit}
    >
      <SuccessMessage status={status} />
      <input type="hidden" name="form-name" value="contatti" />
      <p>
        {" "}
        <label htmlFor="nome">{t.nome}</label> <br />
        <input
          onChange={(e) => {
            setNome(e.target.value);
          }}
          type="text"
          placeholder={t.nome}
          name="nome"
          id="nome"
          value={nome}
          required
        />
      </p>
      <p>
        <label htmlFor="telefono">{t.tel}</label> <br />
        <input
          onChange={(e) => {
            setTel(e.target.value);
          }}
          placeholder={t.tel}
          type="text"
          name="telefono"
          value={tel}
          id="telefono"
          required
        />
      </p>
      <p>
        <label htmlFor="youremail">{t.email}</label> <br />
        <input
          onChange={(e) => setMail(e.target.value)}
          placeholder={t.email}
          type="email"
          name="email"
          value={mail}
          id="youremail"
          required
        />
      </p>

      <p>
        <label htmlFor="yourmessage">{t.messaggio}</label> <br />
        <textarea
          onChange={(e) => {
            setMessaggio(e.target.value);
          }}
          placeholder={t.messaggio}
          name="message"
          value={messaggio}
          id="yourmessage"
          required
        ></textarea>
      </p>
      <p className={style.privacy}>
        <label htmlFor="privacy" className={style.privacy__label}>
          Accetto i termini sulla&nbsp;
          <a href={t.privacy_url} target="_blank">
            {t.privacy}
          </a>
        </label>
        <input
          onChange={(e) => setPrivacy(e.target.checked)}
          id="privacy"
          type="checkbox"
          name="privacy"
          required
        />
      </p>
      <div style={{ height: "20px" }}>
        {errorNome && <p className={style.error}>{errorNome}</p>}
        {errorTel && <p className={style.error}>{errorTel}</p>}
        {errorMail && <p className={style.error}>{errorMail}</p>}
        {errorMessaggio && <p className={style.error}>{errorMessaggio}</p>}
      </div>
      <p>
        <button disabled={submit ? false : true} type="submit">
          Invia
        </button>
      </p>
    </form>
  );
}

export default Form;
