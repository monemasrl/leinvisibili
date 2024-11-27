import styles from "./instagram.module.scss";
import ImagePreload from "../loaders/imagePreLoad";
import TitleAnimations from "../animations/titleAnimations";

type Tdata = {
  data: {
    id: string;
    media_url: string;
    permalink: string;
    media_type: string;
    thumbnail_url: string;
  }[];
};

export default async function InstagramPost({
  token,
  client,
}: {
  token: string;
  client: string;
}) {
  const data: any = await fetch(
    `https://graph.instagram.com/v20.0/me/media?fields=id,media_url,permalink,media_type,thumbnail_url&limit=10&access_token=IGQWROUU9MaW9PU1ZA2UVlVN3dTTGJ6cXpFckJtWGNNT2FlUGtubHhBQUZAZAT0Q4MS1JaFFqOGRDLUtuOEZAwOTBjaEhJbDJYeWVWa1luN3c0UlRMTjU5WjJfVlZA4eFZA0VlNCZA3ZAFckJvbU96SDRsenk3SDBZAUHRGbnMZD`,
    { next: { revalidate: 3600 } }
  );
  const dataRes: Tdata = await data.json();

  if (!dataRes) return <div>loading</div>;
  console.log(dataRes, "data");

  return (
    <div className={styles.wrapperInstagram}>
      <TitleAnimations testo="BarbellGram" animation="letter" />
      <ul className={styles.wrapperInstagram__list}>
        {dataRes &&
          dataRes.data?.map(
            (post: {
              id: string;
              media_url: string;
              permalink: string;
              media_type: string;
              thumbnail_url: string;
            }) => {
              return (
                <li key={post.id}>
                  <a target="_blank" href={post.permalink}>
                    {post.media_type === "VIDEO" ? (
                      <ImagePreload
                        src={post.thumbnail_url}
                        type="fixed"
                        width={300}
                        height={300}
                        alt="instagram post"
                        isLazy={true}
                      />
                    ) : (
                      <ImagePreload
                        src={post.media_url}
                        type="fixed"
                        width={300}
                        height={300}
                        alt="instagram post"
                        isLazy={true}
                      />
                    )}
                  </a>
                </li>
              );
            }
          )}
      </ul>
    </div>
  );
}
