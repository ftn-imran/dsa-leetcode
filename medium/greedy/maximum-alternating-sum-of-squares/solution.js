/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
  nums.sort((a, b) => Math.abs(b) - Math.abs(a));
  const target = Math.ceil(nums.length / 2);

  const calculateScore = (index) => {
    if (index >= nums.length) return 0;

    const sq = nums[index] * nums[index];
    const currentContribution = index < target ? sq : -sq;

    return currentContribution + calculateScore(index + 1);
  };

  return calculateScore(0);
};
