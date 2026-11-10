/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
var minSumSquareDiff = function (nums1, nums2, k1, k2) {
  let n = nums1.length;
  let k = k1 + k2;
  let diffs = new Int32Array(n);
  let max = 0;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    diffs[i] = Math.abs(nums1[i] - nums2[i]);
    if (diffs[i] > max) max = diffs[i];
    sum += diffs[i];
  }

  if (k >= sum) return 0;

  const canAchieve = (mid) => {
    let ops = 0;
    for (let i = 0; i < n; i++) {
      if (diffs[i] > mid) ops += diffs[i] - mid;
    }
    return ops <= k;
  };

  const findTarget = (left, right) => {
    if (left >= right) return left;
    let mid = (left + right) >> 1;
    if (canAchieve(mid)) return findTarget(left, mid);
    return findTarget(mid + 1, right);
  };

  let target = findTarget(0, max);
  let ops = 0;

  for (let i = 0; i < n; i++) {
    if (diffs[i] > target) {
      ops += diffs[i] - target;
      diffs[i] = target;
    }
  }

  k -= ops;
  let res = 0;

  for (let i = 0; i < n; i++) {
    if (diffs[i] === target && k > 0) {
      diffs[i]--;
      k--;
    }
    res += diffs[i] * diffs[i];
  }

  return res;
};
