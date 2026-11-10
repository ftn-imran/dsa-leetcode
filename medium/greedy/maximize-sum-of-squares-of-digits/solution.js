/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
var maxSumOfSquares = function (num, sum) {
  if (sum > num * 9) return "";

  const result = new Array(num);

  const fillDigits = (idx, remSum) => {
    if (idx === num) return;

    const digit = remSum >= 9 ? 9 : remSum;
    result[idx] = digit;
    fillDigits(idx + 1, remSum - digit);
  };

  fillDigits(0, sum);
  return result.join("");
};
