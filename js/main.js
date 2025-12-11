import { fetchDogCards } from "./dogService.js";
import { renderDogList } from "./ui.js";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "./favorites.js";
import { initQuiz } from "./quiz.js";

console.log("Main JS loaded.");

/* ===============================
   FAVORITES BUTTON HANDLERS
   =============================== */

function attachFavoriteHandlers(container, dogs) {
  const buttons = container.querySelectorAll(".favorite-btn");

  buttons.forEach((btn) => {
    const id = btn.dataset.id;
    const dog = dogs.find((d) => d.id === id);

    if (isFavorite(id)) {
      btn.textContent = "♥ Saved";
    }

    btn.addEventListener("click", () => {
      if (!dog) return;

      if (isFavorite(id)) {
        removeFavorite(id);
        btn.textContent = "♡ Save";
      } else {
        addFavorite(dog);
        btn.textContent = "♥ Saved";
      }
    });
  });
}

/* ===============================
   ADOPT PAGE
   =============================== */

async function initAdoptPage() {
  const container = document.getElementById("dog-list");
  if (!container) return;

  container.innerHTML = "<p>Loading dogs...</p>";

  try {
    const dogs = await fetchDogCards();
    console.log("Dogs loaded:", dogs);

    if (!dogs || !dogs.length) {
      container.innerHTML = "<p>No dogs found.</p>";
      return;
    }

    renderDogList(container, dogs);
    attachFavoriteHandlers(container, dogs);
  } catch (err) {
    console.error("Error loading dogs:", err);
    container.innerHTML = "<p>Error loading dogs.</p>";
  }
}

/* ===============================
   FAVORITES PAGE
   =============================== */

function initFavoritesPage() {
  const container = document.getElementById("favorites-list");
  if (!container) return;

  const favorites = getFavorites();
  if (!favorites.length) {
    container.innerHTML =
      "<p>You have not saved any favorite dogs yet.</p>";
    return;
  }

  renderDogList(container, favorites);
}

/* ===============================
   BOOTSTRAP
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  initAdoptPage();
  initFavoritesPage();
  initQuiz();
});
