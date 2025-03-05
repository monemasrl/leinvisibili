import { useMediaQuery } from "react-responsive";

function useMediaquery() {
  const phone = useMediaQuery({ query: "(min-width: 460px)" });
  const tablet = useMediaQuery({ query: "(min-width: 720px)" });
  const landscape = useMediaQuery({ query: "(min-width: 1024px)" });
  const desktop = useMediaQuery({ query: "(min-width: 1200px)" });
  const large = useMediaQuery({ query: "(min-width: 1340px)" });
  const wide = useMediaQuery({ query: "(min-width: 1620px)" });
  const big = useMediaQuery({ query: "(min-width: 1920px)" });
  return { phone, tablet, landscape, desktop, large, wide, big };
}

export default useMediaquery;
