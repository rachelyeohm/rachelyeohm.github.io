// If you're using Vite
const imageModules = import.meta.glob('/src/images/*/*.jpg', { eager: true, as: 'url' });

export type Item = {
  id: number;
  key: string;
  front_image: string;
  images: string[];
  description: string;
};

const descriptions: Record<string, string> = {
  bear: 'A huge bear made with a 7.0mm hook, about 44cm tall',
  benben: 'A small cat named 笨笨 (stupid stupid)',
  furina: 'A chibi head of Furina from Genshin Impact',
  hedgehog : 'A hedgehog I made overseas that followed me on my travels',
  kokomi : 'A large doll of Kokomi from Genshin Impact. Clothes are removable (in case I want to make more clothes for her)',
  miku : 'A small doll of Hatsune Miku. My favourite!',
  mizuki : 'A small doll of Mizuki from Project Sekai. I crocheted the ribbed cuffs on the ends of the sleeves and jacket myself (third slide)',
  sparkle : 'A small doll of Sparkle from Honkai Star Rail. I crocheted and painted the tiny flower myself (third slide)',
  cinnamoroll : 'A tapestry piece of Cinnamoroll, made with popcorn stitches'
};

export function generateItems(): Item[] {
  const folderImages: Record<string, string[]> = {};

  // Group images by folder (e.g., 'bear' -> [img1, img2, ...])
  for (const path in imageModules) {
    const match = path.match(/\/images\/([^/]+)\/(\d+)\.jpg$/);
    if (match) {
      const folder = match[1];
      const imagePath = imageModules[path] as string;

      if (!folderImages[folder]) folderImages[folder] = [];
      folderImages[folder].push(imagePath);
    }
  }

  // Sort images in each folder by index
  // Object.values(folderImages).forEach((arr) =>
  //   arr.sort((a, b) => {
  //     const getNum = (s: string) => parseInt(s.match(/(\d+)\.jpg$/)?.[1] || '0');
  //     return getNum(a) - getNum(b);
  //   })
  // );

  // Generate final items
  const items: Item[] = Object.entries(folderImages).map(([key, images], idx) => ({
    id: idx + 1,
    key: key,
    front_image: images[0],
    images: images,
    description: descriptions[key] ?? 'No description yet',
  }));

  return items;
}
