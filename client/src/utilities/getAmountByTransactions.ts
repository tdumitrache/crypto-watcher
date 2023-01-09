export const getAmountByTransactions = (
  tokenPrices: number[],
  buyPrices: number[]
) => {
  if (tokenPrices.length !== buyPrices.length) {
    throw new Error('The number of elements and weights must be equal');
  }

  let amount = 0;

  for (let i = 0; i < tokenPrices.length; i++) {
    amount += buyPrices[i] / tokenPrices[i];
  }

  return Number(amount.toFixed(2));
};
