"use client";

import React, { FormEvent, useEffect, useState } from "react";
import style from "./page.module.scss";
import { getDataFromApi, getDataAutriciOpere } from "@/utility/fetchdati";
import Link from "next/link";
import { tAutrice, tOpereAutrici } from "@/type";
import { formatDataFromApi } from "@/utility/generic";
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
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let res;
    if (filter.collection === "opere") {
      res = { opera: searchField.opera };
    } else {
      res = { nome: searchField.nome, cognome: searchField.cognome };
    }
    setSearchData(res);
  }

  useEffect(() => {
    if (
      (searchField.nome?.length || searchField.cognome?.length) &&
      filter.collection !== "opere"
    ) {
      fetchData();
    }

    // se si ricercano delle opere esegue funzione asincrona per dati delle autrici e delle opere
    if (searchField.opera?.length && filter.collection === "opere") {
      dataAutriciOpere(searchField);
    }
  }, [searchData]);

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
              onChange={(e) => {
                setSearchField({ opera: e.target.value });
              }}
            />
          ) : (
            <div className={style.fieldNomeCognome}>
              <input
                type="text"
                name="nome"
                onChange={(e) => {
                  setSearchField((prev) => {
                    return { ...prev, nome: e.target.value };
                  });
                }}
              />
              <input
                type="text"
                name="cognome"
                onChange={(e) => {
                  setSearchField((prev) => {
                    return { ...prev, cognome: e.target.value };
                  });
                }}
              />
            </div>
          )}
          <div className={style.filterBox}>
            <div className={style.filter}>
              <label htmlFor="nome">Nome</label>
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

      {Boolean(result?.length) && (
        <div className={style.results}>
          {result.map((item: any) => {
            if (item.opera) {
              return (
                <div className={style.result} key={item.opera}>
                  <h2>{item.opera}</h2>
                  <ul className={style.boxAutrice}>
                    {item.autrice.map((autrice: tAutrice) => {
                      return (
                        <li key={autrice.id}>
                          <Link href={`/autrici/${autrice.slug}`}>
                            <h3>
                              {autrice.nome} {autrice.cognome}
                            </h3>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else {
              return (
                <div className={style.result} key={item.id}>
                  <div className={style.autrice}>
                    <Link href={`/autrici/${item.slug}`}>
                      <h2>
                        {item.nome} {item.cognome}
                      </h2>
                    </Link>
                    <ul className={style.data}>
                      <li>
                        {item.data_di_nascita
                          ? formatDataFromApi(item.data_di_nascita, {
                              year: "numeric",
                            })
                          : ""}
                      </li>
                      <li>
                        {item.data_di_morte
                          ? formatDataFromApi(item.data_di_morte, {
                              year: "numeric",
                            })
                          : ""}
                      </li>
                    </ul>
                    <div
                      className={style.abstract}
                      dangerouslySetInnerHTML={{ __html: item.abstract }}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
      {Boolean(result?.length <= 0 && searchData) && (
        <div className={style.noResults}>
          <p>nessun risultato</p>
        </div>
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
