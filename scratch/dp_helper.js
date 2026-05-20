function solve(n, k) {
    let dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));
    for (let j = 1; j <= n; j++) dp[1][j] = 1;
    for (let i = 1; i < k; i++) {
        for (let j = 1; j <= n; j++) {
            if (dp[i][j] === 0) continue;
            for (let mul = j; mul <= n; mul += j) {
                dp[i+1][mul] = (dp[i+1][mul] + dp[i][j]) % 10000;
            }
        }
    }
    let ans = 0;
    for (let j = 1; j <= n; j++) {
        ans = (ans + dp[k][j]) % 10000;
    }
    return ans;
}

const cases = [
    [3, 2], // Case 1: expected 5
    [1, 1], // Case 2
    [1, 5], // Case 3
    [2, 1], // Case 4
    [2, 2], // Case 5
    [2, 5], // Case 6: expected 6
    [2, 10], // Case 7: expected 11
    [3, 5], // Case 8
    [3, 10], // Case 9
    [5, 5], // Case 10
    [5, 10], // Case 11
    [10, 100] // Case 12
];

for (let [n, k] of cases) {
    console.log(`N=${n}, K=${k} => ${solve(n, k)}`);
}
