const BASE_URL = "https://api.rescuegroups.org/v5/public";
const API_KEY = "MXIPnXbb";

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
  const url = `${BASE_URL}/animals/search`;

  const body = {
    data: {
      filters: [
        {
          fieldName: "status.name",
          operation: "equals",
          criteria: "Available"
        },
        {
          fieldName: "species.singular",
          operation: "equals",
          criteria: "Dog"
        }
      ]
    },
    meta: {
      limit: 12,
      sort: "animals.name"
    }
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Authorization: API_KEY
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      console.warn("API error → using fallback. Status:", resp.status);
      return FALLBACK_DOGS;
    }

    const data = await resp.json();
    return data.data?.length ? data.data : FALLBACK_DOGS;
  } catch (e) {
    console.warn("Network failure → using fallback", e);
    return FALLBACK_DOGS;
  }
}
