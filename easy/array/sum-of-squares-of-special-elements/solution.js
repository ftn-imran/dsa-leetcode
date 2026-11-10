/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfSquares = function (nums) {
  const n = nums.length;

  const solve = (i) => {
    if (i > n) return 0;

    const current = n % i === 0 ? nums[i - 1] ** 2 : 0;

    return current + solve(i + 1);
  };

  return solve(1);
};
