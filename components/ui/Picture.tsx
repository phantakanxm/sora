import Image from "next/image";
import type { ImageAsset } from "@/types/product";

type PictureProps = {
  image: ImageAsset;
  sizes: string;
  className?: string;
  /** Fill the positioned parent instead of using intrinsic dimensions. */
  fill?: boolean;
  preload?: boolean;
  quality?: 75 | 85;
  alt?: string;
  /** Apply the asset's focal point as object-position */
  focus?: boolean;
};

/** next/image preconfigured with the generated blur placeholder and dimensions. */
export function Picture({ image, sizes, className, fill, preload, quality = 75, alt, focus }: PictureProps) {
  const common = {
    src: image.src,
    sizes,
    className,
    quality,
    placeholder: "blur" as const,
    blurDataURL: image.blurDataURL,
    preload,
    style: focus ? { objectPosition: image.focus } : undefined,
  };
  const text = alt ?? image.alt;
  return fill ? (
    <Image {...common} alt={text} fill />
  ) : (
    <Image {...common} alt={text} width={image.width} height={image.height} />
  );
}
