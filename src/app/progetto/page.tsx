import React from "react";
import style from "./page.module.scss";
import navigation from "../../../public/data/generic.json";
function page() {
  const generic = navigation.Progetto;
  return (
    <div className={style.container}>
      <section>
        <h1>Il progetto</h1>
        <p>{generic.description}</p>
      </section>
      <section className={style.staff}>
        <h2>I nostri contributors</h2>
      </section>
    </div>
  );
}

export default page;
