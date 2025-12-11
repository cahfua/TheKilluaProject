export function renderDogCard(dog) {
  const card = document.createElement("article");
  card.className = "dog-card";
  card.dataset.id = dog.id;

  card.innerHTML = `
    <div class="dog-photo-placeholder">
      ${
        dog.photo
          ? `<img src="${dog.photo}" alt="${dog.name}">`
          : ""
      }
    </div>
    <div class="dog-name">${dog.name}</div>
    <p>${dog.age} • ${dog.sex}</p>
    <p>${dog.city}</p>
    <button class="btn btn-outline favorite-btn" data-id="${dog.id}">
      ♡ Save
    </button>
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
