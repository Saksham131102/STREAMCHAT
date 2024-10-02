import Carousel from "@/components/Carousel";
import { useParams } from "react-router-dom";

const DynamicPage = () => {
  // const { pageName } = useParams();
  // pageName: ['home', 'movies', 'web-series', 'tv-shows']
  return (
    <>
      <Carousel />
    </>
  );
};

export default DynamicPage;
