import { useMediaQuery } from "react-responsive";

const useMarginLeft = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isMedium = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });

  const getMarginLeft = () => {
    if (isMobile) return "";
    if (isMedium) return "16px";
    if (isLarge) return "200px";
    return "200px";
  };

  return getMarginLeft();
};

export default useMarginLeft;
