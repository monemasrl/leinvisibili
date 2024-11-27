"use client";
import { useEffect, useState } from "react";
import style from "./tabs.module.scss";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
type Tdata = {
  titolo: string;
  testo: string;
  image: string;
  link?: string;
};

function TabNav({
  data,
  setActiveTab,
}: {
  data: Tdata[] | undefined;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  function getListData(data: Tdata[]) {
    return data.map((item: Tdata, index: number) => {
      return (
        <li
          onClick={() => {
            setActiveTab(index);
          }}
          key={index}
        >
          {item.titolo}
        </li>
      );
    });
  }

  return (
    <div className={style.tabNav}>
      <ul>{data && getListData(data)}</ul>
    </div>
  );
}

function TabBody({ tabData }: { tabData: Tdata | undefined }) {
  return (
    <AnimatePresence mode="wait">
      {tabData && (
        <motion.div
          key={tabData.titolo}
          className={style.tabBody}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {tabData?.image ? (
            <motion.div
              className={style.tabBody__image}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <Image src={tabData.image} alt={tabData?.titolo} fill />
            </motion.div>
          ) : (
            <div>no image</div>
          )}
          <div className={style.tabBody__content}>
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {tabData?.titolo}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {tabData?.testo}
            </motion.p>
            <a href={tabData?.link}>Link</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Tabs({ data }: { data: Tdata[] | undefined }) {
  const [activeTab, setActiveTab] = useState(0);
  const [tabData, setTabData] = useState<Tdata | undefined>(
    data && data[activeTab]
  );
  useEffect(() => {
    setTabData(data && data[activeTab]);
  }, [activeTab]);

  if (!data) return null;
  return (
    <div className={style.tabs}>
      <TabNav data={data} setActiveTab={setActiveTab} />
      <TabBody tabData={tabData} />
    </div>
  );
}

export default Tabs;
