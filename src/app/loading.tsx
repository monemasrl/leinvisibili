import style from "./page.module.scss";
import Image from "next/image";
export default function Loading() {
  return (
    <div className={"loading"}>
      <Image
        src="/image/logo_footer.svg"
        alt="loading"
        width={350}
        height={110}
      />
      <h1 style={{ fontSize: "1.5rem" }}>...Caricamento dati...</h1>
    </div>
  );
}
