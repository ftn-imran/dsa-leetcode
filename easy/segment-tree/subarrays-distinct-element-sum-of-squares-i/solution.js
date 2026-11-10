/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function (nums) {
  const n = nums.length;
  const seen = new Int32Array(101);

  const expand = (i, j, distinct) => {
    if (j === n) return 0;
    if (seen[nums[j]] !== i + 1) {
      seen[nums[j]] = i + 1;
      distinct++;
    }
    return distinct * distinct + expand(i, j + 1, distinct);
  };

  const solveFrom = (i) => {
    if (i === n) return 0;
    return expand(i, i, 0) + solveFrom(i + 1);
  };

  return solveFrom(0);
};
