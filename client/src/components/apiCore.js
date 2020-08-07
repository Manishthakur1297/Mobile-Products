export const getProducts = (skip, limit, title) => {
  const data = {
    limit,
    skip,
    title,
  };
  return fetch(`/api/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
