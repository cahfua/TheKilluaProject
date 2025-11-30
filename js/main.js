import { fetchDogCards } from "./dogService.js";
import { renderDogList } from "./ui.js";

console.log("Main JS loaded.");

async function initAdoptPage() {
  const container = document.getElementById("dog-list");
  if (!container) return;

  container.innerHTML = "<p>Loading dogs...</p>";

  try {
    const dogs = await fetchDogCards();
    console.log("Dogs loaded:", dogs);

    if (!dogs || dogs.length === 0) {
      container.innerHTML = "<p>No dogs found.</p>";
      return;
    }

    renderDogList(container, dogs);

  } catch (err) {
    container.innerHTML = "<p>Error loading dogs.</p>";
    console.error(err);
  }
}

initAdoptPage();

