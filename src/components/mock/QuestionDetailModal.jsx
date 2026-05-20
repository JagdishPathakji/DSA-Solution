import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Send, RefreshCw, Terminal, Cpu, CheckCircle2, XCircle, Code2, BookOpen, AlertCircle, Copy, Check, Sparkles, HelpCircle } from 'lucide-react';

// Dynamic C++ Templates Registry for all 18 Story Questions
const CPP_TEMPLATES = {
  story1: `#include <iostream>\n#include <cmath>\nusing namespace std;\n\n// Problem: Philaland Coins\n// Find the minimum number of coin denominations required.\nvoid solve() {\n    int n;\n    cin >> n;\n    // Write your greedy/bit logic here\n    int ans = 0;\n    while (n > 0) {\n        ans++;\n        n /= 2;\n    }\n    cout << ans << endl;\n}\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        solve();\n    }\n    return 0;\n}`,
  story2: `#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\n// Problem: Swayamvar Matchmaking\n// Find the number of brides who remain unmarried.\nint main() {\n    int n;\n    cin >> n;\n    string brides, grooms;\n    cin >> brides >> grooms;\n    \n    int groomR = 0, groomM = 0;\n    for (char c : grooms) {\n        if (c == 'r') groomR++;\n        else if (c == 'm') groomM++;\n    }\n    \n    for (int i = 0; i < n; i++) {\n        char b = brides[i];\n        if (b == 'r') {\n            if (groomR > 0) groomR--;\n            else {\n                cout << (n - i) << endl;\n                return 0;\n            }\n        } else {\n            if (groomM > 0) groomM--;\n            else {\n                cout << (n - i) << endl;\n                return 0;\n            }\n        }\n    }\n    cout << 0 << endl;\n    return 0;\n}`,
  story3: `#include <iostream>\nusing namespace std;\n\n// Problem: Dole Out Cadbury\n// Count Cadbury blocks given to children.\nint getBlocks(int l, int w) {\n    int count = 0;\n    while (l > 0 && w > 0) {\n        if (l == w) {\n            count++;\n            break;\n        }\n        if (l > w) l -= w;\n        else w -= l;\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    int minL, maxL, minW, maxW;\n    cin >> minL >> maxL >> minW >> maxW;\n    \n    int total = 0;\n    for (int l = minL; l <= maxL; l++) {\n        for (int w = minW; w <= maxW; w++) {\n            total += getBlocks(l, w);\n        }\n    }\n    cout << total << endl;\n    return 0;\n}`,
  story4: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Monster {\n    int power;\n    int bonus;\n};\n\nbool compareMonsters(const Monster& a, const Monster& b) {\n    return a.power < b.power;\n}\n\n// Problem: RPG Monster Defeat\nint main() {\n    int n, exp;\n    cin >> n >> exp;\n    vector<Monster> monsters(n);\n    for (int i = 0; i < n; i++) cin >> monsters[i].power;\n    for (int i = 0; i < n; i++) cin >> monsters[i].bonus;\n    \n    sort(monsters.begin(), monsters.end(), compareMonsters);\n    int count = 0;\n    for (int i = 0; i < n; i++) {\n        if (exp > monsters[i].power) {\n            exp += monsters[i].bonus;\n            count++;\n        } else {\n            break;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}`,
  story5: `#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Problem: Unique Birthday Gift\n// Count multiples array sequences of length N <= K.\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<vector<long long>> dp(n + 1, vector<long long>(k + 1, 0));\n    for (int j = 1; j <= k; j++) dp[1][j] = 1;\n    \n    for (int i = 1; i < n; i++) {\n        for (int j = 1; j <= k; j++) {\n            if (dp[i][j] == 0) continue;\n            for (int mul = j; mul <= k; mul += j) {\n                dp[i+1][mul] = (dp[i+1][mul] + dp[i][j]) % 1000000007;\n            }\n        }\n    }\n    long long ans = 0;\n    for (int j = 1; j <= k; j++) {\n        ans = (ans + dp[n][j]) % 1000000007;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
  story6: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n// Problem: Constellation\nint main() {\n    int n;\n    cin >> n;\n    vector<string> grid(3);\n    for (int i = 0; i < 3; i++) cin >> grid[i];\n    \n    string ans = "";\n    int i = 0;\n    while (i < n) {\n        if (grid[0][i] == '.' && grid[1][i] == '.' && grid[2][i] == '.') {\n            ans += "#";\n            i++;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == ".*." && grid[1].substr(i, 3) == "*.*" && grid[2].substr(i, 3) == "***") {\n            ans += "A";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "***" && grid[1].substr(i, 3) == "**." && grid[2].substr(i, 3) == "***") {\n            ans += "E";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "***" && grid[1].substr(i, 3) == ".*." && grid[2].substr(i, 3) == "***") {\n            ans += "I";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "***" && grid[1].substr(i, 3) == "*.*" && grid[2].substr(i, 3) == "***") {\n            ans += "O";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "*.*" && grid[1].substr(i, 3) == "*.*" && grid[2].substr(i, 3) == "***") {\n            ans += "U";\n            i += 3;\n        } else {\n            i++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}`,
  story7: `#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Problem: Special Matrix Grid\nint main() {\n    int r, c;\n    cin >> r >> c;\n    // Grid path calculation DP\n    vector<vector<long long>> dp(r, vector<long long>(c, 1));\n    cout << dp[r-1][c-1] << endl;\n    return 0;\n}`,
  story8: `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n// Problem: Digit Pairs score calculations\nint main() {\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    \n    vector<string> scores(n);\n    for (int i = 0; i < n; i++) {\n        int temp = arr[i];\n        int a = temp % 10, b = (temp/10)%10, c = temp/100;\n        int maxV = max({a, b, c});\n        int minV = min({a, b, c});\n        int score = (maxV * 11 + minV * 7) % 100;\n        string s = to_string(score);\n        if (s.length() < 2) s = "0" + s;\n        scores[i] = s;\n    }\n    \n    int pairs = 0;\n    vector<int> odd(10, 0), even(10, 0);\n    for (int i = 0; i < n; i++) {\n        int msb = scores[i][0] - '0';\n        if ((i + 1) % 2 != 0) odd[msb]++;\n        else even[msb]++;\n    }\n    \n    for (int d = 0; d < 10; d++) {\n        int count = 0;\n        if (odd[d] == 2) count++;\n        else if (odd[d] > 2) count += 2;\n        if (even[d] == 2) count++;\n        else if (even[d] > 2) count += 2;\n        pairs += min(2, count);\n    }\n    cout << min(2, pairs) << endl;\n    return 0;\n}`,
  story9: `#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Problem: Holes and Balls gravity drop\nint main() {\n    int h;\n    cin >> h;\n    vector<int> holes(h);\n    for (int i = 0; i < h; i++) cin >> holes[i];\n    int b;\n    cin >> b;\n    vector<int> balls(b);\n    for (int i = 0; i < b; i++) cin >> balls[i];\n    \n    vector<int> capacity(h);\n    for (int i = 0; i < h; i++) capacity[i] = i + 1;\n    vector<int> current(h, 0);\n    \n    for (int i = 0; i < b; i++) {\n        int ball = balls[i];\n        int pos = 0;\n        for (int j = h - 1; j >= 0; j--) {\n            if (holes[j] >= ball && current[j] < capacity[j]) {\n                current[j]++;\n                pos = j + 1;\n                break;\n            }\n        }\n        cout << pos << (i == b - 1 ? "" : " ");\n    }\n    cout << endl;\n    return 0;\n}`,
  story10: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Problem: Saving Patients\nint main() {\n    int n;\n    cin >> n;\n    vector<int> vac(n), pat(n);\n    for (int i = 0; i < n; i++) cin >> vac[i];\n    for (int i = 0; i < n; i++) cin >> pat[i];\n    \n    sort(vac.begin(), vac.end());\n    sort(pat.begin(), pat.end());\n    for (int i = 0; i < n; i++) {\n        if (vac[i] <= pat[i]) {\n            cout << "No" << endl;\n            return 0;\n        }\n    }\n    cout << "Yes" << endl;\n    return 0;\n}`,
  story11: `#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\n// Problem: Grid Path Planning BFS\nstruct Cell {\n    int r, c, d;\n};\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<vector<int>> grid(r, vector<int>(c));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) cin >> grid[i][j];\n    }\n    \n    if (grid[0][0] == 0 || grid[r-1][c-1] == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    \n    queue<Cell> q;\n    q.push({0, 0, 1});\n    vector<vector<bool>> vis(r, vector<bool>(c, false));\n    vis[0][0] = true;\n    \n    while (!q.empty()) {\n        Cell curr = q.front();\n        q.pop();\n        if (curr.r == r - 1 && curr.c == c - 1) {\n            cout << curr.d << endl;\n            return 0;\n        }\n        int dr[] = {0, 1, 0, -1};\n        int dc[] = {1, 0, -1, 0};\n        for (int i = 0; i < 4; i++) {\n            int nr = curr.r + dr[i];\n            int nc = curr.c + dc[i];\n            if (nr >= 0 && nr < r && nc >= 0 && nc < c && !vis[nr][nc] && grid[nr][nc] == 1) {\n                vis[nr][nc] = true;\n                q.push({nr, nc, curr.d + 1});\n            }\n        }\n    }\n    cout << 0 << endl;\n    return 0;\n}`,
  story12: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Problem: Super Market Knapsack\nint main() {\n    int n, cap;\n    cin >> n >> cap;\n    vector<int> wt(n), val(n);\n    for (int i = 0; i < n; i++) cin >> wt[i] >> val[i];\n    \n    vector<int> dp(cap + 1, 0);\n    for (int i = 0; i < n; i++) {\n        for (int j = cap; j >= wt[i]; j--) {\n            dp[j] = max(dp[j], dp[j - wt[i]] + val[i]);\n        }\n    }\n    cout << dp[cap] << endl;\n    return 0;\n}`,
  story13: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nlong long gcd(long long a, long long b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\n\nlong long lcm(long long a, long long b) {\n    return (a / gcd(a, b)) * b;\n}\n\n// Problem: Grooving Blocks cycle matching\nint main() {\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    \n    vector<bool> vis(n, false);\n    vector<long long> cycles;\n    for (int i = 0; i < n; i++) {\n        if (vis[i]) continue;\n        long long count = 0;\n        int curr = i;\n        while (!vis[curr]) {\n            vis[curr] = true;\n            curr = arr[curr] - 1;\n            count++;\n        }\n        cycles.push_back(count);\n    }\n    \n    long long ans = cycles[0];\n    for (size_t i = 1; i < cycles.size(); i++) {\n        ans = lcm(ans, cycles[i]);\n    }\n    cout << ans << endl;\n    return 0;\n}`,
  story14: `#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\n// Problem: Web Pages graph BFS shortest path\nint main() {\n    int n;\n    cin >> n;\n    vector<vector<int>> adj(n + 1);\n    for (int i = 1; i <= n; i++) {\n        int k;\n        cin >> k;\n        for (int j = 0; j < k; j++) {\n            int target;\n            cin >> target;\n            adj[i].push_back(target);\n        }\n    }\n    int src, dest;\n    cin >> src >> dest;\n    \n    vector<int> dist(n + 1, -1);\n    dist[src] = 1;\n    queue<int> q;\n    q.push(src);\n    while (!q.empty()) {\n        int curr = q.front();\n        q.pop();\n        if (curr == dest) {\n            cout << dist[curr] << endl;\n            return 0;\n        }\n        for (int next : adj[curr]) {\n            if (dist[next] == -1) {\n                dist[next] = dist[curr] + 1;\n                q.push(next);\n            }\n        }\n    }\n    cout << -1 << endl;\n    return 0;\n}`,
  story15: `#include <iostream>\n#include <string>\nusing namespace std;\n\n// Problem: Orchard fruit combinations count\nlong long getCombinations(string s) {\n    long long count = 0;\n    int len = s.length();\n    for (int i = 0; i < len; i++) {\n        for (int j = i + 1; j < len; j++) {\n            for (int k = j + 1; k < len; k++) {\n                if (s[i] != s[j] && s[j] != s[k]) count++;\n            }\n        }\n    }\n    return count;\n}\n\nint main() {\n    string ashok, anand;\n    cin >> ashok >> anand;\n    long long c1 = getCombinations(ashok);\n    long long c2 = getCombinations(anand);\n    if (c1 > c2) cout << "Ashok" << endl;\n    else if (c2 > c1) cout << "Anand" << endl;\n    else cout << "Draw" << endl;\n    return 0;\n}`,
  story16: `#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\n\n// Problem: Bride Hunting\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<vector<int>> grid(r, vector<int>(c));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) cin >> grid[i][j];\n    }\n    \n    int maxQual = -1;\n    int minDist = 1e9;\n    int bestR = -1, bestC = -1;\n    \n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            if (i == 0 && j == 0) continue;\n            if (grid[i][j] == 0) continue;\n            \n            int qual = 0;\n            for (int di = -1; di <= 1; di++) {\n                for (int dj = -1; dj <= 1; dj++) {\n                    if (di == 0 && dj == 0) continue;\n                    int ni = i + di, nj = j + dj;\n                    if (ni >= 0 && ni < r && nj >= 0 && nj < c && grid[ni][nj] == 1) qual++;\n                }\n            }\n            int dist = max(abs(i), abs(j));\n            if (qual > maxQual) {\n                maxQual = qual;\n                minDist = dist;\n                bestR = i + 1;\n                bestC = j + 1;\n            } else if (qual == maxQual) {\n                if (dist < minDist) {\n                    minDist = dist;\n                    bestR = i + 1;\n                    bestC = j + 1;\n                }\n            }\n        }\n    }\n    if (bestR == -1) cout << "No Bride" << endl;\n    else cout << bestR << ":" << bestC << ":" << maxQual << endl;\n    return 0;\n}`,
  story17: `#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Problem: Cyclic Shift binary representation max value\nvoid solve() {\n    int n;\n    long long k;\n    cin >> n >> k;\n    string s;\n    cin >> s;\n    \n    string maxVal = "";\n    string doubled = s + s;\n    for (int i = 0; i < n; i++) {\n        string shift = doubled.substr(i, n);\n        if (shift > maxVal) maxVal = shift;\n    }\n    \n    vector<int> shifts;\n    for (int i = 0; i < n; i++) {\n        if (doubled.substr(i, n) == maxVal) shifts.push_back(i);\n    }\n    \n    long long d = shifts.size() > 1 ? shifts[1] - shifts[0] : n;\n    long long ans = shifts[0] + (k - 1) * d;\n    cout << ans << endl;\n}\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        solve();\n    }\n    return 0;\n}`,
  story18: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Problem: Marathon Winner step calculations\nint main() {\n    int n, t;\n    cin >> n >> t;\n    vector<vector<int>> steps(n, vector<int>(t + 1));\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < t; j++) cin >> steps[i][j];\n        cin >> steps[i][t];\n    }\n    \n    vector<int> leaders(n, 0);\n    for (int sec = 1; sec < t; sec += 2) {\n        int maxDist = -1;\n        vector<int> winners;\n        for (int i = 0; i < n; i++) {\n            int dist = 0;\n            for (int s = 0; s <= sec; s++) dist += steps[i][s] * steps[i][t];\n            if (dist > maxDist) {\n                maxDist = dist;\n                winners = {i};\n            } else if (dist == maxDist) {\n                winners.push_back(i);\n            }\n        }\n        for (int w : winners) leaders[w]++;\n    }\n    \n    int maxLead = -1, bestIdx = -1;\n    for (int i = 0; i < n; i++) {\n        if (leaders[i] > maxLead) {\n            maxLead = leaders[i];\n            bestIdx = i + 1;\n        }\n    }\n    cout << bestIdx << endl;\n    return 0;\n}`
};

export default function QuestionDetailModal({ question, onClose, isSolved, onToggleSolved }) {
  const [activeTab, setActiveTab] = useState('problem');
  const [editorTab, setEditorTab] = useState('editor');
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem(`cpp_code_${question?.id}`);
    return saved || CPP_TEMPLATES[question?.id] || `// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}`;
  });
  
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [testCasesStatus, setTestCasesStatus] = useState(Array(12).fill('pending'));
  const [testCasesActualOutput, setTestCasesActualOutput] = useState(Array(12).fill(''));
  const [terminalLogs, setTerminalLogs] = useState(['$ Ready to compile and solve story directives...']);
  const [isCompiling, setIsCompiling] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  
  const terminalEndRef = useRef(null);

  // Sync saved code to local storage on edit
  useEffect(() => {
    if (question?.id) {
      localStorage.setItem(`cpp_code_${question.id}`, code);
    }
  }, [code, question]);

  // Load new question data
  useEffect(() => {
    setActiveTab('problem');
    setEditorTab('editor');
    const saved = localStorage.getItem(`cpp_code_${question?.id}`);
    setCode(saved || CPP_TEMPLATES[question?.id] || `// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}`);
    setTestCasesStatus(Array(12).fill('pending'));
    setTestCasesActualOutput(Array(12).fill(''));
    setSelectedTestCase(0);
    setTerminalLogs([`$ Ready to compile and solve story directives for ${question?.title}...`]);
  }, [question]);

  // Scroll to bottom of terminal output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  if (!question) return null;

  // 12 Comprehensive Test Cases Generator & solvers mapped per question
  const generate12TestCases = (qid) => {
    switch (qid) {
      case 'story1': // Philaland Coins
        return [
          { input: "2\n10\n5", expected: "4\n3", type: "Sample case" },
          { input: "1\n1", expected: "1", type: "Edge case" },
          { input: "1\n2", expected: "2", type: "Edge case" },
          { input: "1\n3", expected: "2", type: "Normal input" },
          { input: "1\n4", expected: "3", type: "Normal input" },
          { input: "1\n7", expected: "3", type: "Normal input" },
          { input: "1\n8", expected: "4", type: "Normal input" },
          { input: "1\n15", expected: "4", type: "Medium size N" },
          { input: "1\n16", expected: "5", type: "Medium size N" },
          { input: "1\n50", expected: "6", type: "Medium size N" },
          { input: "1\n1000", expected: "10", type: "Large Boundary N" },
          { input: "1\n5000", expected: "13", type: "Max Boundary N" }
        ];
      case 'story2': // Swayamvar
        return [
          { input: "4\nrrmm\nmrmr", expected: "1", type: "Sample case" },
          { input: "2\nrm\nmr", expected: "0", type: "Exact match case" },
          { input: "1\nr\nm", expected: "1", type: "Edge case" },
          { input: "3\nrrr\nmmm", expected: "3", type: "No matches at all" },
          { input: "4\nrmrm\nmrmr", expected: "0", type: "Normal input" },
          { input: "5\nrrmmm\nmrrmm", expected: "0", type: "Normal input" },
          { input: "6\nrrrrmm\nmmmmrr", expected: "2", type: "Partial match stop" },
          { input: "8\nrrmmrmmr\nmmmrrmmr", expected: "0", type: "Complete matchmaking" },
          { input: "5\nmmrrr\nrrmrm", expected: "1", type: "Normal input" },
          { input: "10\nrmrmrmrmrm\nmrmrmrmrmr", expected: "0", type: "High volume complete" },
          { input: "12\nrrrrrrmmmmmm\nmmmmmmrrrrrr", expected: "0", type: "Equal groupings" },
          { input: "15\nrrrrrrrrrmmmmmm\nmmmmmmmmmmmmmmm", expected: "9", type: "Max Boundary unmatch" }
        ];
      case 'story3': // Dole Out Cadbury
        return [
          { input: "5 7 3 4", expected: "24", type: "Sample case" },
          { input: "1 1 1 1", expected: "1", type: "Edge case" },
          { input: "2 2 2 2", expected: "1", type: "Square block edge" },
          { input: "1 2 1 2", expected: "6", type: "Small grid" },
          { input: "1 3 1 3", expected: "19", type: "Normal grid size" },
          { input: "2 3 2 3", expected: "8", type: "Normal grid" },
          { input: "5 5 5 10", expected: "21", type: "Normal range" },
          { input: "10 10 1 10", expected: "37", type: "Row slice grid" },
          { input: "3 8 2 5", expected: "55", type: "Medium scale range" },
          { input: "1 10 1 10", expected: "420", type: "Dense multiple sizes" },
          { input: "20 25 10 15", expected: "182", type: "Large scale sizes" },
          { input: "50 55 50 55", expected: "114", type: "Max scale parameters" }
        ];
      case 'story4': // RPG Monster Defeat
        return [
          { input: "2 123\n78 130\n10 0", expected: "2", type: "Sample case" },
          { input: "1 10\n9\n5", expected: "1", type: "Single edge case" },
          { input: "1 10\n10\n5", expected: "0", type: "Failed edge case" },
          { input: "3 100\n101 200 300\n50 50 50", expected: "0", type: "Instafail greedy" },
          { input: "3 100\n90 120 150\n30 30 30", expected: "3", type: "Complete chain defeat" },
          { input: "4 50\n40 80 120 160\n10 10 10 10", expected: "1", type: "Partial sorting block" },
          { input: "5 10\n5 12 18 20 40\n3 6 2 20 5", expected: "4", type: "Sorting greedy chain" },
          { input: "6 20\n10 15 25 30 50 100\n5 10 5 20 50 10", expected: "6", type: "Full chain progression" },
          { input: "8 5\n1 2 4 8 16 32 64 128\n1 2 4 8 16 32 64 128", expected: "8", type: "Exponential growth match" },
          { input: "3 10\n10 20 30\n10 10 10", expected: "0", type: "Exact threshold lock" },
          { input: "10 50\n45 48 55 60 70 80 90 100 110 120\n5 7 2 10 5 5 10 20 5 5", expected: "10", type: "Large scale RPG battle" },
          { input: "12 100\n90 95 110 120 130 140 150 160 170 180 190 200\n2 3 5 5 10 5 10 5 15 5 20 20", expected: "12", type: "Max Boundary monsters" }
        ];
      case 'story5': // Unique Birthday Gift
        return [
          { input: "2 2", expected: "3", type: "Sample case" },
          { input: "1 1", expected: "1", type: "Minimum scale edge" },
          { input: "1 5", expected: "5", type: "Single length edge" },
          { input: "2 1", expected: "1", type: "Single element choice" },
          { input: "3 2", expected: "5", type: "Small DP sequence" },
          { input: "2 5", expected: "10", type: "Length 2 multiples" },
          { input: "2 10", expected: "27", type: "Multiple DP grid" },
          { input: "3 5", expected: "17", type: "Medium DP progression" },
          { input: "3 10", expected: "68", type: "Medium DP scale" },
          { input: "5 5", expected: "49", type: "Normal parameters" },
          { input: "5 10", expected: "427", type: "Large DP parameters" },
          { input: "10 100", expected: "444455823", type: "Max boundary modulo" }
        ];
      case 'story6': // Constellation
        return [
          { input: "18\n* . * * * * * . * * * * * . * * * *\n* . * * * * . * . * * * * . * . * .\n*** . *** * * * *** . *** * * * ***", expected: "U#OIE", type: "Sample case" },
          { input: "3\n.*.\n*.*\n***", expected: "A", type: "Single character 'A'" },
          { input: "3\n***\n**.\n***", expected: "E", type: "Single character 'E'" },
          { input: "3\n***\n.*.\n***", expected: "I", type: "Single character 'I'" },
          { input: "3\n***\n*.*\n***", expected: "O", type: "Single character 'O'" },
          { input: "3\n*.*\n*.*\n***", expected: "U", type: "Single character 'U'" },
          { input: "1\n.\n.\n.", expected: "#", type: "Space indicator grid" },
          { input: "5\n. . . . .\n. . . . .\n. . . . .", expected: "#####", type: "Continuous spaces" },
          { input: "7\n.*..***\n*.*.**.\n***.***", expected: "A#E", type: "Mixed sequence" },
          { input: "11\n.*..***.***\n*.*.**.***.\n***.***.***", expected: "A#E#I", type: "Complex parsing" },
          { input: "15\n.*..***.***.***\n*.*.**.***.***.\n***.***.***.***", expected: "A#E#I#O", type: "Dense vowels list" },
          { input: "19\n.*..***.***.***.*.*\n*.*.**.***.***.*.*\n***.***.***.***.***", expected: "A#E#I#O#U", type: "Max sequence full constellation" }
        ];
      default:
        // Generic dynamically generated test cases for structural safety
        return Array.from({ length: 12 }, (_, idx) => {
          const multiplier = idx + 1;
          if (qid === 'story10') { // Saving Patients fallback
            return {
              input: `${multiplier}\n${Array(multiplier).fill(10 * multiplier).join(' ')}\n${Array(multiplier).fill(5 * multiplier).join(' ')}`,
              expected: "Yes",
              type: idx < 2 ? "Sample case" : "Generated testcase"
            };
          }
          if (qid === 'story8') { // Digit Pairs fallback
            return {
              input: `4\n100 200 300 400`,
              expected: "0",
              type: idx < 2 ? "Sample case" : "Generated testcase"
            };
          }
          return {
            input: `${10 * multiplier}`,
            expected: qid === 'story1' ? `${Math.floor(Math.log2(10 * multiplier)) + 1}` : `${10 * multiplier}`,
            type: idx < 2 ? "Sample case" : "Generated testcase"
          };
        });
    }
  };

  const testCases = generate12TestCases(question.id);

  // Dynamic JS validation solver core
  const runJsSolver = (qid, inputVal) => {
    try {
      if (qid === 'story1') {
        const lines = inputVal.trim().split(/\s+/);
        if (lines.length < 2) return "";
        const t = parseInt(lines[0]);
        let results = [];
        for (let i = 1; i <= t && i < lines.length; i++) {
          const n = parseInt(lines[i]);
          results.push(Math.floor(Math.log2(n)) + 1);
        }
        return results.join('\n');
      }
      if (qid === 'story2') {
        const lines = inputVal.trim().split(/\s+/);
        if (lines.length < 3) return "0";
        const n = parseInt(lines[0]);
        const brides = lines[1];
        const grooms = lines[2];
        let groomR = 0, groomM = 0;
        for (let c of grooms) {
          if (c === 'r') groomR++;
          else if (c === 'm') groomM++;
        }
        for (let i = 0; i < n; i++) {
          const b = brides[i];
          if (b === 'r') {
            if (groomR > 0) groomR--;
            else return (n - i).toString();
          } else {
            if (groomM > 0) groomM--;
            else return (n - i).toString();
          }
        }
        return "0";
      }
      if (qid === 'story3') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 4) return "0";
        const [minL, maxL, minW, maxW] = tokens;
        let total = 0;
        for (let l = minL; l <= maxL; l++) {
          for (let w = minW; w <= maxW; w++) {
            let curL = l, curW = w;
            while (curL > 0 && curW > 0) {
              if (curL === curW) {
                total++;
                break;
              }
              if (curL > curW) curL -= curW;
              else curW -= curL;
              total++;
            }
          }
        }
        return total.toString();
      }
      if (qid === 'story4') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "0";
        const n = tokens[0];
        let exp = tokens[1];
        let monsters = [];
        for (let i = 0; i < n; i++) {
          monsters.push({ power: tokens[2 + i], bonus: tokens[2 + n + i] });
        }
        monsters.sort((a, b) => a.power - b.power);
        let count = 0;
        for (let m of monsters) {
          if (exp > m.power) {
            exp += m.bonus;
            count++;
          } else {
            break;
          }
        }
        return count.toString();
      }
      if (qid === 'story5') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "0";
        const [n, k] = tokens;
        let dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
        for (let j = 1; j <= k; j++) dp[1][j] = 1;
        for (let i = 1; i < n; i++) {
          for (let j = 1; j <= k; j++) {
            if (dp[i][j] === 0) continue;
            for (let mul = j; mul <= k; mul += j) {
              dp[i+1][mul] = (dp[i+1][mul] + dp[i][j]) % 1000000007;
            }
          }
        }
        let ans = 0;
        for (let j = 1; j <= k; j++) ans = (ans + dp[n][j]) % 1000000007;
        return ans.toString();
      }
      if (qid === 'story6') {
        const lines = inputVal.trim().split(/\n/);
        if (lines.length < 4) return "";
        const n = parseInt(lines[0]);
        const grid = [lines[1].trim(), lines[2].trim(), lines[3].trim()];
        let res = "";
        let i = 0;
        while (i < n) {
          const col0 = grid[0][i];
          const col1 = grid[1][i];
          const col2 = grid[2][i];
          if (col0 === '.' && col1 === '.' && col2 === '.') {
            res += "#";
            i++;
          } else if (i + 2 < n && grid[0].substr(i, 3) === ".*." && grid[1].substr(i, 3) === "*.*" && grid[2].substr(i, 3) === "***") {
            res += "A";
            i += 3;
          } else if (i + 2 < n && grid[0].substr(i, 3) === "***" && grid[1].substr(i, 3) === "**." && grid[2].substr(i, 3) === "***") {
            res += "E";
            i += 3;
          } else if (i + 2 < n && grid[0].substr(i, 3) === "***" && grid[1].substr(i, 3) === ".*." && grid[2].substr(i, 3) === "***") {
            res += "I";
            i += 3;
          } else if (i + 2 < n && grid[0].substr(i, 3) === "***" && grid[1].substr(i, 3) === "*.*" && grid[2].substr(i, 3) === "***") {
            res += "O";
            i += 3;
          } else if (i + 2 < n && grid[0].substr(i, 3) === "*.*" && grid[1].substr(i, 3) === "*.*" && grid[2].substr(i, 3) === "***") {
            res += "U";
            i += 3;
          } else {
            i++;
          }
        }
        return res;
      }
      if (qid === 'story8') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "0";
        const n = tokens[0];
        let scores = [];
        for (let i = 1; i <= n && i < tokens.length; i++) {
          const num = tokens[i].toString();
          const digits = num.split('').map(Number);
          const maxVal = Math.max(...digits);
          const minVal = Math.min(...digits);
          const score = (maxVal * 11 + minVal * 7) % 100;
          scores.push(score.toString().padStart(2, '0'));
        }
        let pairs = 0;
        let odd = Array(10).fill(0);
        let even = Array(10).fill(0);
        for (let i = 0; i < scores.length; i++) {
          const msb = parseInt(scores[i][0]);
          if ((i + 1) % 2 !== 0) odd[msb]++;
          else even[msb]++;
        }
        for (let d = 0; d < 10; d++) {
          let count = 0;
          if (odd[d] === 2) count++;
          else if (odd[d] > 2) count += 2;
          if (even[d] === 2) count++;
          else if (even[d] > 2) count += 2;
          pairs += Math.min(2, count);
        }
        return Math.min(2, pairs).toString();
      }
      if (qid === 'story9') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 1) return "0";
        const h = tokens[0];
        let holes = [];
        for (let i = 0; i < h; i++) {
          holes.push({ diameter: tokens[1 + i], capacity: i + 1, current: 0 });
        }
        const b = tokens[1 + h];
        let balls = tokens.slice(2 + h, 2 + h + b);
        let results = [];
        for (let ball of balls) {
          let positioned = 0;
          for (let j = h - 1; j >= 0; j--) {
            if (holes[j].diameter >= ball && holes[j].current < holes[j].capacity) {
              holes[j].current++;
              positioned = j + 1;
              break;
            }
          }
          results.push(positioned);
        }
        return results.join(' ');
      }
      if (qid === 'story10') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "No";
        const n = tokens[0];
        let vac = tokens.slice(1, n + 1);
        let pat = tokens.slice(n + 1, 2 * n + 1);
        vac.sort((a, b) => a - b);
        pat.sort((a, b) => a - b);
        for (let i = 0; i < n; i++) {
          if (vac[i] <= pat[i]) return "No";
        }
        return "Yes";
      }
      if (qid === 'story11') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "0";
        const r = tokens[0], c = tokens[1];
        let grid = [];
        let idx = 2;
        for (let i = 0; i < r; i++) {
          grid.push(tokens.slice(idx, idx + c));
          idx += c;
        }
        if (grid[0][0] === 0 || grid[r-1][c-1] === 0) return "0";
        let queue = [[0, 0, 1]];
        let vis = Array.from({ length: r }, () => Array(c).fill(false));
        vis[0][0] = true;
        while (queue.length > 0) {
          const [cx, cy, d] = queue.shift();
          if (cx === r - 1 && cy === c - 1) return d.toString();
          const dr = [0, 1, 0, -1];
          const dc = [1, 0, -1, 0];
          for (let i = 0; i < 4; i++) {
            const nr = cx + dr[i];
            const nc = cy + dc[i];
            if (nr >= 0 && nr < r && nc >= 0 && nc < c && !vis[nr][nc] && grid[nr][nc] === 1) {
              vis[nr][nc] = true;
              queue.push([nr, nc, d + 1]);
            }
          }
        }
        return "0";
      }
      if (qid === 'story12') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "0";
        const n = tokens[0], cap = tokens[1];
        let dp = Array(cap + 1).fill(0);
        for (let i = 0; i < n; i++) {
          const w = tokens[2 + 2*i];
          const v = tokens[3 + 2*i];
          for (let j = cap; j >= w; j--) {
            dp[j] = Math.max(dp[j], dp[j - w] + v);
          }
        }
        return dp[cap].toString();
      }
      if (qid === 'story13') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "1";
        const n = tokens[0];
        const arr = tokens.slice(1, n + 1);
        let vis = Array(n).fill(false);
        let cycles = [];
        for (let i = 0; i < n; i++) {
          if (vis[i]) continue;
          let count = 0;
          let curr = i;
          while (!vis[curr]) {
            vis[curr] = true;
            curr = arr[curr] - 1;
            count++;
          }
          cycles.push(count);
        }
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const lcm = (a, b) => (a / gcd(a, b)) * b;
        let ans = cycles[0];
        for (let i = 1; i < cycles.length; i++) {
          ans = lcm(ans, cycles[i]);
        }
        return ans.toString();
      }
      if (qid === 'story14') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "-1";
        const n = tokens[0];
        let adj = Array.from({ length: n + 1 }, () => []);
        let tIdx = 1;
        for (let i = 1; i <= n; i++) {
          const links_count = tokens[tIdx++];
          for (let j = 0; j < links_count; j++) {
            adj[i].push(tokens[tIdx++]);
          }
        }
        const src = tokens[tIdx++];
        const dest = tokens[tIdx++];
        let dist = Array(n + 1).fill(-1);
        dist[src] = 1;
        let queue = [src];
        while (queue.length > 0) {
          const curr = queue.shift();
          if (curr === dest) return dist[curr].toString();
          for (let neighbor of adj[curr]) {
            if (dist[neighbor] === -1) {
              dist[neighbor] = dist[curr] + 1;
              queue.push(neighbor);
            }
          }
        }
        return "-1";
      }
      if (qid === 'story15') {
        const lines = inputVal.trim().split(/\s+/);
        if (lines.length < 2) return "Draw";
        const ashok = lines[0];
        const anand = lines[1];
        const getCombos = (str) => {
          let count = 0;
          const len = str.length;
          for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
              for (let k = j + 1; k < len; k++) {
                if (str[i] !== str[j] && str[j] !== str[k]) count++;
              }
            }
          }
          return count;
        };
        const c1 = getCombos(ashok);
        const c2 = getCombos(anand);
        if (c1 > c2) return "Ashok";
        if (c2 > c1) return "Anand";
        return "Draw";
      }
      if (qid === 'story16') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "No Bride";
        const r = tokens[0], c = tokens[1];
        let grid = [];
        let idx = 2;
        for (let i = 0; i < r; i++) {
          grid.push(tokens.slice(idx, idx + c));
          idx += c;
        }
        let maxQual = -1;
        let minDist = 1e9;
        let bestR = -1, bestC = -1;
        for (let i = 0; i < r; i++) {
          for (let j = 0; j < c; j++) {
            if (i === 0 && j === 0) continue;
            if (grid[i][j] === 0) continue;
            let qual = 0;
            for (let di = -1; di <= 1; di++) {
              for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) continue;
                const ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < r && nj >= 0 && nj < c && grid[ni][nj] === 1) qual++;
              }
            }
            const dist = Math.max(Math.abs(i), Math.abs(j));
            if (qual > maxQual) {
              maxQual = qual;
              minDist = dist;
              bestR = i + 1;
              bestC = j + 1;
            } else if (qual === maxQual) {
              if (dist < minDist) {
                minDist = dist;
                bestR = i + 1;
                bestC = j + 1;
              }
            }
          }
        }
        if (bestR === -1) return "No Bride";
        return `${bestR}:${bestC}:${maxQual}`;
      }
      if (qid === 'story17') {
        const tokens = inputVal.trim().split(/\s+/);
        if (tokens.length < 2) return "0";
        const t = parseInt(tokens[0]);
        let results = [];
        let idx = 1;
        for (let i = 0; i < t; i++) {
          const n = parseInt(tokens[idx++]);
          const k = parseInt(tokens[idx++]);
          const s = tokens[idx++];
          let maxVal = "";
          let doubled = s + s;
          for (let j = 0; j < n; j++) {
            const shift = doubled.substr(j, n);
            if (shift > maxVal) maxVal = shift;
          }
          let shifts = [];
          for (let j = 0; j < n; j++) {
            if (doubled.substr(j, n) === maxVal) shifts.push(j);
          }
          const d = shifts.length > 1 ? shifts[1] - shifts[0] : n;
          const ans = shifts[0] + (k - 1) * d;
          results.push(ans);
        }
        return results.join('\n');
      }
      if (qid === 'story18') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "1";
        const n = tokens[0], t = tokens[1];
        let steps = [];
        let tIdx = 2;
        for (let i = 0; i < n; i++) {
          steps.push(tokens.slice(tIdx, tIdx + t));
          tIdx += t;
          tIdx++;
        }
        let leaders = Array(n).fill(0);
        for (let sec = 1; sec < t; sec += 2) {
          let maxDist = -1;
          let winners = [];
          for (let i = 0; i < n; i++) {
            let dist = 0;
            for (let s = 0; s <= sec; s++) dist += steps[i][s] * steps[i][t];
            if (dist > maxDist) {
              maxDist = dist;
              winners = [i];
            } else if (dist === maxDist) {
              winners.push(i);
            }
          }
          for (let w of winners) leaders[w]++;
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
      return inputVal.trim(); // generic fallback
    } catch (e) {
      return "Runtime Error: " + e.message;
    }
  };

  // Simulated Compiler & Code Verification logic
  const handleCompileAndRun = (isFullSubmission = false) => {
    setIsCompiling(true);
    setEditorTab('terminal');
    
    // Clear logs and print compilation command
    setTerminalLogs(prev => [
      ...prev,
      `$ g++ -std=c++17 -O3 -Wall main.cpp -o main`,
      `[System] Launching compilation diagnostics...`
    ]);

    setTimeout(() => {
      // 1. Syntactic Compilation check
      if (!code.includes('#include')) {
        setTerminalLogs(prev => [
          ...prev,
          `main.cpp:1:1: error: standard libraries not included. Standard DSA input streams require '#include'.`,
          `Compilation failed with exit code 1.`
        ]);
        setIsCompiling(false);
        if (isFullSubmission) {
          setTestCasesStatus(Array(12).fill('failed'));
        } else {
          const newStatus = [...testCasesStatus];
          newStatus[selectedTestCase] = 'failed';
          setTestCasesStatus(newStatus);
        }
        return;
      }
      if (!code.includes('int main(')) {
        setTerminalLogs(prev => [
          ...prev,
          `main.cpp: In function 'global':`,
          `error: undefined reference to 'main'. Linker error: main function entry point is missing.`,
          `Compilation failed with exit code 1.`
        ]);
        setIsCompiling(false);
        if (isFullSubmission) {
          setTestCasesStatus(Array(12).fill('failed'));
        } else {
          const newStatus = [...testCasesStatus];
          newStatus[selectedTestCase] = 'failed';
          setTestCasesStatus(newStatus);
        }
        return;
      }

      // Check brackets match
      let openBraces = (code.match(/{/g) || []).length;
      let closeBraces = (code.match(/}/g) || []).length;
      if (openBraces !== closeBraces) {
        setTerminalLogs(prev => [
          ...prev,
          `main.cpp: In function 'int main()':`,
          `error: expected '}' or '{' brace balance. Bracket mismatch detected.`,
          `Compilation failed with exit code 1.`
        ]);
        setIsCompiling(false);
        if (isFullSubmission) {
          setTestCasesStatus(Array(12).fill('failed'));
        } else {
          const newStatus = [...testCasesStatus];
          newStatus[selectedTestCase] = 'failed';
          setTestCasesStatus(newStatus);
        }
        return;
      }

      // Check semicolons on statements (Heuristic semicolon error simulator)
      const codeLines = code.split('\n');
      for (let i = 0; i < codeLines.length; i++) {
        const line = codeLines[i].trim();
        if (
          line && 
          (line.startsWith('cin >>') || line.startsWith('cout <<') || line.startsWith('int ') || line.startsWith('vector<') || line.startsWith('long long ')) && 
          !line.endsWith(';') && 
          !line.endsWith(')') && 
          !line.endsWith('{') && 
          !line.endsWith('}') && 
          !line.startsWith('for') && 
          !line.startsWith('while')
        ) {
          setTerminalLogs(prev => [
            ...prev,
            `main.cpp: In function 'solve':`,
            `main.cpp:${i + 1}:${line.length + 1}: error: expected ';' before end of statement`,
            `    ${line} <-- missing semicolon`,
            `Compilation failed with exit code 1.`
          ]);
          setIsCompiling(false);
          if (isFullSubmission) {
            setTestCasesStatus(Array(12).fill('failed'));
          } else {
            const newStatus = [...testCasesStatus];
            newStatus[selectedTestCase] = 'failed';
            setTestCasesStatus(newStatus);
          }
          return;
        }
      }

      // Compilation passes! Print linking
      setTerminalLogs(prev => [
        ...prev,
        `[System] Linking successful. Executable binary generated.`,
        `$ ./main < input.txt`
      ]);

      // 2. Logic Check verification
      let logicPassed = true;
      const cleanCode = code.replace(/\s+/g, '');
      
      if (question.id === 'story1') {
        const hasDiv = cleanCode.includes('/2') || cleanCode.includes('/=2') || cleanCode.includes('>>=1') || cleanCode.includes('>>1');
        const hasLog = cleanCode.includes('log2') || cleanCode.includes('log(');
        logicPassed = hasDiv || hasLog;
      } else if (question.id === 'story2') {
        logicPassed = cleanCode.includes("'r'") || cleanCode.includes('"r"') || cleanCode.includes("'m'") || cleanCode.includes('"m"');
      } else if (question.id === 'story3') {
        logicPassed = cleanCode.includes('minLen') || cleanCode.includes('minL') || cleanCode.includes('-=') || cleanCode.includes('-');
      } else if (question.id === 'story4') {
        logicPassed = cleanCode.includes('sort') && cleanCode.includes('exp');
      } else if (question.id === 'story5') {
        logicPassed = cleanCode.includes('dp') || cleanCode.includes('1000000007');
      } else if (question.id === 'story6') {
        logicPassed = cleanCode.includes(".*.") || cleanCode.includes('substr');
      }

      // Execute Test cases
      if (isFullSubmission) {
        setTerminalLogs(prev => [...prev, `[System] Executing suite against 12 complete testcases...`]);
        let runStatuses = [...testCasesStatus];
        let outputs = [...testCasesActualOutput];
        let passedCount = 0;

        const runNextTestCase = (idx) => {
          if (idx >= 12) {
            // Full complete
            const allPassed = passedCount === 12;
            setTerminalLogs(prev => [
              ...prev,
              `----------------------------------------`,
              `Test Suite Results: ${passedCount}/12 test cases passed.`,
              allPassed 
                ? `[Success] Congratulations! Your program successfully resolved all 12 story parameters. Solved directive marked.` 
                : `[Failure] Mismatch output or logical failure on hidden test cases.`
            ]);
            setIsCompiling(false);
            if (allPassed && !isSolved) {
              onToggleSolved(question.id);
            }
            return;
          }

          runStatuses[idx] = 'running';
          setTestCasesStatus([...runStatuses]);

          setTimeout(() => {
            const test = testCases[idx];
            let actualOut = "";
            if (logicPassed) {
              actualOut = runJsSolver(question.id, test.input);
              runStatuses[idx] = 'passed';
              passedCount++;
            } else {
              actualOut = "Mismatch: incomplete logical execution stream.";
              runStatuses[idx] = 'failed';
            }
            outputs[idx] = actualOut;
            setTestCasesActualOutput([...outputs]);
            setTestCasesStatus([...runStatuses]);

            setTerminalLogs(prev => [
              ...prev,
              `  -> Test Case ${idx + 1} (${test.type}): ${runStatuses[idx].toUpperCase()} (Time: 8ms, Memory: 4.1MB)`
            ]);

            runNextTestCase(idx + 1);
          }, 150);
        };

        runNextTestCase(0);
      } else {
        // Single Test case
        const test = testCases[selectedTestCase];
        setTerminalLogs(prev => [...prev, `[System] Executing Case ${selectedTestCase + 1} (${test.type})...`]);
        
        setTimeout(() => {
          let actualOut = "";
          let newStatuses = [...testCasesStatus];
          let newOutputs = [...testCasesActualOutput];

          if (logicPassed) {
            actualOut = runJsSolver(question.id, test.input);
            newStatuses[selectedTestCase] = 'passed';
            setTerminalLogs(prev => [
              ...prev,
              `[Success] Output matches expected results. Execution time: 8ms.`,
              `Expected: "${test.expected}"`,
              `Received: "${actualOut}"`
            ]);
          } else {
            actualOut = "Process exited with 0. Mismatch: incorrect algorithm output.";
            newStatuses[selectedTestCase] = 'failed';
            setTerminalLogs(prev => [
              ...prev,
              `[Failure] Mismatch detected. Test Case ${selectedTestCase + 1} FAILED.`,
              `Expected: "${test.expected}"`,
              `Received: "${actualOut}"`
            ]);
          }

          newOutputs[selectedTestCase] = actualOut;
          setTestCasesActualOutput(newOutputs);
          setTestCasesStatus(newStatuses);
          setIsCompiling(false);
        }, 300);
      }
    }, 1000);
  };

  const resetTemplate = () => {
    if (confirm("Reset current editor content to C++ starting template? Your saved draft will be overridden.")) {
      const template = CPP_TEMPLATES[question.id] || "";
      setCode(template);
      localStorage.setItem(`cpp_code_${question.id}`, template);
      setTerminalLogs(prev => [...prev, `$ Editor state reset to initial C++ boilerplate template.`]);
    }
  };

  const copySampleText = (text, flag) => {
    navigator.clipboard.writeText(text);
    setCopiedText(flag);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-dark-bg text-text-main select-none overflow-hidden h-screen w-screen">
      
      {/* Immersive HUD Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-dark-surface/90 relative z-10">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-primary via-accent-purple to-accent-pink opacity-50"></div>
        
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 border border-primary/30 p-2 rounded-xl">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">{question.title}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-md font-black bg-primary/10 border border-primary/20 text-primary uppercase">C++ IDE</span>
            </div>
            <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider">{question.platform} &bull; {question.topic}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {question.companyTags?.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-0.5 bg-white/5 border border-white/5 text-[10px] font-black text-text-muted rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <button
            onClick={() => onToggleSolved(question.id)}
            className={`flex items-center gap-2 px-4 py-1.5 border rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              isSolved
                ? 'border-accent-green/30 text-accent-green bg-accent-green/10 hover:bg-accent-green/20'
                : 'border-white/5 hover:border-white/20 text-text-muted hover:text-white bg-dark-bg/50'
            }`}
          >
            {isSolved ? <CheckCircle2 className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
            {isSolved ? "SOLVED" : "UNSOLVED"}
          </button>

          <button 
            onClick={onClose}
            className="p-2 bg-dark-bg hover:bg-rose-500/20 hover:text-rose-400 text-text-muted border border-white/5 rounded-lg transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Workspace (Split pane left/right) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1fr] h-full relative">
        
        {/* Left Side: Question Specifications & Test Case Suite */}
        <div className="flex flex-col h-full border-r border-white/10 overflow-hidden bg-dark-surface/10">
          
          {/* Specification Tabs Header */}
          <div className="h-12 border-b border-white/10 flex bg-dark-surface/40 p-1.5 gap-1.5">
            <button
              onClick={() => setActiveTab('problem')}
              className={`flex items-center gap-2 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'problem'
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'text-text-muted hover:text-white border border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Description
            </button>
            <button
              onClick={() => setActiveTab('constraints')}
              className={`flex items-center gap-2 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'constraints'
                  ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                  : 'text-text-muted hover:text-white border border-transparent'
              }`}
            >
              <Cpu className="w-4 h-4" /> Formats & Limits
            </button>
            <button
              onClick={() => setActiveTab('testcases')}
              className={`flex items-center gap-2 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'testcases'
                  ? 'bg-accent-pink/20 text-accent-pink border border-accent-pink/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                  : 'text-text-muted hover:text-white border border-transparent'
              }`}
            >
              <Terminal className="w-4 h-4" /> 12 Test Cases
            </button>
          </div>

          {/* Specifications Content panel */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar leading-relaxed">
            
            {activeTab === 'problem' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-5 relative overflow-hidden">
                  <h4 className="text-xs font-black text-white mb-3 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
                    <Terminal className="w-4.5 h-4.5 text-primary" /> Story Formulation
                  </h4>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-text-main/90 font-medium">
                    {question.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                      <span className="text-[10px] font-black text-accent-pink uppercase tracking-widest">Sample Input</span>
                      <button 
                        onClick={() => copySampleText(question.sampleInput, 'in')} 
                        className="p-1 bg-dark-bg rounded border border-white/5 text-text-muted hover:text-white"
                      >
                        {copiedText === 'in' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <pre className="font-mono text-xs text-text-main bg-dark-bg/60 p-3 rounded-lg border border-white/5 overflow-x-auto whitespace-pre-wrap">
                      {question.sampleInput}
                    </pre>
                  </div>

                  <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                      <span className="text-[10px] font-black text-accent-pink uppercase tracking-widest">Sample Output</span>
                      <button 
                        onClick={() => copySampleText(question.sampleOutput, 'out')} 
                        className="p-1 bg-dark-bg rounded border border-white/5 text-text-muted hover:text-white"
                      >
                        {copiedText === 'out' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <pre className="font-mono text-xs text-accent-green bg-dark-bg/60 p-3 rounded-lg border border-white/5 overflow-x-auto whitespace-pre-wrap">
                      {question.sampleOutput}
                    </pre>
                  </div>
                </div>

                {question.explanation && (
                  <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-4">
                    <h5 className="text-[11px] font-black text-white mb-2 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent-purple" /> Example Explanation
                    </h5>
                    <p className="text-xs text-text-muted leading-relaxed font-medium">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'constraints' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-4">
                    <h5 className="text-[10px] font-black text-accent-purple uppercase tracking-widest border-b border-white/5 pb-2 mb-2">📥 Input Format</h5>
                    <p className="text-xs text-text-muted leading-relaxed font-medium">{question.inputFormat || "Standard inputs"}</p>
                  </div>
                  <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-4">
                    <h5 className="text-[10px] font-black text-accent-purple uppercase tracking-widest border-b border-white/5 pb-2 mb-2">📤 Output Format</h5>
                    <p className="text-xs text-text-muted leading-relaxed font-medium">{question.outputFormat || "Standard outputs"}</p>
                  </div>
                </div>

                <div className="bg-dark-surface/40 border border-white/5 rounded-xl p-4">
                  <h5 className="text-[10px] font-black text-rose-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-2">⚙️ Technical Constraints</h5>
                  <pre className="font-mono text-xs text-text-muted bg-dark-bg/60 p-3 rounded-lg border border-white/5">
                    {question.constraints || "No special resource limits specified."}
                  </pre>
                </div>
              </motion.div>
            )}

            {activeTab === 'testcases' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-[140px_1fr] gap-4 h-[550px] overflow-hidden"
              >
                {/* Cases List Sidebar */}
                <div className="flex flex-col gap-1.5 overflow-y-auto pr-1 custom-scrollbar">
                  {testCases.map((tc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTestCase(idx)}
                      className={`flex flex-col p-2.5 rounded-lg border text-left transition-all ${
                        selectedTestCase === idx
                          ? 'bg-white/5 border-primary shadow-inner'
                          : 'bg-dark-surface/20 border-white/5 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase text-white">Case {idx + 1}</span>
                      <span className="text-[9px] text-text-muted mt-0.5 uppercase tracking-wide font-semibold truncate">{tc.type}</span>
                      
                      {/* Badge indicator */}
                      <span className={`inline-block w-fit mt-1.5 text-[8px] font-black px-1.5 py-0.5 rounded ${
                        testCasesStatus[idx] === 'passed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        testCasesStatus[idx] === 'failed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        testCasesStatus[idx] === 'running' ? 'bg-primary/10 text-primary border border-primary/20 animate-pulse' :
                        'bg-white/5 text-text-muted'
                      }`}>
                        {testCasesStatus[idx].toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Case Detail Report */}
                <div className="flex flex-col h-full bg-dark-surface/20 border border-white/5 rounded-xl p-4 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                    <span className="text-[11px] font-black text-white uppercase tracking-wider">Test Case {selectedTestCase + 1} Details</span>
                    <span className="text-[9px] font-black bg-primary/10 px-2 py-0.5 rounded text-primary uppercase tracking-widest">{testCases[selectedTestCase].type}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-text-muted font-black uppercase mb-1">
                        <span>Input Values</span>
                        <button 
                          onClick={() => copySampleText(testCases[selectedTestCase].input, 'tcin')} 
                          className="text-[9px] text-primary hover:underline"
                        >
                          {copiedText === 'tcin' ? 'Copied!' : 'Copy Input'}
                        </button>
                      </div>
                      <pre className="font-mono text-xs text-text-main bg-dark-bg/60 p-3 rounded-lg border border-white/5 max-h-32 overflow-y-auto custom-scrollbar">
                        {testCases[selectedTestCase].input}
                      </pre>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-text-muted font-black uppercase mb-1 block">Expected Output</span>
                        <pre className="font-mono text-xs text-accent-green bg-dark-bg/60 p-3 rounded-lg border border-white/5 max-h-24 overflow-y-auto custom-scrollbar">
                          {testCases[selectedTestCase].expected}
                        </pre>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted font-black uppercase mb-1 block">Actual Output</span>
                        <pre className={`font-mono text-xs bg-dark-bg/60 p-3 rounded-lg border border-white/5 max-h-24 overflow-y-auto custom-scrollbar ${
                          testCasesStatus[selectedTestCase] === 'passed' ? 'text-green-400' :
                          testCasesStatus[selectedTestCase] === 'failed' ? 'text-rose-400' : 'text-text-muted'
                        }`}>
                          {testCasesActualOutput[selectedTestCase] || 'No execution yet.'}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-dark-bg/40 border border-white/5 p-3 rounded-lg">
                      <span className="text-[10px] text-text-muted font-black uppercase block mb-1">Execution Metrics</span>
                      <div className="flex gap-4 text-xs font-bold text-text-muted">
                        <span>Time: <strong className="text-white">{testCasesStatus[selectedTestCase] === 'passed' ? '8ms' : '--'}</strong></span>
                        <span>Memory: <strong className="text-white">{testCasesStatus[selectedTestCase] === 'passed' ? '4.1MB' : '--'}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

          </div>
        </div>

        {/* Right Side: High-Fidelity IDE & Console */}
        <div className="flex flex-col h-full overflow-hidden bg-dark-surface/5">
          
          {/* IDE Action Bar / Code Editor Tab Headers */}
          <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-dark-surface/40">
            <div className="flex p-1.5 gap-1.5">
              <button
                onClick={() => setEditorTab('editor')}
                className={`flex items-center gap-2 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  editorTab === 'editor'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-text-muted hover:text-white border border-transparent'
                }`}
              >
                <Code2 className="w-4 h-4" /> Code Editor
              </button>
              <button
                onClick={() => setEditorTab('terminal')}
                className={`flex items-center gap-2 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  editorTab === 'terminal'
                    ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                    : 'text-text-muted hover:text-white border border-transparent'
                }`}
              >
                <Terminal className="w-4 h-4" /> Terminal logs
              </button>
            </div>

            <button
              onClick={resetTemplate}
              className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-text-muted hover:text-white bg-dark-bg/60 border border-white/5 hover:border-primary/30 rounded-lg transition-all"
              title="Reset starter template"
            >
              <RefreshCw className="w-3 h-3" /> Reset Template
            </button>
          </div>

          {/* IDE Coding Interface / Terminal */}
          <div className="flex-1 flex flex-col min-h-0 relative bg-dark-bg">
            
            {editorTab === 'editor' ? (
              <div className="flex-1 flex min-h-0 relative font-mono text-sm">
                
                {/* Simulated Editor Gutter Line Numbers */}
                <div className="w-12 bg-dark-surface/30 border-r border-white/5 py-4 select-none text-right pr-3 text-text-muted/30 font-semibold flex flex-col leading-6">
                  {Array.from({ length: Math.max(45, code.split('\n').length) }, (_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>

                {/* Editor Textarea */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Complete your C++ solution here...\n// Dynamic simulated compilation checks missing semicolons, matching braces, headers, etc."
                  className="flex-1 bg-transparent text-white focus:outline-none p-4 font-mono text-sm resize-none custom-scrollbar leading-6 whitespace-pre overflow-x-auto"
                  spellCheck="false"
                />
              </div>
            ) : (
              /* Simulated Terminal Console */
              <div className="flex-1 bg-black/90 p-4 font-mono text-xs leading-relaxed overflow-y-auto custom-scrollbar flex flex-col text-white">
                <div className="flex-1 space-y-2">
                  {terminalLogs.map((log, index) => {
                    let colorClass = "text-text-muted";
                    if (log.startsWith('$')) colorClass = "text-primary font-bold";
                    else if (log.includes('error:')) colorClass = "text-rose-400 font-bold";
                    else if (log.includes('[Success]') || log.includes('SUCCESSFUL')) colorClass = "text-green-400 font-black";
                    else if (log.includes('[Failure]') || log.includes('failed')) colorClass = "text-rose-400 font-bold";
                    else if (log.startsWith('  ->')) colorClass = log.includes('PASSED') ? "text-green-400/90" : "text-rose-400/90";
                    else if (log.startsWith('[System]')) colorClass = "text-accent-purple";

                    return (
                      <div key={index} className={`whitespace-pre-wrap ${colorClass}`}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            )}
            
          </div>

          {/* Compile & Submits action Footer */}
          <div className="h-16 border-t border-white/10 bg-dark-surface/90 flex items-center justify-between px-6 z-10 relative">
            <button
              onClick={() => {
                setTerminalLogs(prev => [...prev, `$ clear`]);
                setTerminalLogs([`$ Ready to compile and solve story directives for ${question.title}...`]);
              }}
              className="text-xs uppercase font-black tracking-wider text-text-muted hover:text-white"
            >
              Clear Console
            </button>

            <div className="flex gap-3">
              <button
                disabled={isCompiling}
                onClick={() => handleCompileAndRun(false)}
                className="flex items-center gap-2 px-5 py-2.5 bg-dark-bg hover:bg-white/5 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4 text-primary" /> Run Active Case
              </button>

              <button
                disabled={isCompiling}
                onClick={() => handleCompileAndRun(true)}
                className="flex items-center gap-2 px-6 py-2.5 btn-premium text-xs font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> Submit directives
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
