// Gets dog listings from PetFinder

import { getAccessToken } from "./api.js";

export async function getDogs() {
  const token = await getAccessToken();

  console.log("Token from service:", token);

  // TODO: fetch dogs
}
