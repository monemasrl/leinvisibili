import React from "react";
import { tBlog } from "@/type";
import style from "./news.module.scss";
import { formatDataFromApi } from "@/utility/generic";
import Link from "next/link";
function News({
  data,
  mainTitle = "News",
}: {
  data: tBlog[];
  mainTitle?: string | undefined;
}) {
  return (
    <div className={style.news}>
      <h2>
        <Link href={"/news"}>{mainTitle && mainTitle}</Link>
      </h2>
      <div className={style.news__wrapper}>
        {data.map((item, index) => {
          return (
            <div className={style.news__wrapper__box} key={index}>
              <Link href={`/news/${item.slug}`}>
                <h3>{item.titolo}</h3>
              </Link>
              {/*       <Image
                src={
                  process.env.NEXT_PUBLIC_ASSETS_URL + item.immagine_principale
                }
                width={500}
                height={500}
                alt={"item.titolo"}
              /> */}
              <ul>
                {" "}
                {item.data_inizio && (
                  <li>{formatDataFromApi(item.data_inizio)}</li>
                )}{" "}
                {item.data_fine && <li>{formatDataFromApi(item.data_fine)}</li>}
              </ul>
              <p dangerouslySetInnerHTML={{ __html: item.abstract }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default News;
