import { getDogs } from "./api.js";

const FALLBACK_DOGS = [
  {
    id: "1",
    name: "Mochi",
    age: "Adult",
    sex: "Female",
    city: "Apia",
    photo: "images/8.jpg"
  },
  {
    id: "2",
    name: "Koa",
    age: "Young",
    sex: "Male",
    city: "Vaitele",
    photo: "images/7.jpg"
  }
];

export async function fetchDogCards() {
  try {
    const dogs = await getDogs();

    if (!dogs || !dogs.length) {
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