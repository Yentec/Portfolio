/** Précharge une image et résout une fois prête (ou rejette en cas d'échec). */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Échec du chargement de l'asset : ${src}`));
    img.src = src;
  });
}

export type GameAssets = {
  tileset: HTMLImageElement;
};

/** Précharge tous les assets nécessaires avant de démarrer le moteur. */
export async function preloadAssets(): Promise<GameAssets> {
  const tileset = await loadImage("/rpg/tileset.png");
  return { tileset };
}
