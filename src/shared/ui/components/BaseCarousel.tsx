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
import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ProductCarouselProps<T> = {
  slides: T[];
  renderSlide: (item: T, index: number) => ReactNode;
  className?: string;
};

const BaseCarousel = <T,>({
  slides,
  renderSlide,
  className,
}: ProductCarouselProps<T>) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef([
    Autoplay({
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto px-8">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={plugin.current}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="py-0 border-0">
                  <CardContent className={cn("p-0", className)}>
                    {renderSlide(slide, index)}
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
        {slides.map((_, index) => (
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
export default BaseCarousel;
