// Responsive image sources so phones download small files and big screens get sharp ones.
// Shop photos: public/photos/web/<name>.jpg (1920px) + public/photos/web/sm/<name>.jpg (800px).
// Instagram photos: public/photos/instagram/<name>.jpg (1600px) + .../thumb/<name>.jpg (640px).

export function srcSetFor(src: string): string | undefined {
  if (src.startsWith('/photos/web/') && !src.startsWith('/photos/web/sm/')) {
    return `${src.replace('/photos/web/', '/photos/web/sm/')} 800w, ${src} 1920w`;
  }
  if (src.startsWith('/photos/instagram/') && !src.includes('/thumb/')) {
    return `${src.replace('/photos/instagram/', '/photos/instagram/thumb/')} 640w, ${src} 1600w`;
  }
  return undefined;
}

// Small version for faded background images, where detail doesn't matter.
export const smallPhoto = (src: string) => src.replace('/photos/web/', '/photos/web/sm/');
