const imageModules = import.meta.glob("/src/assets/images/gallery-image-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const videoModules = import.meta.glob("/src/assets/images/gallery-video-*.mp4", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImageOrder = (modulePath: string): number => {
  const match = modulePath.match(/gallery-image-(\d+)\.jpg$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const getVideoOrder = (modulePath: string): number => {
  const match = modulePath.match(/gallery-video-(\d+)\.mp4$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

export const localImagePool = Object.entries(imageModules)
  .sort(([modulePathA], [modulePathB]) => getImageOrder(modulePathA) - getImageOrder(modulePathB))
  .map(([, imageUrl]) => imageUrl);

export const localVideoPool = Object.entries(videoModules)
  .sort(([modulePathA], [modulePathB]) => getVideoOrder(modulePathA) - getVideoOrder(modulePathB))
  .map(([, videoUrl]) => videoUrl);

export const getLocalImage = (index: number): string => {
  if (localImagePool.length === 0) {
    return "";
  }

  const normalizedIndex =
    ((Math.floor(index) % localImagePool.length) + localImagePool.length) % localImagePool.length;

  return localImagePool[normalizedIndex];
};

export const getLocalImages = (count: number, startIndex = 0): string[] => {
  const safeCount = Math.max(0, Math.floor(count));
  return Array.from({ length: safeCount }, (_, offset) => getLocalImage(startIndex + offset));
};

export const getLocalVideo = (index: number): string => {
  if (localVideoPool.length === 0) {
    return "";
  }

  const normalizedIndex =
    ((Math.floor(index) % localVideoPool.length) + localVideoPool.length) % localVideoPool.length;

  return localVideoPool[normalizedIndex];
};

export const getLocalVideos = (count: number, startIndex = 0): string[] => {
  const safeCount = Math.max(0, Math.floor(count));
  return Array.from({ length: safeCount }, (_, offset) => getLocalVideo(startIndex + offset));
};
