import React from "react";
import style from "./page.module.scss";
import { getDataFromApi } from "@/utility/fetchdati";
import ScrollFix from "@/components/scroll/scrollFix";
import ImagePreload from "@/components/loaders/imagePreLoad";
import { formatDataFromApi } from "@/utility/generic";
import { tBlog } from "@/type";
import { tBlogFiles } from "@/type";
import Gallery from "@/components/gallery/gallery";
async function Page({ params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;
    const data = await getDataFromApi("blog", { slug: slug });
    const BlogLoghi = await getDataFromApi("blog_files", {});
    const documenti = await getDataFromApi(
      "blog_files_1",
      {
        blog_id: data && data[0].id,
      },
      -1,
      0,
      [
        "id",
        "directus_files_id",
        "directus_files_id.id",
        "directus_files_id.title",
        "directus_files_id.description",
        "directus_files_id.filename_download",
        "directus_files_id.type",
      ]
    );

    if (data) {
      const blogPage = data[0] as tBlog;
      // array di immagini creati dalla junction collection
      const image = BlogLoghi?.filter((item) => {
        return blogPage?.loghi.some((files) => files === item.id);
      });
      return (
        <div className={style.container}>
          <header
            className={` ${!data[0].immagine_principale ? style.noImage : ""}`}
          >
            {data[0].immagine_principale && (
              <ImagePreload
                loader={{
                  url: "/image/leiloader.svg",
                  width: 150,
                  height: 150,
                }}
                image={{
                  url:
                    process.env.NEXT_PUBLIC_ASSETS_URL +
                    data[0].immagine_principale,
                  width: 1200,
                  height: 400,
                  alt: data[0].titolo,
                }}
                type="fixed"
              />
            )}{" "}
            <div
              className={`${style.headerContent} ${
                !data[0].immagine_principale ? style.noImage : ""
              }`}
            >
              {data[0].data_inizio && data[0].data_fine && (
                <ul>
                  {" "}
                  {data[0].data_inizio && (
                    <li>
                      {formatDataFromApi(data[0].data_inizio, {
                        month: "long",
                        day: "numeric",
                      })}
                    </li>
                  )}{" "}
                  {data[0].data_fine && (
                    <li>{formatDataFromApi(data[0].data_fine)}</li>
                  )}
                </ul>
              )}
              <h1>{data[0].titolo}</h1>
            </div>
          </header>
          <section className={style.mainContent}>
            <div
              dangerouslySetInnerHTML={{
                __html: data[0].testo,
              }}
            />
            {documenti && documenti?.length > 0 && (
              <div className={style.documenti}>
                <h2>Documenti allegati</h2>
                <ul>
                  {documenti.map((item) => {
                    return (
                      <li key={item.id}>
                        <a
                          href={
                            process.env.NEXT_PUBLIC_ASSETS_URL +
                            "/" +
                            item.directus_files_id.id
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.directus_files_id.description ||
                            item.directus_files_id.title ||
                            "Documento allegato"}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          {image && image?.length > 1 && (
            <div className={style.loghi}>
              <Gallery type="three" images={image as tBlogFiles[]} />
            </div>
          )}
          <ScrollFix />
        </div>
      );
    }
  } catch (error) {
    console.log(error);
    return <div className={style.container}>Errore caricamento dati</div>;
  }
}

export default Page;
