export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Drop your real photos into /public/gallery and update this list.
// width/height are the natural image dimensions (used for the masonry layout).
export const galleryImages: GalleryImage[] = [
  { src: "/gallery/photo1.png", alt: "Vihanga and Sandali, photo 1", width: 1408, height: 768 },
  { src: "/gallery/photo2.png", alt: "Vihanga and Sandali, photo 2", width: 1407, height: 768 },
  { src: "/gallery/photo3.png", alt: "Vihanga and Sandali, photo 3", width: 1408, height: 768 },
  { src: "/gallery/photo4.png", alt: "Vihanga and Sandali, photo 4", width: 1408, height: 768 },
  { src: "/gallery/photo5.png", alt: "Vihanga and Sandali, photo 5", width: 1408, height: 768 },
  { src: "/gallery/photo6.png", alt: "Vihanga and Sandali, photo 6", width: 1408, height: 768 },
];
