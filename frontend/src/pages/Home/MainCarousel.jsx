import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTheme } from "@/processes/theme/theme-provider";


//fetching images from assest
const heroTextureImports = import.meta.glob(
  "../../assets/*.{png,jpg,jpeg,svg}",
  { eager: true }
);

const MainCarousel = () => {
  const images = Object.values(heroTextureImports).map(
    (module) => module.default
  );
  const { theme } = useTheme();

  return (
    <div className="relative w-full">
      <Carousel className="w-full h-96">
        <CarouselContent className="relative h-96">
          {images.map((src, index) => (
            <CarouselItem key={index} className="relative h-full">
              <Card className="h-full">
                <CardContent className="relative flex items-center justify-center h-full p-0 ">
                  <img
                    src={src}
                    alt={`carousel-${index}`}
                    className="object-cover w-full h-full "
                  />

                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 z-10 p-2 transform -translate-y-1/2 top-1/2" />
        <CarouselNext className="absolute right-0 z-10 p-2 transform -translate-y-1/2 top-1/2" />
      </Carousel>
      <div
        className={`absolute bottom-11 left-11 right-0  py-2 text-center bg-black ${theme === "dark" ? "bg-opacity-70" : "bg-opacity-40"
          } text-white w-[250px]`}
      >
        <p className="text-lg">-- NEW ITEMS--</p>
        <h1 className="text-4xl font-bold">Summer Sale</h1>
        <p className="text-xl font-semibold underline">Discover More</p>
      </div>

    </div>
  );
};

export default MainCarousel;
