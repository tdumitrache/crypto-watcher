export const getWeightedMean = (
  elements: number[],
  weights: number[]
): number => {
  // Check that the lengths of the elements and weights lists are equal
  if (elements.length !== weights.length) {
    throw new Error('The number of elements and weights must be equal');
  }

  // Initialize variables to store the sum of the elements and the sum of the weights
  let elementSum = 0;
  let weightSum = 0;

  // Iterate over the elements and weights and calculate the sums
  for (let i = 0; i < elements.length; i++) {
    elementSum += elements[i] * weights[i];
    weightSum += weights[i];
  }

  // Calculate and return the weighted mean
  return elementSum / weightSum;
};
