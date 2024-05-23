function displayEgyCurrency(price) {
  const formatter = new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2,
  });
  return formatter.format(price);
}

export default displayEgyCurrency;
