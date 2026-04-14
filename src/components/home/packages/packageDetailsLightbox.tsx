import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type PackageDetailsLightboxProps = {
  open: boolean;
  images: string[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const PackageDetailsLightbox = (props: PackageDetailsLightboxProps) => {
  const { open, images, currentIndex, title, onClose, onPrev, onNext } = props;

  if (!open || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="relative h-[90vh] w-[90vw]" onClick={(event) => event.stopPropagation()}>
        <Image src={images[currentIndex]} alt={title} fill className="object-contain rounded-lg" sizes="90vw" />
      </div>

      <button
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default PackageDetailsLightbox;
