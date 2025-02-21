"use client";

import React, { FormEvent, useEffect, useState } from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import Link from "next/link";

function page() {
  const [searchField, setSearchField] = useState("");
  const [filter, setFilter] = useState<Record<string, any>>({
    collection: "autrici",
    campo: "nome",
  });
  const [searchData, setSearchData] = useState<any>(null);
  const [result, setResult] = useState<any>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let res;

    res = {
      [filter.campo]: { _contains: searchField },
    };

    setSearchData(res);
  }

  useEffect(() => {
    console.log(searchData);
    const fetchData = async () => {
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
    };
    if (searchField) {
      fetchData();
    }
  }, [searchData]);

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="search">ricerca</label>
        <input
          type="text"
          id="search"
          name="search"
          onChange={(e) => {
            if (filter.campo === "nome") {
              const ToUpperCase =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1);
              setSearchField(ToUpperCase);
            } else {
              setSearchField(e.target.value);
            }
          }}
        />

        <div className="filterBox">
          <label htmlFor="all">Nome</label>
          <input
            type="radio"
            id="nome"
            name="filter"
            value="nome"
            defaultChecked
            onChange={() => setFilter({ collection: "autrici", campo: "nome" })}
          />
          <label htmlFor="cognome">Cognome</label>
          <input
            type="radio"
            id="cognome"
            name="filter"
            value="cognome"
            onChange={() =>
              setFilter({ collection: "autrici", campo: "cognome" })
            }
          />
          <label htmlFor="opere">Opera</label>
          <input
            type="radio"
            id="opere"
            name="filter"
            value="opere"
            onChange={() => setFilter({ collection: "opere", campo: "titolo" })}
          />
        </div>
        <button type="submit">cerca</button>
      </form>

      {result?.length && (
        <div className={style.results}>
          {result.map((item: any) => {
            if (item.titolo) {
              return (
                <div key={item.id}>
                  <Link href={`/opere/${item.slug}`}>
                    <h2>{item.titolo}</h2>
                  </Link>
                </div>
              );
            } else {
              return (
                <div key={item.id}>
                  <Link href={`/autrici/${item.slug}`}>
                    <h2>
                      {item.nome} {item.cognome}
                    </h2>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      )}
      {result?.length <= 0 && searchData && (
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
