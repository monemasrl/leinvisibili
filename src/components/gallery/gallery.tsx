"use client";
import { useState } from "react";
import style from "./gallery.module.scss";
import Image from "next/image";
import FixedModal from "../modals/fixedModal";
import { tAutriciFiles } from "@/type";

function Gallery({ type, images }: { type: string; images: any[] }) {
  const [modalState, setModalState] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  if (type === "one") {
    return (
      <div className={style.galleryGrid}>
        {/*      <FixedModal modalState={modalState} closeModal={setModalState}>
          <SimpleSlider data={images} id={currentImage} />
        </FixedModal> */}
        <div className={style.galleryGrid__colBig}>
          <button
            onClick={() => {
              setModalState(true);
              setCurrentImage(0);
            }}
          >
            <Image
              src={"/image/" + images[0]}
              width={900}
              height={450}
              alt="gallery"
            />
          </button>
        </div>
        <div className={style.galleryGrid__colBig}>
          <button
            onClick={() => {
              setModalState(true);
              setCurrentImage(1);
            }}
          >
            <Image
              src={"/image/" + images[1]}
              width={450}
              height={225}
              alt="gallery"
            />
          </button>
          <p></p>
        </div>
        <div className={style.galleryGrid__col}>
          <button
            onClick={() => {
              setModalState(true);
              setCurrentImage(2);
            }}
          >
            <Image
              src={"/image/" + images[2]}
              width={450}
              height={225}
              alt="gallery"
            />
          </button>
        </div>
        <div className={style.galleryGrid__col}>
          <button
            onClick={() => {
              setModalState(true);
              setCurrentImage(3);
            }}
          >
            <Image
              src={"/image/" + images[3]}
              width={450}
              height={225}
              alt="gallery"
            />
          </button>
        </div>
        <div className={style.galleryGrid__col}>
          <button
            onClick={() => {
              setModalState(true);
              setCurrentImage(4);
            }}
          >
            <Image
              src={"/image/" + images[4]}
              width={450}
              height={225}
              alt="gallery"
            />
          </button>
        </div>
        <div className={style.galleryGrid__col}>
          <button
            onClick={() => {
              setModalState(true);
              setCurrentImage(5);
            }}
          >
            <Image
              src={"/image/" + images[5]}
              width={450}
              height={225}
              alt="gallery"
            />
          </button>
        </div>
      </div>
    );
  }
  if (type === "two") {
    return (
      <div className={style.masonryWrapper}>
        {/*  <FixedModal modalState={modalState} closeModal={setModalState}>
          <SimpleSlider data={images} id={currentImage} />
        </FixedModal> */}

        {images.map((item, index) => {
          return (
            <div key={index} className={style.masonryItem}>
              <button
                onClick={() => {
                  setModalState(true);
                  setCurrentImage(index);
                }}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_ASSETS_URL +
                    item.directus_files_id.id
                  }
                  width={150}
                  height={150}
                  alt="gallery"
                />
              </button>
              <p>
                {item.directus_files_id.description
                  ? item.directus_files_id.description
                  : ""}
              </p>
            </div>
          );
        })}

        <FixedModal modalState={modalState} closeModal={setModalState}>
          <Image
            src={
              process.env.NEXT_PUBLIC_ASSETS_URL +
              images[currentImage].directus_files_id.id
            }
            width={900}
            height={450}
            alt="gallery"
          />
        </FixedModal>
      </div>
    );
  }
  if (type == "three") {
    return (
      <div className={style.genericGallery}>
        {images.map((item, index) => {
          return (
            <div key={index} className={style.genericGallery__item}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_ASSETS_URL +
                  (item as tAutriciFiles).directus_files_id.id
                }
                width={300}
                height={300}
                alt="gallery"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gallery;
