"use client";

import React, { FormEvent, useEffect, useState } from "react";
import style from "./page.module.scss";
import { getDataFromApi, getDataAutriciOpere } from "@/utility/fetchdati";
import ArchivioLista from "@/components/archivio/archivioLista";
function page() {
  const [searchField, setSearchField] = useState<{
    opera?: string;
    nome?: string;
    cognome?: string;
  }>({});
  const [filter, setFilter] = useState<{ collection: string; campo: string }>({
    collection: "autrici",
    campo: "nome",
  });
  const [searchData, setSearchData] = useState<any>(null);
  const [result, setResult] = useState<any>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [defaultData, setDefaultData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  /* funzione SUBMIT del form */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let res;

    if (filter.collection === "opere" && searchField.opera) {
      res = { opera: searchField.opera };
      setSearchData(res);
    } else if (
      filter.collection === "autrici" &&
      (searchField.nome || searchField.cognome)
    ) {
      res = { nome: searchField.nome, cognome: searchField.cognome };
      setSearchData(res);
    } else {
      setSearchData(null);
    }
  }
  /* funzione Fetch che scarica i dati e setta lo stato Result */
  async function fetchData(type: string, searchData: any) {
    try {
      const data = await getDataFromApi(filter.collection, searchData);
      if (data) {
        setResult(data);
      } else {
        throw new Error("errore collegamento al database");
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  }

  /* funzione Fetch che scarica i dati AUTRICI DEFAULT e setta lo stato Result */
  async function fetchDefaultData() {
    try {
      const data = await getDataFromApi("autrici", { status: "published" }, 2);
      if (data) {
        setDefaultData(data);
      } else {
        throw new Error("errore collegamento al database");
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  }
  async function dataAutriciOpere(datiPerRicerca: {
    opera?: string;
    nome?: string;
    cognome?: string;
  }) {
    try {
      const data = await getDataAutriciOpere(datiPerRicerca);
      // se ci sono dati li setta nella variabile di stato
      if (data) {
        setResult(data);
      } else {
        throw new Error("errore collegamento al database");
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  }

  useEffect(() => {
    if (
      (searchField.nome?.length || searchField.cognome?.length) &&
      filter.collection !== "opere"
    ) {
      fetchData(filter.collection, searchData);
    }

    // se si ricercano delle opere esegue funzione asincrona per dati delle autrici e delle opere
    if (searchField.opera?.length && filter.collection === "opere") {
      dataAutriciOpere(searchField);
    }

    fetchDefaultData();
  }, [searchData]);
  console.log("searchData", searchData);
  return (
    <div className={style.container}>
      <h1>Archivio autrici</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.searchField}>
          {filter.collection === "opere" ? (
            <input
              type="text"
              id="search"
              name="search"
              placeholder="titolo"
              onChange={(e) => {
                setSearchField({ opera: e.target.value });
              }}
            />
          ) : (
            <div className={style.searchNome}>
              <input
                type="text"
                name="nome"
                placeholder="nome"
                onChange={(e) => {
                  setSearchField((prev) => {
                    return { ...prev, opera: "", nome: e.target.value };
                  });
                }}
              />
              <input
                type="text"
                name="cognome"
                placeholder="cognome"
                onChange={(e) => {
                  setSearchField((prev) => {
                    return { ...prev, opera: "", cognome: e.target.value };
                  });
                }}
              />
            </div>
          )}
          <div className={style.filterBox}>
            <div className={style.filter}>
              <label htmlFor="nome">Autrice</label>
              <input
                type="radio"
                id="nome"
                name="filter"
                value="nome"
                defaultChecked
                onChange={() =>
                  setFilter({ collection: "autrici", campo: "nome" })
                }
              />
            </div>

            <div className={style.filter}>
              <label htmlFor="opere">Opera</label>
              <input
                type="radio"
                id="opere"
                name="filter"
                value="opere"
                onChange={() =>
                  setFilter({ collection: "opere", campo: "titolo" })
                }
              />
            </div>
          </div>{" "}
        </div>
        <button type="submit">cerca</button>
      </form>

      {Boolean(result?.length && searchData) && (
        <ArchivioLista result={result} abstract />
      )}
      {Boolean(result?.length <= 0) && (
        <div className={style.noResults}>
          <p>nessun risultato</p>
        </div>
      )}

      {defaultData && (
        <section className={style.defaultData}>
          <h2>Ultime Autrici</h2>
          <ArchivioLista result={defaultData} />
        </section>
      )}
      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default page;
