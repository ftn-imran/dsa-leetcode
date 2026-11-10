/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSum = function (nums, k) {
  let counts = new Int32Array(30);

  const countBits = (left, right) => {
    if (left === right) {
      let x = nums[left];
      for (let p = 0; p < 30; p++) {
        if ((x & (1 << p)) !== 0) counts[p]++;
      }
      return;
    }

    let mid = (left + right) >> 1;
    countBits(left, mid);
    countBits(mid + 1, right);
  };

  if (nums.length > 0) {
    countBits(0, nums.length - 1);
  }

  let ans = 0n;

  for (let i = 0; i < k; i++) {
    let num = 0;
    for (let p = 0; p < 30; p++) {
      if (counts[p] > 0) {
        num += 1 << p;
        counts[p]--;
      }
    }
    let b = BigInt(num);
    ans = (ans + b * b) % 1000000007n;
  }

  return Number(ans);
};
