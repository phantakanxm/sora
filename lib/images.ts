import { imageMeta, type ImageFile } from "@/data/image-meta";
import type { ImageAsset } from "@/types/product";

export function asset(file: ImageFile, alt: string, focus = "50% 50%"): ImageAsset {
  const meta = imageMeta[file];
  return {
    src: `/images/${file}`,
    width: meta.width,
    height: meta.height,
    blurDataURL: meta.blurDataURL,
    alt,
    focus,
  };
}
