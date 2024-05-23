import summaryApi from "../../common";

async function fetchHomeOneCategory(category) {
  const response = await fetch(summaryApi.homeCategoryProduct.url, {
    method: summaryApi.homeCategoryProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const dataResponse = await response.json();
  return dataResponse;
}

export default fetchHomeOneCategory;
