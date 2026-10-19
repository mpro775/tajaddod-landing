function handleImageError(image: HTMLImageElement) {
  const fallback = image.dataset.imageFallback;
  if (!fallback) return;
  delete image.dataset.imageFallback;
  image.src = fallback;
  image.removeAttribute('srcset');
}

export function initProductMedia() {
  document.querySelectorAll<HTMLImageElement>('img[data-image-fallback]').forEach((image) => {
    image.addEventListener('error', () => handleImageError(image));
    if (image.complete && image.naturalWidth === 0) handleImageError(image);
  });
}
