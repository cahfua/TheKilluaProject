import { getDogs } from "./api.js";

/* ===============================
   FALLBACK SAMPLE DOGS
   =============================== */
const FALLBACK_DOGS = [
  {
    id: "1",
    name: "Lua",
    age: "Young",
    sex: "Female",
    city: "Apia",
    photo: ""
  },
  {
    id: "2",
    name: "Buddy",
    age: "Adult",
    sex: "Male",
    city: "Pago Pago",
    photo: ""
  },
  {
    id: "3",
    name: "Sunny",
    age: "Puppy",
    sex: "Female",
    city: "Savai’i",
    photo: ""
  }
];

/* ===============================
   FETCH DOG CARDS
   =============================== */
export async function fetchDogCards() {
  try {
    const dogs = await getDogs();

    if (!dogs || dogs.length === 0) {
      console.warn("API returned no dogs. Using fallback list.");
      return FALLBACK_DOGS;
    }

    return dogs.map((d) => ({
      id: d.id,
      name: d.attributes?.name || "Unnamed",
      age: d.attributes?.ageGroup || "Unknown age",
      sex: d.attributes?.sex || "Unknown",
      city: d.attributes?.city || "Unknown location",
      photo: d.attributes?.pictures?.[0]?.original?.url || ""
    }));
  } catch (err) {
    console.warn("API error. Using fallback dogs instead:", err.message);
    return FALLBACK_DOGS;
  }
}

