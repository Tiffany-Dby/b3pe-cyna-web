import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/lib/components/ui/button";
import { Card, CardContent } from "@/lib/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/components/ui/carousel";
import img from "@/shared/assets/images/banner.svg";
import { useEffect, useRef, useState } from "react";

const ProductCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef([
    Autoplay({
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto px-8">
      <Carousel
        className="w-full max-w-md"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={plugin.current}
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="py-0">
                  <CardContent className="flex-center-center aspect-square p-6 bg-primary rounded-xl">
                    <img
                      src={img}
                      alt=""
                      className="min-w-full w-full min-h-full h-full object-contain"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="default" />
        <CarouselNext variant="default" />
      </Carousel>
      <div className="flex justify-center gap-4 py-2">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            onClick={() => api?.scrollTo(index)}
            variant={current - 1 === index ? "default" : "muted"}
            className="rounded-full p-2 aspect-square"
            aria-label={`Aller à la slide ${index + 1}`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default ProductCarousel;
