import imgBanner from "@/shared/assets/images/banner.svg";
import BaseCarousel from "@/shared/ui/components/BaseCarousel";

const ProductCarousel = () => {
  return (
    <BaseCarousel
      slides={[imgBanner, imgBanner, imgBanner]}
      renderSlide={(url) => <img src={url} alt="" />}
    />
  );
};
export default ProductCarousel;
