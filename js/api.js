// api.js
const BASE_URL = "https://api.rescuegroups.org/v5/public";

// Temporary fallback data in case API fails or key not ready yet
const FALLBACK_DOGS = [
  {
    id: "1",
    attributes: {
      name: "Mochi",
      ageGroup: "Adult",
      sex: "Female",
      city: "Apia",
      pictures: [{ original: { url: "https://place-puppy.com/300x300" } }]
    }
  },
  {
    id: "2",
    attributes: {
      name: "Koa",
      ageGroup: "Young",
      sex: "Male",
      city: "Vaitele",
      pictures: [{ original: { url: "https://place-puppy.com/301x301" } }]
    }
  }
];

export async function getDogs() {
  try {
    const resp = await fetch(`${BASE_URL}/animals?type=Dog`);

    if (!resp.ok) {
      console.warn("API error → using fallback");
      return FALLBACK_DOGS;
    }

    const data = await resp.json();
    return data.data?.length ? data.data : FALLBACK_DOGS;

  } catch (e) {
    console.warn("Network failure → using fallback");
    return FALLBACK_DOGS;
  }
}
