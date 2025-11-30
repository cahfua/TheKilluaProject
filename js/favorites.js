// favorites.js
// LocalStorage favorites

const STORAGE_KEY = "killua-favorites";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addFavorite(dog) {
  const current = getFavorites();
  const exists = current.some((d) => d.id === dog.id);
  if (!exists) {
    current.push(dog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }
  console.log("Added favorite:", dog);
}

export function removeFavorite(id) {
  const current = getFavorites().filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
