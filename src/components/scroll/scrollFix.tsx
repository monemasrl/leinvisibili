"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function ScrollFix() {
  /**
   * Questo Porcaio di componente serve a fare in modo che la pagina si scrolli sempre in alto quando si   cambia pagina, visto che next.js non lo fa di default come da issue: https://github.com/vercel/next.js/issues/45187.
   * NON USARE NEL LAYOUT.
   *
   * @returns {*}
   */
  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return <></>;
}

export default ScrollFix;
