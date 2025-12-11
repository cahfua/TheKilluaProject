export function initQuiz() {
  const form = document.getElementById("dog-quiz-form");
  if (!form) return;

  const resultEl = document.getElementById("quiz-result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const size = form.elements["size"].value;
    const energy = form.elements["energy"].value;
    const coat = form.elements["coat"].value;

    if (!size || !energy || !coat) {
      if (resultEl) {
        resultEl.textContent = "Please answer all three questions to see your result.";
        resultEl.classList.add("quiz-error");
      }
      return;
    }

    let typeLabel = "";
    let advice = "";

    if (energy === "chill" && size !== "large") {
      typeLabel = "Laid-back Island Buddy";
      advice =
        "This dog will be happy with regular walks, shade, and calm family time. " +
        "They don’t need intense exercise but do need daily attention and gentle play.";
    } else if (energy === "high") {
      typeLabel = "High-Energy Explorer";
      advice =
        "This dog needs plenty of exercise and mental games. Plan on daily walks, play sessions, " +
        "and basic training to keep them from getting bored or destructive.";
    } else {
      typeLabel = "Balanced Family Dog";
      advice =
        "This dog does well with a steady routine: some playtime, some training, and plenty of rest. " +
        "They’re likely to fit well into most family homes.";
    }

    if (coat === "long") {
      advice +=
        " In Samoa’s climate, brush their coat often and check for fleas and ticks, especially around the ears and tail.";
    } else if (coat === "short") {
      advice +=
        " Even with a short coat, protect them from strong sun and keep up regular flea and tick checks.";
    } else {
      advice +=
        " Regular grooming and skin checks will help catch any skin problems early.";
    }

    let sizeNote = "";
    if (size === "small") {
      sizeNote =
        "Smaller dogs may need a safe indoor or shaded area during the hottest parts of the day, " +
        "and extra care around big groups of dogs.";
    } else if (size === "large") {
      sizeNote =
        "Larger dogs need more space, strong leashes or harnesses, and soft, shaded places to rest their joints.";
    }

    resultEl.innerHTML = `
      <h3>${typeLabel}</h3>
      <p>${advice}</p>
      ${sizeNote ? `<p>${sizeNote}</p>` : ""}
    `;
    resultEl.classList.remove("quiz-error");
  });
}
