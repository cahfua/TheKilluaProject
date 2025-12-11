const BASE_URL = "https://api.rescuegroups.org/v5/public";
const API_KEY = "MXIPnXbb";

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
      console.warn("API error status:", resp.status);
      return [];
    }

    const data = await resp.json();
    return data.data || [];
  } catch (e) {
    console.warn("Network/API failure, returning [] so fallback is used", e);
    return [];
  }
}
