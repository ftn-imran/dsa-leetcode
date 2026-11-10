/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function (nums) {
  const n = nums.length;
  const MOD = 1000000007;
  let maxVal = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] > maxVal) maxVal = nums[i];
  }

  const last = new Int32Array(maxVal + 1).fill(-1);
  const sum = new Float64Array(4 * n);
  const sqSum = new Float64Array(4 * n);
  const lazy = new Int32Array(4 * n);

  const apply = (node, len, v) => {
    sqSum[node] = (sqSum[node] + 2 * v * sum[node] + len * v * v) % MOD;
    sum[node] = (sum[node] + len * v) % MOD;
    lazy[node] += v;
  };

  const update = (node, start, end, l, r) => {
    if (l <= start && end <= r) {
      apply(node, end - start + 1, 1);
      return;
    }
    const mid = (start + end) >> 1;
    const left = node << 1;
    const right = left | 1;

    if (lazy[node] !== 0) {
      apply(left, mid - start + 1, lazy[node]);
      apply(right, end - mid, lazy[node]);
      lazy[node] = 0;
    }

    if (l <= mid) update(left, start, mid, l, r);
    if (r > mid) update(right, mid + 1, end, l, r);

    sum[node] = (sum[left] + sum[right]) % MOD;
    sqSum[node] = (sqSum[left] + sqSum[right]) % MOD;
  };

  let ans = 0;
  for (let r = 0; r < n; r++) {
    const v = nums[r];
    const prev = last[v];
    update(1, 0, n - 1, prev + 1, r);
    ans = (ans + sqSum[1]) % MOD;
    last[v] = r;
  }

  return ans;
};
