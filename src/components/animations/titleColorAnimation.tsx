"use client";

import style from "./animations.module.scss";

function TitleColorAnimation({
  title,
  color1,
  color2,
}: {
  title: string;
  color1: string;
  color2: string;
}) {
  return (
    <div className={style.titolColorAnimation}>
      <h3 style={{ color: color1 }}>
        {title}
        <span style={{ color: color2 }}>{title}</span>
      </h3>
    </div>
  );
}

export default TitleColorAnimation;
