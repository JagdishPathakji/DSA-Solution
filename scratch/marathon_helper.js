function getWinner(inputVal) {
    const tokens = inputVal.trim().split(/\s+/).map(Number);
    if (tokens.length < 2) return "1";
    const n = tokens[0], t = tokens[1];
    let steps = Array.from({ length: n }, () => []);
    let step_dist = Array(n).fill(0);
    let tIdx = 2;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < t; j++) {
            steps[i].push(tokens[tIdx++]);
        }
        step_dist[i] = tokens[tIdx++];
    }
    
    let leaders = Array(n).fill(0);
    let total_dist = Array(n).fill(0);
    for (let sec = 0; sec < t; sec++) {
        for (let i = 0; i < n; i++) {
            total_dist[i] += steps[i][sec] * step_dist[i];
        }
        if ((sec + 1) % 2 === 0) {
            let maxDist = -1;
            for (let i = 0; i < n; i++) {
                if (total_dist[i] > maxDist) maxDist = total_dist[i];
            }
            for (let i = 0; i < n; i++) {
                if (total_dist[i] === maxDist) leaders[i]++;
            }
        }
    }
    
    let maxLead = -1, bestIdx = -1;
    for (let i = 0; i < n; i++) {
        if (leaders[i] > maxLead) {
            maxLead = leaders[i];
            bestIdx = i + 1;
        }
    }
    return bestIdx.toString();
}

const cases = [
    // Case 1
    "3\n4\n1 2 1 2 2\n2 1 2 1 3\n1 1 1 1 1",
    // Case 2
    "2\n2\n1 2 1\n2 1 1",
    // Case 3
    "2\n2\n1 1 1\n1 1 1",
    // Case 4
    "3\n2\n5 5 1\n1 1 1\n1 1 1",
    // Case 5
    "3\n4\n1 1 1 1 5\n2 2 2 2 2\n3 3 3 3 1",
    // Case 6
    "4\n4\n1 2 3 4 1\n4 3 2 1 1\n2 2 2 2 2\n3 3 3 3 1",
    // Case 7
    "3\n6\n1 2 1 2 1 2 2\n2 1 2 1 2 1 2\n1 1 1 1 1 1 1",
    // Case 8
    "5\n4\n1 2 1 2 1\n2 1 2 1 1\n3 1 1 1 1\n1 1 1 5 1\n2 2 2 2 1",
    // Case 9
    "3\n8\n1 1 1 1 1 1 1 1 2\n2 2 2 2 2 2 2 2 1\n3 3 3 3 3 3 3 3 1",
    // Case 10
    "6\n4\n1 1 1 1 1\n2 2 2 2 1\n3 3 3 3 1\n4 4 4 4 1\n5 5 5 5 1\n6 6 6 6 1",
    // Case 11
    "4\n10\n1 2 1 2 1 2 1 2 1 2 2\n2 1 2 1 2 1 2 1 2 1 2\n1 1 1 1 1 1 1 1 1 1 1\n3 3 1 1 1 1 1 1 1 1 1",
    // Case 12
    "8\n6\n1 2 1 2 1 2 2\n2 1 2 1 2 1 2\n3 1 1 1 1 1 1\n1 1 1 1 1 1 1\n2 2 2 2 2 2 1\n3 3 1 1 1 1 1\n1 2 3 4 5 6 1\n2 2 2 2 2 2 2"
];

cases.forEach((c, idx) => {
    console.log(`Case ${idx + 1} winner: ${getWinner(c)}`);
});
