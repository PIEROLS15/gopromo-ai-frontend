import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PackageDetailsGalleryProps = {
  title: string;
  images: string[];
  currentImageIndex: number;
  onCurrentImageIndexChange: (index: number) => void;
  onOpenLightbox: (index: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
};

const PackageDetailsGallery = (props: PackageDetailsGalleryProps) => {
  const {
    title,
    images,
    currentImageIndex,
    onCurrentImageIndexChange,
    onOpenLightbox,
    onPrevImage,
    onNextImage,
  } = props;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-foreground">Galeria</h2>
        {images.length > 1 && (
          <button onClick={() => onOpenLightbox(0)} className="text-xs text-primary font-medium hover:underline">
            Ver todas ({images.length})
          </button>
        )}
      </div>

      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer mb-2"
        onClick={() => onOpenLightbox(currentImageIndex)}
      >
        {images.length > 0 ? (
          <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-full shrink-0">
                <Image
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src="/placeholder.jpg"
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onPrevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onNextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onCurrentImageIndexChange(index)}
              className={`relative w-16 h-12 sm:w-20 sm:h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex ? "border-primary" : "border-transparent hover:border-primary/50"}`}
            >
              <Image src={image} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageDetailsGallery;
