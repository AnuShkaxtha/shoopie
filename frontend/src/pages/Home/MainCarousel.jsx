import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTheme } from "@/processes/theme/theme-provider";

// Fetching images from assets
const heroTextureImports = import.meta.glob(
  "../../assets/*.{png,jpg,jpeg,svg}",
  { eager: true }
);

const MainCarousel = () => {
  const images = Object.values(heroTextureImports).map(
    (module) => module.default
  );
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mt-12 md:mt-16">
      <Carousel className="w-full h-96 ">
        <CarouselContent className="relative h-96 ">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Card className="h-full">
                <CardContent className="relative flex items-center justify-center h-full p-0">
                  <img
                    src={src}
                    alt={`carousel-${index}`}
                    className="object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute left-0 z-10 p-2 transform -translate-y-1/2 cursor-pointer top-1/2"
          onClick={handlePrevious}
          disabled={images.length === 0 || currentIndex === 0} // Disable if no images or at first image
        />
        <CarouselNext
          className="absolute right-0 z-10 p-2 transform -translate-y-1/2 cursor-pointer top-1/2"
          onClick={handleNext}
        />
      </Carousel>
      <div
        className={`absolute bottom-11 left-11 right-0 py-2 text-center bg-black ${
          theme === "dark" ? "bg-opacity-70" : "bg-opacity-40"
        } text-white w-[250px]`}
      >
        <p className="text-lg">-- NEW ITEMS --</p>
        <h1 className="text-4xl font-bold">Summer Sale</h1>
        <p className="text-xl font-semibold underline">Discover More</p>
      </div>
    </div>
  );
};

export default MainCarousel;