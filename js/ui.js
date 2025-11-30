// DOM element for a single dog card
export function renderDogCard(dog) {
  const card = document.createElement("article");
  card.className = "dog-card";

  card.innerHTML = `
    <div class="dog-photo-placeholder">
      ${
        dog.photo
          ? `<img src="${dog.photo}" alt="${dog.name}"
                 style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`
          : ""
      }
    </div>
    <div class="dog-name">${dog.name}</div>
    <p>${dog.age} • ${dog.sex}</p>
    <p>${dog.city}</p>
  `;

  return card;
}

export function renderDogList(container, dogs) {
  container.innerHTML = "";
  dogs.forEach((dog) => {
    const card = renderDogCard(dog);
    container.appendChild(card);
  });
}
