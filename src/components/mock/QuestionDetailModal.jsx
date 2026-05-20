import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Send, RefreshCw, Terminal, Cpu, CheckCircle2, XCircle, Code2, BookOpen, AlertCircle, Copy, Check, Sparkles, HelpCircle, Eye } from 'lucide-react';

// Minimal starter comment for all 18 Story Questions - just a hint
const BLANK_STARTER = `// write your code here`;
const CPP_TEMPLATES = {
  story1: BLANK_STARTER,
  story2: BLANK_STARTER,
  story3: BLANK_STARTER,
  story4: BLANK_STARTER,
  story5: BLANK_STARTER,
  story6: BLANK_STARTER,
  story7: BLANK_STARTER,
  story8: BLANK_STARTER,
  story9: BLANK_STARTER,
  story10: BLANK_STARTER,
  story11: BLANK_STARTER,
  story12: BLANK_STARTER,
  story13: BLANK_STARTER,
  story14: BLANK_STARTER,
  story15: BLANK_STARTER,
  story16: BLANK_STARTER,
  story17: BLANK_STARTER,
  story18: BLANK_STARTER
};

// Full C++ Solutions Registry for Study / Verification
const CPP_SOLUTIONS = {
  story1: `// Problem: Philaland Coins Reference Solution\n#include <iostream>\nusing namespace std;\n\nvoid solve() {\n    int n;\n    cin >> n;\n    int ans = 0;\n    while (n > 0) {\n        ans++;\n        n /= 2;\n    }\n    cout << ans << endl;\n}\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        solve();\n    }\n    return 0;\n}`,
  story2: `// Problem: Swayamvar Matchmaking Reference Solution\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    string brides, grooms;\n    cin >> brides >> grooms;\n    \n    int groomR = 0, groomM = 0;\n    for (char c : grooms) {\n        if (c == 'r') groomR++;\n        else if (c == 'm') groomM++;\n    }\n    \n    for (int i = 0; i < n; i++) {\n        char b = brides[i];\n        if (b == 'r') {\n            if (groomR > 0) groomR--;\n            else {\n                cout << (n - i) << endl;\n                return 0;\n            }\n        } else {\n            if (groomM > 0) groomM--;\n            else {\n                cout << (n - i) << endl;\n                return 0;\n            }\n        }\n    }\n    cout << 0 << endl;\n    return 0;\n}`,
  story3: `// Problem: Dole Out Cadbury Reference Solution\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint getBlocks(int l, int w) {\n    int count = 0;\n    while (l > 0 && w > 0) {\n        if (l == w) {\n            count++;\n            break;\n        }\n        if (l > w) l -= w;\n        else w -= l;\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    int minL, maxL, minW, maxW;\n    cin >> minL >> maxL >> minW >> maxW;\n    \n    int total = 0;\n    for (int l = minL; l <= maxL; l++) {\n        for (int w = minW; w <= maxW; w++) {\n            total += getBlocks(l, w);\n        }\n    }\n    cout << total << endl;\n    return 0;\n}`,
  story4: `// Problem: RPG Monster Defeat Reference Solution\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Monster {\n    int power;\n    int bonus;\n};\n\nbool compareMonsters(const Monster& a, const Monster& b) {\n    return a.power < b.power;\n}\n\nint main() {\n    int n, exp;\n    cin >> n >> exp;\n    vector<Monster> monsters(n);\n    for (int i = 0; i < n; i++) cin >> monsters[i].power;\n    for (int i = 0; i < n; i++) cin >> monsters[i].bonus;\n    \n    sort(monsters.begin(), monsters.end(), compareMonsters);\n    int count = 0;\n    for (int i = 0; i < n; i++) {\n        if (exp > monsters[i].power) {\n            exp += monsters[i].bonus;\n            count++;\n        } else {\n            break;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}`,
  story5: `// Problem: Unique Birthday Gift Reference Solution\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<vector<long long>> dp(n + 1, vector<long long>(k + 1, 0));\n    for (int j = 1; j <= k; j++) dp[1][j] = 1;\n    \n    for (int i = 1; i < n; i++) {\n        for (int j = 1; j <= k; j++) {\n            if (dp[i][j] == 0) continue;\n            for (int mul = j; mul <= k; mul += j) {\n                dp[i+1][mul] = (dp[i+1][mul] + dp[i][j]) % 1000000007;\n            }\n        }\n    }\n    long long ans = 0;\n    for (int j = 1; j <= k; j++) {\n        ans = (ans + dp[n][j]) % 1000000007;\n    }\n    cout << ans << endl;\n    return 0;\n}`,
  story6: `// Problem: Constellation Star Decoding Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> grid(3);\n    for (int i = 0; i < 3; i++) cin >> grid[i];\n    \n    string ans = "";\n    int i = 0;\n    while (i < n) {\n        if (grid[0][i] == '.' && grid[1][i] == '.' && grid[2][i] == '.') {\n            ans += "#";\n            i++;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == ".*." && grid[1].substr(i, 3) == "*.*" && grid[2].substr(i, 3) == "***") {\n            ans += "A";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "***" && grid[1].substr(i, 3) == "**." && grid[2].substr(i, 3) == "***") {\n            ans += "E";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "***" && grid[1].substr(i, 3) == ".*." && grid[2].substr(i, 3) == "***") {\n            ans += "I";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "***" && grid[1].substr(i, 3) == "*.*" && grid[2].substr(i, 3) == "***") {\n            ans += "O";\n            i += 3;\n        } else if (i + 2 < n && grid[0].substr(i, 3) == "*.*" && grid[1].substr(i, 3) == "*.*" && grid[2].substr(i, 3) == "***") {\n            ans += "U";\n            i += 3;\n        } else {\n            i++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}`,
  story7: `// Problem: Special Matrix Grid Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <cmath>\nusing namespace std;\n\nbool isPrime(int num) {\n    if (num <= 1) return false;\n    for (int i = 2; i * i <= num; i++) {\n        if (num % i == 0) return false;\n    }\n    return true;\n}\n\nbool isCellPrime(string val) {\n    if (val == "Prime") return true;\n    try {\n        int num = stoi(val);\n        return isPrime(num);\n    } catch (...) {\n        return false;\n    }\n}\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<vector<string>> grid(r, vector<string>(c));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) cin >> grid[i][j];\n    }\n    \n    vector<vector<long long>> dp(r, vector<long long>(c, 0));\n    if (!isCellPrime(grid[0][0])) dp[0][0] = 1;\n    \n    long long MOD = 1000000007;\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            if (dp[i][j] == 0) continue;\n            \n            string val = grid[i][j];\n            int num = 0;\n            bool isNum = true;\n            try { num = stoi(val); } catch (...) { isNum = false; }\n            \n            if (isNum && num < 0) {\n                int jump = abs(num);\n                int ni = i + jump;\n                int nj = j + jump;\n                if (ni < r && nj < c && !isCellPrime(grid[ni][nj])) {\n                    dp[ni][nj] = (dp[ni][nj] + dp[i][j]) % MOD;\n                }\n                continue;\n            }\n            \n            if (j + 1 < c && !isCellPrime(grid[i][j+1])) {\n                dp[i][j+1] = (dp[i][j+1] + dp[i][j]) % MOD;\n            }\n            if (i + 1 < r && !isCellPrime(grid[i+1][j])) {\n                dp[i+1][j] = (dp[i+1][j] + dp[i][j]) % MOD;\n            }\n        }\n    }\n    cout << dp[r-1][c-1] << endl;\n    return 0;\n}`,
  story8: `// Problem: Digit Pairs Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    \n    vector<string> scores(n);\n    for (int i = 0; i < n; i++) {\n        int temp = arr[i];\n        int a = temp % 10, b = (temp/10)%10, c = temp/100;\n        int maxV = max({a, b, c});\n        int minV = min({a, b, c});\n        int score = (maxV * 11 + minV * 7) % 100;\n        string s = to_string(score);\n        if (s.length() < 2) s = "0" + s;\n        scores[i] = s;\n    }\n    \n    int pairs = 0;\n    vector<int> odd(10, 0), even(10, 0);\n    for (int i = 0; i < n; i++) {\n        int msb = scores[i][0] - '0';\n        if ((i + 1) % 2 != 0) odd[msb]++;\n        else even[msb]++;\n    }\n    \n    for (int d = 0; d < 10; d++) {\n        int count = 0;\n        if (odd[d] == 2) count++;\n        else if (odd[d] > 2) count += 2;\n        if (even[d] == 2) count++;\n        else if (even[d] > 2) count += 2;\n        pairs += min(2, count);\n    }\n    cout << min(2, pairs) << endl;\n    return 0;\n}`,
  story9: `// Problem: Holes and Balls Reference Solution\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int h;\n    cin >> h;\n    vector<int> holes(h);\n    for (int i = 0; i < h; i++) cin >> holes[i];\n    int b;\n    cin >> b;\n    vector<int> balls(b);\n    for (int i = 0; i < b; i++) cin >> balls[i];\n    \n    vector<int> capacity(h);\n    for (int i = 0; i < h; i++) capacity[i] = i + 1;\n    vector<int> current(h, 0);\n    \n    for (int i = 0; i < b; i++) {\n        int ball = balls[i];\n        int pos = 0;\n        for (int j = h - 1; j >= 0; j--) {\n            if (holes[j] >= ball && current[j] < capacity[j]) {\n                current[j]++;\n                pos = j + 1;\n                break;\n            }\n        }\n        cout << pos << (i == b - 1 ? "" : " ");\n    }\n    cout << endl;\n    return 0;\n}`,
  story10: `// Problem: Saving Patients Reference Solution\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> vac(n), pat(n);\n    for (int i = 0; i < n; i++) cin >> vac[i];\n    for (int i = 0; i < n; i++) cin >> pat[i];\n    \n    sort(vac.begin(), vac.end());\n    sort(pat.begin(), pat.end());\n    for (int i = 0; i < n; i++) {\n        if (vac[i] <= pat[i]) {\n            cout << "No" << endl;\n            return 0;\n        }\n    }\n    cout << "Yes" << endl;\n    return 0;\n}`,
  story11: `// Problem: Grid Path Planning Reference Solution\n#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct Cell {\n    int r, c, d;\n};\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<vector<int>> grid(r, vector<int>(c));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) cin >> grid[i][j];\n    }\n    \n    if (grid[0][0] == 1 || grid[r-1][c-1] == 1) {\n        cout << -1 << endl;\n        return 0;\n    }\n    \n    queue<Cell> q;\n    q.push({0, 0, 1});\n    vector<vector<bool>> vis(r, vector<bool>(c, false));\n    vis[0][0] = true;\n    \n    while (!q.empty()) {\n        Cell curr = q.front();\n        q.pop();\n        if (curr.r == r - 1 && curr.c == c - 1) {\n            cout << curr.d << endl;\n            return 0;\n        }\n        int dr[] = {0, 1, 0, -1};\n        int dc[] = {1, 0, -1, 0};\n        for (int i = 0; i < 4; i++) {\n            int nr = curr.r + dr[i];\n            int nc = curr.c + dc[i];\n            if (nr >= 0 && nr < r && nc >= 0 && nc < c && !vis[nr][nc] && grid[nr][nc] == 0) {\n                vis[nr][nc] = true;\n                q.push({nr, nc, curr.d + 1});\n            }\n        }\n    }\n    cout << -1 << endl;\n    return 0;\n}`,
  story12: `// Problem: Super Market Billing Reference Solution\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct DSU {\n    vector<int> parent;\n    DSU(int n) {\n        parent.resize(n + 1);\n        for (int i = 1; i <= n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    void unite(int i, int j) {\n        int rootI = find(i);\n        int rootJ = find(j);\n        if (rootI != rootJ) parent[rootI] = rootJ;\n    }\n};\n\nint main() {\n    int n, w, m;\n    cin >> n >> w >> m;\n    vector<int> weight(n + 1), cost(n + 1);\n    for (int i = 1; i <= n; i++) cin >> weight[i];\n    for (int i = 1; i <= n; i++) cin >> cost[i];\n    \n    DSU dsu(n);\n    for (int i = 0; i < m; i++) {\n        int u, v;\n        cin >> u >> v;\n        dsu.unite(u, v);\n    }\n    \n    vector<vector<int>> components(n + 1);\n    for (int i = 1; i <= n; i++) {\n        components[dsu.find(i)].push_back(i);\n    }\n    \n    vector<int> dp(w + 1, 0);\n    for (int i = 1; i <= n; i++) {\n        if (components[i].empty()) continue;\n        \n        int total_weight = 0;\n        int min_cost = 1e9;\n        for (int idx : components[i]) {\n            total_weight += weight[idx];\n            if (cost[idx] < min_cost) min_cost = cost[idx];\n        }\n        \n        int total_value = 0;\n        for (int idx : components[i]) total_value += cost[idx];\n        \n        for (int j = w; j >= total_weight; j--) {\n            dp[j] = max(dp[j], dp[j - total_weight] + total_value);\n        }\n    }\n    \n    cout << dp[w] << endl;\n    return 0;\n}`,
  story13: `// Problem: Grooving Blocks Reference Solution\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nlong long gcd(long long a, long long b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\n\nlong long lcm(long long a, long long b) {\n    return (a / gcd(a, b)) * b;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    \n    vector<bool> vis(n, false);\n    vector<long long> cycles;\n    for (int i = 0; i < n; i++) {\n        if (vis[i]) continue;\n        long long count = 0;\n        int curr = i;\n        while (!vis[curr]) {\n            vis[curr] = true;\n            curr = arr[curr] - 1;\n            count++;\n        }\n        cycles.push_back(count);\n    }\n    \n    long long ans = cycles[0];\n    for (size_t i = 1; i < cycles.size(); i++) {\n        ans = lcm(ans, cycles[i]);\n    }\n    cout << ans << endl;\n    return 0;\n}`,
  story14: `// Problem: Web Pages Search Reference Solution\n#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<vector<int>> adj(n + 1);\n    for (int i = 1; i <= n; i++) {\n        int k;\n        cin >> k;\n        for (int j = 0; j < k; j++) {\n            int target;\n            cin >> target;\n            adj[i].push_back(target);\n        }\n    }\n    int src, dest;\n    cin >> src >> dest;\n    \n    vector<int> dist(n + 1, -1);\n    dist[src] = 1;\n    queue<int> q;\n    q.push(src);\n    while (!q.empty()) {\n        int curr = q.front();\n        q.pop();\n        if (curr == dest) {\n            cout << dist[curr] << endl;\n            return 0;\n        }\n        for (int next : adj[curr]) {\n            if (dist[next] == -1) {\n                dist[next] = dist[curr] + 1;\n                q.push(next);\n            }\n        }\n    }\n    cout << -1 << endl;\n    return 0;\n}`,
  story15: `// Problem: Orchard Tree Planting Reference Solution\n#include <iostream>\n#include <string>\nusing namespace std;\n\nlong long getCombinations(string s) {\n    long long count = 0;\n    int len = s.length();\n    for (int i = 0; i < len; i++) {\n        for (int j = i + 1; j < len; j++) {\n            if (s[i] == s[j]) continue;\n            for (int k = j + 1; k < len; k++) {\n                if (s[j] != s[k]) count++;\n            }\n        }\n    }\n    return count;\n}\n\nint main() {\n    string ashok, anand;\n    cin >> ashok >> anand;\n    long long c1 = getCombinations(ashok);\n    long long c2 = getCombinations(anand);\n    if (c1 > c2) cout << "Ashok" << endl;\n    else if (c2 > c1) cout << "Anand" << endl;\n    else cout << "Draw" << endl;\n    return 0;\n}`,
  story16: `// Problem: Bride Hunting Quest Reference Solution\n#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<vector<int>> grid(r, vector<int>(c));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) cin >> grid[i][j];\n    }\n    \n    int maxQual = -1;\n    int minDist = 1e9;\n    int bestR = -1, bestC = -1;\n    \n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            if (i == 0 && j == 0) continue;\n            if (grid[i][j] == 0) continue;\n            \n            int qual = 0;\n            for (int di = -1; di <= 1; di++) {\n                for (int dj = -1; dj <= 1; dj++) {\n                    if (di == 0 && dj == 0) continue;\n                    int ni = i + di, nj = j + dj;\n                    if (ni >= 0 && ni < r && nj >= 0 && nj < c && grid[ni][nj] == 1) qual++;\n                }\n            }\n            int dist = max(abs(i), abs(j));\n            if (qual > maxQual) {\n                maxQual = qual;\n                minDist = dist;\n                bestR = i + 1;\n                bestC = j + 1;\n            } else if (qual == maxQual) {\n                if (dist < minDist) {\n                    minDist = dist;\n                    bestR = i + 1;\n                    bestC = j + 1;\n                }\n            }\n        }\n    }\n    if (bestR == -1) cout << "No Bride" << endl;\n    else cout << bestR << ":" << bestC << ":" << maxQual << endl;\n    return 0;\n}`,
  story17: `// Problem: Cyclic String Shift Reference Solution\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid solve() {\n    string s, t;\n    cin >> s >> t;\n    \n    if (s.length() != t.length()) {\n        cout << -1 << endl;\n        return;\n    }\n    \n    string doubled = s + s;\n    int n = s.length();\n    int ans = -1;\n    for (int i = 0; i < n; i++) {\n        if (doubled.substr(i, n) == t) {\n            ans = i;\n            break;\n        }\n    }\n    cout << ans << endl;\n}\n\nint main() {\n    solve();\n    return 0;\n}`,
  story18: `// Problem: Marathon Winner Reference Solution\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, t;\n    cin >> n >> t;\n    vector<vector<int>> steps(n, vector<int>(t));\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < t; j++) {\n            cin >> steps[i][j];\n        }\n    }\n    \n    vector<int> leaders(n, 0);\n    vector<int> total_dist(n, 0);\n    \n    for (int sec = 0; sec < t; sec++) {\n        for (int i = 0; i < n; i++) {\n            total_dist[i] += steps[i][sec];\n        }\n        \n        if ((sec + 1) % 2 == 0) {\n            int maxDist = -1;\n            for (int i = 0; i < n; i++) {\n                if (total_dist[i] > maxDist) {\n                    maxDist = total_dist[i];\n                }\n            }\n            for (int i = 0; i < n; i++) {\n                if (total_dist[i] == maxDist) {\n                    leaders[i]++;\n                }\n            }\n        }\n    }\n    \n    int maxLead = -1, bestIdx = -1;\n    for (int i = 0; i < n; i++) {\n        if (leaders[i] > maxLead) {\n            maxLead = leaders[i];\n            bestIdx = i + 1;\n        }\n    }\n    cout << bestIdx << endl;\n    return 0;\n}`
};

// Helper to highlight variables and expressions in the description
const highlightVariables = (text) => {
  if (!text) return "";
  
  // Highlight standard DSA variables and specific terms
  const parts = text.split(/(\b(?:N|K|T|EXP|W|MinL|MaxL|MinW|MaxW|MaxS|MinL|MaxL|P\[i\]|H_[12N]|H_i|a_i|a_\{i-1\}|a_1|a_2|a_K|S1|S2)\b|['"](?:[rmMP])['"]|\b(?:rum|mojito|mango|papaya)\b|\(\d+,\s*\d+\)|\([Nij\-\s+,|a-zA-Z0-9_]+\))/g);
  
  return parts.map((part, index) => {
    if (part.match(/^(\b(?:N|K|T|EXP|W|MinL|MaxL|MinW|MaxW|MaxS|MinL|MaxL|P\[i\]|H_[12N]|H_i|a_i|a_\{i-1\}|a_1|a_2|a_K|S1|S2)\b|['"](?:[rmMP])['"]|\b(?:rum|mojito|mango|papaya)\b|\(\d+,\s*\d+\)|\([Nij\-\s+,|a-zA-Z0-9_]+\))$/)) {
      return (
        <code key={index} className="bg-white/10 text-primary border border-white/5 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold mx-0.5 shadow-sm">
          {part}
        </code>
      );
    }
    return part;
  });
};

// Helper to render and structure description paragraphs, bullets, lists
const formatDescriptionText = (text) => {
  if (!text) return null;
  
  const paragraphs = text.split('\n\n');
  
  return paragraphs.map((para, pIdx) => {
    const trimmed = para.trim();
    if (!trimmed) return null;
    
    // Check if paragraph is a multiline list
    if (trimmed.includes('\n') && (trimmed.match(/^(?:[0-9]+\.|\-)\s/m))) {
      const items = trimmed.split('\n');
      return (
        <ul key={pIdx} className="space-y-2.5 my-3.5 pl-1">
          {items.map((item, iIdx) => {
            const cleanedItem = item.replace(/^(?:[0-9]+\.|\-)\s+/, '');
            const isNumbered = item.match(/^[0-9]+\./);
            const bulletNumber = isNumbered ? item.match(/^[0-9]+/)[0] : null;
            
            return (
              <li key={iIdx} className="flex items-start gap-3 text-sm text-text-main/90 leading-relaxed font-semibold">
                {isNumbered ? (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-black flex-shrink-0 mt-0.5 shadow-sm">
                    {bulletNumber}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0 mt-2.5 shadow-sm"></span>
                )}
                <span className="flex-1">{highlightVariables(cleanedItem)}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Check if single numbered line
    if (trimmed.match(/^[0-9]+\.\s+/)) {
      const cleaned = trimmed.replace(/^[0-9]+\.\s+/, '');
      const num = trimmed.match(/^[0-9]+/)[0];
      return (
        <div key={pIdx} className="flex items-start gap-3 my-3 pl-1 text-sm text-text-main/90 leading-relaxed font-semibold">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-black flex-shrink-0 mt-0.5 shadow-sm">
            {num}
          </span>
          <p className="flex-1">{highlightVariables(cleaned)}</p>
        </div>
      );
    }
    
    // Check if single bullet line
    if (trimmed.startsWith('- ')) {
      const cleaned = trimmed.replace(/^-\s+/, '');
      return (
        <div key={pIdx} className="flex items-start gap-3 my-3 pl-1 text-sm text-text-main/90 leading-relaxed font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0 mt-2 shadow-sm"></span>
          <p className="flex-1">{highlightVariables(cleaned)}</p>
        </div>
      );
    }
    
    // Standard paragraph
    return (
      <p key={pIdx} className="text-sm text-text-main/95 leading-relaxed font-semibold mb-4">
        {highlightVariables(trimmed)}
      </p>
    );
  });
};

// Helper to render constraints beautifully
const formatConstraints = (constraintsText) => {
  if (!constraintsText) return <p className="text-xs text-text-muted">No special resource limits specified.</p>;
  
  const lines = constraintsText.split('\n');
  return (
    <div className="flex flex-wrap gap-2.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        
        const cleanedLine = trimmed
          .replace(/<=/g, ' ≤ ')
          .replace(/>=/g, ' ≥ ')
          .replace(/==/g, ' = ');
          
        return (
          <div key={idx} className="flex items-center gap-2 text-xs font-mono font-bold text-amber-200/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 animate-pulse shadow-sm"></span>
            <span>{cleanedLine}</span>
          </div>
        );
      })}
    </div>
  );
};

// Helper to format explanation text inside cards
const formatExplanation = (explanationText) => {
  if (!explanationText) return null;
  
  const lines = explanationText.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    
    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const cleanedLine = isBullet ? trimmed.substring(2) : trimmed;
    
    return (
      <p key={idx} className={`leading-relaxed font-semibold text-xs text-text-main/80 ${isBullet ? 'pl-4 relative mb-2' : 'mb-2'}`}>
        {isBullet && <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-accent-purple shadow-sm"></span>}
        {highlightVariables(cleanedLine)}
      </p>
    );
  });
};

export default function QuestionDetailModal({ question, onClose, isSolved, onToggleSolved }) {
  const [activeTab, setActiveTab] = useState('problem');
  const [editorTab, setEditorTab] = useState('editor');
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem(`cpp_code_${question?.id}`);
    const solution = CPP_SOLUTIONS[question?.id];
    
    // Strict verification: if localStorage contains exactly the reference solution, reset to starter comment!
    if (saved && solution && saved.trim() === solution.trim()) {
      return BLANK_STARTER;
    }
    return saved || BLANK_STARTER;
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
    const solution = CPP_SOLUTIONS[question?.id];
    
    // Strict verification: if localStorage contains exactly the reference solution, reset to starter comment!
    if (saved && solution && saved.trim() === solution.trim()) {
      setCode(BLANK_STARTER);
    } else {
      setCode(saved || BLANK_STARTER);
    }
    
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
      case 'story2': // Swayamvar Matchmaking
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
          { input: "3\n100\n101 100 300\n20 50 10", expected: "2", type: "Sample case" },
          { input: "1\n10\n9\n5", expected: "1", type: "Single edge case" },
          { input: "1\n10\n10\n5", expected: "0", type: "Failed edge case" },
          { input: "3\n100\n101 200 300\n50 50 50", expected: "0", type: "Instafail greedy" },
          { input: "3\n100\n90 120 150\n30 30 30", expected: "3", type: "Complete chain defeat" },
          { input: "4\n50\n40 80 120 160\n10 10 10 10", expected: "1", type: "Partial sorting block" },
          { input: "5\n10\n5 12 18 20 40\n3 6 2 20 5", expected: "4", type: "Sorting greedy chain" },
          { input: "6\n20\n10 15 25 30 50 100\n5 10 5 20 50 10", expected: "6", type: "Full chain progression" },
          { input: "8\n5\n1 2 4 8 16 32 64 128\n1 2 4 8 16 32 64 128", expected: "8", type: "Exponential growth match" },
          { input: "3\n10\n10 20 30\n10 10 10", expected: "0", type: "Exact threshold lock" },
          { input: "10\n50\n45 48 55 60 70 80 90 100 110 120\n5 7 2 10 5 5 10 20 5 5", expected: "10", type: "Large scale RPG battle" },
          { input: "12\n100\n90 95 110 120 130 140 150 160 170 180 190 200\n2 3 5 5 10 5 10 5 15 5 20 20", expected: "12", type: "Max Boundary monsters" }
        ];
      case 'story5': // Unique Birthday Gift
        return [
          { input: "3\n2", expected: "5", type: "Sample case" },
          { input: "1\n1", expected: "1", type: "Minimum scale edge" },
          { input: "1\n5", expected: "1", type: "Single length edge" },
          { input: "2\n1", expected: "2", type: "Single element choice" },
          { input: "2\n2", expected: "3", type: "Small DP sequence" },
          { input: "2\n5", expected: "10", type: "Length 2 multiples" },
          { input: "2\n10", expected: "27", type: "Multiple DP grid" },
          { input: "3\n5", expected: "17", type: "Medium DP progression" },
          { input: "3\n10", expected: "68", type: "Medium DP scale" },
          { input: "5\n5", expected: "49", type: "Normal parameters" },
          { input: "5\n10", expected: "427", type: "Large DP parameters" },
          { input: "10\n100", expected: "1931", type: "Max boundary modulo" }
        ];
      case 'story6': // Constellation Star Decoding
        return [
          { input: "18\n*.*#***#*.*#***.*.\n*.*#**.#*.*#*.*.*.\n***#***#***#***.*.", expected: "A#E#I#U", type: "Sample case" },
          { input: "3\n.*.\n*.*\n***", expected: "A", type: "Single character 'A'" },
          { input: "3\n***\n**.\n***", expected: "E", type: "Single character 'E'" },
          { input: "3\n***\n.*.\n***", expected: "I", type: "Single character 'I'" },
          { input: "3\n***\n*.*\n***", expected: "O", type: "Single character 'O'" },
          { input: "3\n*.*\n*.*\n***", expected: "U", type: "Single character 'U'" },
          { input: "1\n#\n#\n#", expected: "#", type: "Space indicator grid" },
          { input: "5\n#.#.#\n#.#.#\n#.#.#", expected: "#.#.#", type: "Continuous spaces" },
          { input: "7\n.*.#***\n*.*#**.\n***#***", expected: "A#E", type: "Mixed sequence" },
          { input: "11\n.*.#***#***\n*.*#**.***.\n***#***#***", expected: "A#E#I", type: "Complex parsing" },
          { input: "15\n.*.#***#***#***\n*.*#**.***.*.*\n***#***#***#***", expected: "A#E#I#O", type: "Dense vowels list" },
          { input: "19\n.*.#***#***#***#*.*\n*.*#**.***.*.*#*.*\n***#***#***#***#***", expected: "A#E#I#O#U", type: "Max sequence full constellation" }
        ];
      case 'story7': // Special Grid Matrix
        return [
          { input: "3 3\n0 4 Prime\n4 0 -1\nPrime 4 0", expected: "1", type: "Sample case" },
          { input: "2 2\n0 0\n0 0", expected: "2", type: "Clean grid edge" },
          { input: "2 2\n0 Prime\n0 0", expected: "1", type: "Obstructed grid edge" },
          { input: "2 2\n0 0\nPrime 0", expected: "1", type: "Bottom blocked grid" },
          { input: "2 2\nPrime 0\n0 0", expected: "0", type: "Blocked start edge" },
          { input: "3 3\n0 4 4\n4 0 -1\n4 4 0", expected: "5", type: "Portal jumps active" },
          { input: "3 3\n0 Prime 4\n4 0 -1\nPrime 4 0", expected: "1", type: "Prime obstruction block" },
          { input: "3 3\n0 4 Prime\n4 0 4\nPrime 4 0", expected: "2", type: "Normal grid" },
          { input: "4 4\n0 4 4 4\n4 0 4 4\n4 4 0 -2\n4 4 4 0", expected: "18", type: "Deep portal jump test" },
          { input: "4 4\n0 Prime 4 4\n4 0 Prime 4\n4 4 0 Prime\n4 4 4 0", expected: "2", type: "Prime diagonaled lock" },
          { input: "5 5\n0 4 4 4 4\n4 0 4 4 4\n4 4 0 4 4\n4 4 4 0 -3\n4 4 4 4 0", expected: "69", type: "Large portal jump grid" },
          { input: "6 6\n0 4 4 4 4 4\n4 0 4 4 4 4\n4 4 0 4 4 4\n4 4 4 0 4 4\n4 4 4 4 0 -4\n4 4 4 4 4 0", expected: "250", type: "Max boundary paths" }
        ];
      case 'story8': // Digit Pairs Match
        return [
          { input: "8\n234 567 321 345 123 110 767 111", expected: "3", type: "Sample case" },
          { input: "2\n100 200", expected: "0", type: "No pairs possible" },
          { input: "3\n123 234 345", expected: "0", type: "Three elements match limit" },
          { input: "4\n123 111 234 222", expected: "1", type: "Single pair output" },
          { input: "5\n123 123 123 123 123", expected: "2", type: "All matching max limits" },
          { input: "6\n234 234 567 567 110 110", expected: "2", type: "Two separate digit pairs" },
          { input: "8\n100 200 300 400 500 600 700 800", expected: "0", type: "Bit scores mismatches" },
          { input: "10\n123 123 123 123 123 123 123 123 123 123", expected: "2", type: "High duplicates lock" },
          { input: "6\n345 567 345 567 123 123", expected: "2", type: "Mixed alignments" },
          { input: "8\n111 111 222 222 333 333 444 444", expected: "2", type: "Symmetric elements" },
          { input: "12\n234 567 321 345 123 110 767 111 234 567 321 345", expected: "2", type: "Extended set limits" },
          { input: "15\n111 111 111 111 222 222 222 222 333 333 333 333 444 444 444", expected: "2", type: "Max boundary sets count" }
        ];
      case 'story9': // Holes and Balls
        return [
          { input: "3\n21 3 6\n11\n20 15 5 7 10 4 2 1 3 6 8", expected: "1 0 3 0 0 3 3 2 2 0 0", type: "Sample case" },
          { input: "1\n10\n1\n5", expected: "1", type: "Single ball match" },
          { input: "1\n5\n1\n10", expected: "0", type: "Single ball spill" },
          { input: "2\n10 20\n3\n5 15 25", expected: "1 2 0", type: "Progressive capacities" },
          { input: "3\n5 10 15\n3\n5 10 15", expected: "1 2 3", type: "Exact matching fit" },
          { input: "3\n10 10 10\n5\n5 5 5 5 5", expected: "1 2 2 3 3", type: "Equal sized holes capacity" },
          { input: "2\n5 5\n4\n2 2 2 2", expected: "1 2 2 0", type: "Hole filling threshold" },
          { input: "3\n5 10 5\n4\n4 4 4 4", expected: "1 2 2 0", type: "Middle hole match overflow" },
          { input: "4\n20 10 30 15\n5\n25 15 5 35 10", expected: "3 3 1 0 4", type: "Scattered sizes test" },
          { input: "2\n100 100\n4\n50 50 50 50", expected: "1 2 2 0", type: "Large values limits" },
          { input: "5\n10 20 30 40 50\n8\n15 25 35 45 55 5 5 5", expected: "2 3 4 5 0 1 2 2", type: "Large queue parameters" },
          { input: "6\n50 40 30 20 10 60\n10\n5 15 25 35 45 55 65 5 5 5", expected: "1 2 3 4 6 6 0 1 2 2", type: "Max sequence balls drop" }
        ];
      case 'story10': // Saving Patients
        return [
          { input: "5\n123 146 454 442 321\n100 320 220 440 120", expected: "Yes", type: "Sample case" },
          { input: "1\n10\n9", expected: "Yes", type: "Single success edge" },
          { input: "1\n5\n5", expected: "No", type: "Equal value fail edge" },
          { input: "2\n10 20\n15 25", expected: "No", type: "Small sorted fail" },
          { input: "3\n100 200 300\n90 190 290", expected: "Yes", type: "Aligned sorting save" },
          { input: "4\n50 60 70 80\n40 50 90 70", expected: "No", type: "High pathogen blocker" },
          { input: "5\n100 200 300 400 500\n99 199 299 399 499", expected: "Yes", type: "Tight margins success" },
          { input: "5\n10 10 10 10 10\n9 9 9 9 9", expected: "Yes", type: "Equal parameters success" },
          { input: "6\n15 25 35 45 55 65\n20 20 20 20 20 20", expected: "No", type: "Pathogen bulk blocking" },
          { input: "8\n100 120 140 160 180 200 220 240\n90 110 130 150 170 190 210 230", expected: "Yes", type: "Incremental values match" },
          { input: "10\n500 500 500 500 500 600 600 600 600 600\n450 450 450 450 450 550 550 550 550 550", expected: "Yes", type: "Component group sorting" },
          { input: "12\n10 20 30 40 50 60 70 80 90 100 110 120\n5 15 25 35 45 55 65 75 85 95 105 115", expected: "Yes", type: "Max array sorting vaccine match" }
        ];
      case 'story11': // Grid Path Planning
        return [
          { input: "3 4\n0 0 1 0\n1 0 0 0\n0 1 1 0", expected: "6", type: "Sample case" },
          { input: "2 2\n0 0\n0 0", expected: "3", type: "Clean minimal path" },
          { input: "2 2\n0 1\n0 0", expected: "3", type: "Alternative route minimal" },
          { input: "2 2\n0 1\n1 0", expected: "-1", type: "Completely blocked grid" },
          { input: "3 3\n0 0 0\n0 1 0\n0 0 0", expected: "5", type: "Outer wall perimeter" },
          { input: "3 3\n0 1 0\n0 1 0\n0 0 0", expected: "7", type: "U-shaped detour path" },
          { input: "4 4\n0 0 0 0\n1 1 1 0\n0 0 0 0\n0 1 1 0", expected: "8", type: "S-shaped grid path" },
          { input: "4 4\n0 1 0 0\n0 1 0 1\n0 0 0 1\n1 1 0 0", expected: "7", type: "Dynamic maze navigation" },
          { input: "5 5\n0 0 0 0 0\n1 1 1 1 0\n0 0 0 0 0\n0 1 1 1 1\n0 0 0 0 0", expected: "13", type: "Deep snake grid detour" },
          { input: "5 5\n0 1 1 1 0\n0 0 0 1 0\n1 1 0 1 0\n0 0 0 0 0\n0 1 1 1 0", expected: "9", type: "Complex central maze" },
          { input: "6 6\n0 0 0 0 0 0\n0 1 1 1 1 0\n0 1 0 0 1 0\n0 1 0 1 1 0\n0 0 0 0 0 0\n1 1 1 1 1 0", expected: "11", type: "Large scale BFS routing" },
          { input: "8 8\n0 0 0 0 0 0 0 0\n1 1 1 1 1 1 1 0\n0 0 0 0 0 0 1 0\n0 1 1 1 1 0 1 0\n0 1 0 0 1 0 1 0\n0 1 0 1 1 0 0 0\n0 0 0 0 0 1 1 0\n1 1 1 1 0 0 0 0", expected: "22", type: "Max boundary BFS search grid" }
        ];
      case 'story12': // Super Market Billing
        return [
          { input: "4 10 1\n4 5 1 2\n10 20 5 2\n1 3", expected: "35", type: "Sample case" },
          { input: "2 5 0\n2 3\n10 20", expected: "30", type: "No discounts normal knapsack" },
          { input: "2 5 1\n2 3\n10 20\n1 2", expected: "30", type: "Bundle matching weight limit" },
          { input: "3 10 1\n5 5 10\n10 20 50\n1 2", expected: "50", type: "Valuable heavy choice" },
          { input: "3 10 1\n4 4 2\n10 20 5\n1 2", expected: "35", type: "Free bundle pick" },
          { input: "4 15 2\n5 5 5 5\n10 20 30 40\n1 2\n3 4", expected: "100", type: "Two bundle groupings" },
          { input: "5 20 2\n4 6 8 5 3\n10 15 20 25 30\n1 2\n4 5", expected: "100", type: "High capacity choice" },
          { input: "4 8 3\n2 2 2 2\n10 10 10 10\n1 2\n2 3\n3 4", expected: "40", type: "Chain discount component" },
          { input: "6 30 3\n5 10 15 5 10 5\n50 60 70 80 90 100\n1 3\n2 4\n5 6", expected: "450", type: "Large bundled selection" },
          { input: "5 5 1\n4 2 2 1 1\n5 10 15 20 25\n2 3", expected: "60", type: "Limit threshold choices" },
          { input: "8 50 4\n10 15 20 10 5 5 10 15\n100 150 200 80 50 60 90 120\n1 3\n2 4\n5 6\n7 8", expected: "850", type: "Extended DSU items count" },
          { input: "10 100 5\n10 20 30 40 10 20 30 40 10 20\n100 200 300 400 120 220 320 420 150 250\n1 5\n2 6\n3 7\n4 8\n9 10", expected: "2480", type: "Max items bundle constraints" }
        ];
      case 'story13': // Grooving Blocks
        return [
          { input: "4\n2 1 4 3", expected: "2", type: "Sample case" },
          { input: "1\n1", expected: "1", type: "Single element loop" },
          { input: "2\n1 2", expected: "1", type: "Self loop pairs" },
          { input: "3\n2 3 1", expected: "3", type: "Single 3-cycle loop" },
          { input: "4\n2 3 4 1", expected: "4", type: "Single 4-cycle loop" },
          { input: "5\n2 3 1 5 4", expected: "6", type: "LCM(3, 2) multi-cycle" },
          { input: "6\n2 3 4 5 6 1", expected: "6", type: "Complete circular rotate" },
          { input: "6\n2 1 4 3 6 5", expected: "2", type: "Three double loops" },
          { input: "7\n2 3 1 5 6 7 4", expected: "12", type: "LCM(3, 4) cycle count" },
          { input: "8\n2 3 4 1 6 7 8 5", expected: "4", type: "LCM(4, 4) equal cycles" },
          { input: "10\n2 3 4 5 1 7 8 9 10 6", expected: "5", type: "Two equal 5 cycles" },
          { input: "12\n2 3 4 5 1 7 8 6 10 11 12 9", expected: "60", type: "Max boundary cycle permutations" }
        ];
      case 'story14': // Web Pages Search
        return [
          { input: "4\n2 2 3\n1 4\n1 4\n0\n1 4", expected: "2", type: "Sample case" },
          { input: "2\n1 2\n0\n1 2", expected: "2", type: "Single step hop" },
          { input: "2\n0\n0\n1 2", expected: "-1", type: "Disconnected graph" },
          { input: "3\n1 2\n1 3\n0\n1 3", expected: "3", type: "Linear chain route" },
          { input: "4\n2 2 3\n1 3\n1 4\n0\n1 4", expected: "3", type: "Multiple routes choice" },
          { input: "5\n1 2\n1 3\n1 4\n1 5\n0\n1 5", expected: "5", type: "Extended linear chain" },
          { input: "6\n2 2 3\n2 4 5\n1 6\n1 6\n1 6\n0\n1 6", expected: "3", type: "Star network hub path" },
          { input: "5\n2 2 3\n1 4\n1 4\n1 5\n0\n1 5", expected: "4", type: "Intermediate hops" },
          { input: "8\n1 2\n1 3\n1 4\n1 5\n1 6\n1 7\n1 8\n0\n1 8", expected: "8", type: "Deep linear chain" },
          { input: "7\n2 2 3\n2 4 5\n2 5 6\n1 7\n1 7\n1 7\n0\n1 7", expected: "4", type: "Layered routing search" },
          { input: "10\n2 2 3\n2 4 5\n2 5 6\n2 7 8\n2 8 9\n2 9 10\n1 10\n1 10\n1 10\n0\n1 10", expected: "5", type: "Complex graph search paths" },
          { input: "12\n2 2 3\n2 4 5\n2 5 6\n2 7 8\n2 8 9\n2 9 10\n2 11 12\n1 12\n1 12\n1 12\n1 12\n0\n1 12", expected: "6", type: "Max boundary BFS click depth" }
        ];
      case 'story15': // Orchard Tree Planting
        return [
          { input: "MPMP\nPMPM", expected: "Draw", type: "Sample case" },
          { input: "MMM\nPPP", expected: "Draw", type: "All same type elements edge" },
          { input: "MPM\nPPP", expected: "Ashok", type: "Single valid set winner" },
          { input: "PPP\nPMP", expected: "Anand", type: "Opponent valid winner" },
          { input: "MPMP\nPPPP", expected: "Ashok", type: "Normal row lengths" },
          { input: "PMPM\nMMMM", expected: "Ashok", type: "Alternating vs Solid fruit" },
          { input: "MPMPM\nPMPMP", expected: "Draw", type: "Longer equal symmetries" },
          { input: "MMPPMP\nPPMMPM", expected: "Draw", type: "Clustered fruits draw" },
          { input: "MPMPMP\nPPPPPP", expected: "Ashok", type: "Solid alternating row" },
          { input: "MMMPPP\nMMPPMP", expected: "Anand", type: "Clustered vs scattered fruits" },
          { input: "MPMPMPMP\nPMPMPMPM", expected: "Draw", type: "Larger symmetric string length" },
          { input: "MPMPMPMPMP\nMMMMMMMMMM", expected: "Ashok", type: "Max boundary selections winner" }
        ];
      case 'story16': // Bride Hunting Quest
        return [
          { input: "4 4\n0 1 0 0\n0 0 1 1\n1 1 0 1\n1 0 0 1", expected: "3:2:4", type: "Sample case" },
          { input: "2 2\n0 0\n0 0", expected: "No Bride", type: "Zero brides edge case" },
          { input: "2 2\n0 0\n0 1", expected: "2:2:0", type: "Single bride no neighbors" },
          { input: "2 2\n0 1\n1 1", expected: "1:2:2", type: "Clustered minimal grid" },
          { input: "3 3\n0 1 0\n1 1 1\n0 1 0", expected: "2:2:4", type: "Plus shape center bride" },
          { input: "3 3\n0 1 1\n1 1 1\n1 1 1", expected: "2:2:7", type: "Almost complete bride block" },
          { input: "4 4\n0 1 1 0\n1 1 1 1\n1 1 1 1\n0 1 1 0", expected: "2:2:7", type: "Tie breaking distance checks" },
          { input: "4 4\n0 0 0 0\n0 1 1 0\n0 1 1 0\n0 0 0 0", expected: "2:2:3", type: "Inner box bride check" },
          { input: "5 5\n0 1 0 1 0\n1 0 1 0 1\n0 1 0 1 0\n1 0 1 0 1\n0 1 0 1 0", expected: "2:3:4", type: "Checkerboard pattern check" },
          { input: "5 5\n0 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1", expected: "2:2:8", type: "Max neighbor full grid check" },
          { input: "6 6\n0 1 0 1 0 1\n1 1 1 1 1 1\n0 1 0 1 0 1\n1 1 1 1 1 1\n0 1 0 1 0 1\n1 1 1 1 1 1", expected: "2:2:6", type: "Large scale grid checking" },
          { input: "8 8\n0 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1\n1 1 1 1 1 1 1 1", expected: "2:2:8", type: "Max boundary neighbors test" }
        ];
      case 'story17': // Cyclic String Shift
        return [
          { input: "2\n3 2\n101\n110", expected: "1", type: "Sample case" },
          { input: "1\n1 1\n1\n1", expected: "0", type: "Single element match edge" },
          { input: "1\n2 1\n10\n01", expected: "1", type: "Two elements shift match" },
          { input: "1\n2 1\n10\n11", expected: "-1", type: "Two elements impossible" },
          { input: "1\n3 1\n100\n001", expected: "2", type: "Three elements shift match" },
          { input: "1\n4 2\n1001\n0110", expected: "-1", type: "Four elements impossible" },
          { input: "1\n5 1\n10101\n11010", expected: "1", type: "Odd length shift match" },
          { input: "1\n6 2\n110110\n110110", expected: "0", type: "Multi-cyclic symmetry match" },
          { input: "1\n8 1\n10000000\n00000001", expected: "7", type: "Extended bits rotation search" },
          { input: "1\n10 2\n1111111111\n1111111111", expected: "0", type: "Solid matching cyclic search" },
          { input: "2\n4 1\n1010\n0101\n4 1\n1100\n0011", expected: "1\n2", type: "Multi test case execution flow" },
          { input: "2\n12 1\n101010101010\n010101010101\n12 1\n111000111000\n000111000111", expected: "1\n3", type: "Max boundary bits shift matching" }
        ];
      case 'story18': // Marathon Winner Simulation
        return [
          { input: "3\n4\n1 2 1 2 2\n2 1 2 1 2\n1 1 1 1 1", expected: "2", type: "Sample case" },
          { input: "2\n2\n1 2 1\n2 1 1", expected: "1", type: "Two runner minimal checkpoint" },
          { input: "2\n2\n1 1 1\n1 1 1", expected: "1", type: "Equal scores tiebreaker test" },
          { input: "3\n2\n5 5 1\n1 1 1\n1 1 1", expected: "1", type: "Strong early lead runner" },
          { input: "3\n4\n1 1 1 1 5\n2 2 2 2 2\n3 3 3 3 1", expected: "3", type: "Consistency vs burst winner" },
          { input: "4\n4\n1 2 3 4 1\n4 3 2 1 1\n2 2 2 2 2\n3 3 3 3 1", expected: "2", type: "Four runner checkpoint checks" },
          { input: "3\n6\n1 2 1 2 1 2 2\n2 1 2 1 2 1 2\n1 1 1 1 1 1 1", expected: "2", type: "Six second long marathon" },
          { input: "5\n4\n1 2 1 2 1\n2 1 2 1 1\n3 1 1 1 1\n1 1 1 5 1\n2 2 2 2 1", expected: "5", type: "Multiple runner tie check" },
          { input: "3\n8\n1 1 1 1 1 1 1 1 2\n2 2 2 2 2 2 2 2 1\n3 3 3 3 3 3 3 3 1", expected: "2", type: "Eight second steps check" },
          { input: "6\n4\n1 1 1 1 1\n2 2 2 2 1\n3 3 3 3 1\n4 4 4 4 1\n5 5 5 5 1\n6 6 6 6 1", expected: "6", type: "Large list runner check" },
          { input: "4\n10\n1 2 1 2 1 2 1 2 1 2 2\n2 1 2 1 2 1 2 1 2 1 2\n1 1 1 1 1 1 1 1 1 1 1\n3 3 1 1 1 1 1 1 1 1 1", expected: "4", type: "Ten checkpoints runner test" },
          { input: "8\n6\n1 2 1 2 1 2 2\n2 1 2 1 2 1 2\n3 1 1 1 1 1 1\n1 1 1 1 1 1 1\n2 2 2 2 2 2 1\n3 3 1 1 1 1 1\n1 2 3 4 5 6 1\n2 2 2 2 2 2 2", expected: "8", type: "Max boundary runners marathon winner" }
        ];
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
        return (ans % 10000).toString(); // TCS Codevita requires modulo 10000
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
          if (col0 === '#' && col1 === '#' && col2 === '#') {
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
      if (qid === 'story7') {
        const lines = inputVal.trim().split('\n');
        if (lines.length < 2) return "0";
        const [r, c] = lines[0].trim().split(/\s+/).map(Number);
        let grid = [];
        let idx = 2;
        for (let i = 0; i < r; i++) {
          grid.push(lines[idx].trim().split(/\s+/));
          idx += c;
        }
        
        const isCellPrime = (val) => {
          if (val === 'Prime') return true;
          const num = parseInt(val);
          if (isNaN(num)) return false;
          if (num <= 1) return false;
          for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) return false;
          }
          return true;
        };

        let dp = Array.from({ length: r }, () => Array(c).fill(0));
        if (!isCellPrime(grid[0][0])) {
          dp[0][0] = 1;
        }

        const MOD = 1000000007;

        for (let i = 0; i < r; i++) {
          for (let j = 0; j < c; j++) {
            if (dp[i][j] === 0) continue;
            
            const cellVal = grid[i][j];
            const num = parseInt(cellVal);
            
            if (!isNaN(num) && num < 0) {
              const jump = Math.abs(num);
              const ni = i + jump;
              const nj = j + jump;
              if (ni < r && nj < c && !isCellPrime(grid[ni][nj])) {
                dp[ni][nj] = (dp[ni][nj] + dp[i][j]) % MOD;
              }
              continue;
            }

            if (j + 1 < c && !isCellPrime(grid[i][j + 1])) {
              dp[i][j + 1] = (dp[i][j + 1] + dp[i][j]) % MOD;
            }
            if (i + 1 < r && !isCellPrime(grid[i + 1][j])) {
              dp[i + 1][j] = (dp[i + 1][j] + dp[i][j]) % MOD;
            }
          }
        }
        return dp[r - 1][c - 1].toString();
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
        if (tokens.length < 2) return "-1";
        const r = tokens[0], c = tokens[1];
        let grid = [];
        let idx = 2;
        for (let i = 0; i < r; i++) {
          grid.push(tokens.slice(idx, idx + c));
          idx += c;
        }
        if (grid[0][0] === 1 || grid[r-1][c-1] === 1) return "-1";
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
            if (nr >= 0 && nr < r && nc >= 0 && nc < c && !vis[nr][nc] && grid[nr][nc] === 0) {
              vis[nr][nc] = true;
              queue.push([nr, nc, d + 1]);
            }
          }
        }
        return "-1";
      }
      if (qid === 'story12') {
        const tokens = inputVal.trim().split(/\s+/).map(Number);
        if (tokens.length < 2) return "0";
        const n = tokens[0], w = tokens[1], m = tokens[2];
        let weights = tokens.slice(3, 3 + n);
        let costs = tokens.slice(3 + n, 3 + 2 * n);
        
        let parent = Array.from({ length: n + 1 }, (_, i) => i);
        const find = (i) => {
          if (parent[i] === i) return i;
          return parent[i] = find(parent[i]);
        };
        const unite = (i, j) => {
          let rootI = find(i);
          let rootJ = find(j);
          if (rootI !== rootJ) parent[rootI] = rootJ;
        };
        
        let tIdx = 3 + 2 * n;
        for (let i = 0; i < m; i++) {
          unite(tokens[tIdx], tokens[tIdx + 1]);
          tIdx += 2;
        }
        
        let components = Array.from({ length: n + 1 }, () => []);
        for (let i = 1; i <= n; i++) {
          components[find(i)].push(i);
        }
        
        let dp = Array(w + 1).fill(0);
        for (let i = 1; i <= n; i++) {
          if (components[i].length === 0) continue;
          
          let total_weight = 0;
          let min_cost = 1e9;
          for (let idx of components[i]) {
            total_weight += weights[idx - 1];
            if (costs[idx - 1] < min_cost) min_cost = costs[idx - 1];
          }
          
          let total_value = 0;
          for (let idx of components[i]) total_value += costs[idx - 1];
          
          for (let j = w; j >= total_weight; j--) {
            dp[j] = Math.max(dp[j], dp[j - total_weight] + total_value);
          }
        }
        return dp[w].toString();
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
              if (str[i] === str[j]) continue;
              for (let k = j + 1; k < len; k++) {
                if (str[j] !== str[k]) count++;
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
        }
        
        let leaders = Array(n).fill(0);
        let total_dist = Array(n).fill(0);
        for (let sec = 0; sec < t; sec++) {
          for (let i = 0; i < n; i++) {
            total_dist[i] += steps[i][sec];
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
      return inputVal.trim();
    } catch (e) {
      return "Runtime Error: " + e.message;
    }
  };

  // Real C++ compilation & execution via Wandbox (routed via same-origin proxy to bypass CORS)
  const compileAndRunCpp = async (sourceCode, stdinInput) => {
    try {
      console.log("Sending request to Wandbox API via Proxy...");
      const res = await fetch('/compiler/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiler: 'gcc-12.2.0',
          code: sourceCode,
          stdin: stdinInput || '',
          options: '-std=c++17 -O2',
          save: false
        })
      });

      if (!res.ok) {
        throw new Error(`Compiler API returned HTTP status ${res.status}`);
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error during Wandbox API call:", error);
      throw new Error("Failed to compile and run C++ code. Make sure you are connected to the internet.");
    }
  };

  const handleCompileAndRun = async (isFullSubmission = false) => {
    // Basic check for empty editor or placeholder
    const trimmedCode = code.trim();
    if (!trimmedCode || trimmedCode === BLANK_STARTER) {
      setEditorTab('terminal');
      setTerminalLogs(prev => [
        ...prev,
        `[System Error] Editor contains only placeholder code. Please write your C++ solution before executing.`
      ]);
      return;
    }

    setIsCompiling(true);
    setEditorTab('terminal');
    const testCases = generate12TestCases(question.id);
    const singleTest = testCases[selectedTestCase];

    setTerminalLogs(prev => [
      ...prev,
      `[System] Initiating C++ compilation using GCC 12 via cloud sandbox...`,
      `$ g++ -std=c++17 -O2 main.cpp -o main`
    ]);

    try {
      // Step 1: Real compilation check using the first test case
      const testToCompile = isFullSubmission ? testCases[0] : singleTest;
      const compileCheck = await compileAndRunCpp(code, testToCompile.input);

      // Check if there are compilation errors
      if (compileCheck.compiler_error) {
        const errLines = compileCheck.compiler_error.split('\n').filter(l => l.trim());
        setTerminalLogs(prev => [
          ...prev,
          ...errLines,
          `Compilation failed with exit code 1.`
        ]);
        setIsCompiling(false);
        if (isFullSubmission) {
          setTestCasesStatus(Array(12).fill('failed'));
        } else {
          const s = [...testCasesStatus];
          s[selectedTestCase] = 'failed';
          setTestCasesStatus(s);
        }
        return;
      }

      setTerminalLogs(prev => [
        ...prev,
        `[System] Compilation successful. Linker generated executable binary.`,
        `$ ./main < input.txt`
      ]);

      // Step 2: Run test case(s)
      if (isFullSubmission) {
        setTerminalLogs(prev => [...prev, `[System] Executing all 12 test cases in parallel...`]);
        
        let runStatuses = Array(12).fill('running');
        let outputs = Array(12).fill('');
        let passedCount = 0;
        setTestCasesStatus([...runStatuses]);

        // Run all 12 test cases in parallel
        const promises = testCases.map(async (tc, idx) => {
          try {
            const result = await compileAndRunCpp(code, tc.input);

            if (result.compiler_error) {
              runStatuses[idx] = 'failed';
              outputs[idx] = 'Compilation Error';
              setTestCasesStatus([...runStatuses]);
              setTestCasesActualOutput([...outputs]);
              setTerminalLogs(prev => [
                ...prev,
                `  -> Case ${idx + 1} (${tc.type}): FAILED (Compiler Error)`
              ]);
              return false;
            }

            if (result.program_error) {
              runStatuses[idx] = 'failed';
              outputs[idx] = 'Runtime Error';
              setTestCasesStatus([...runStatuses]);
              setTestCasesActualOutput([...outputs]);
              setTerminalLogs(prev => [
                ...prev,
                `  -> Case ${idx + 1} (${tc.type}): FAILED (Runtime Error: ${result.program_error.trim()})`
              ]);
              return false;
            }

            const actual = (result.program_output || '').trim();
            const expected = tc.expected.trim();
            const passed = actual === expected;

            runStatuses[idx] = passed ? 'passed' : 'failed';
            outputs[idx] = actual;
            if (passed) passedCount++;

            setTestCasesStatus([...runStatuses]);
            setTestCasesActualOutput([...outputs]);
            setTerminalLogs(prev => [
              ...prev,
              `  -> Case ${idx + 1} (${tc.type}): ${passed ? 'PASSED' : `FAILED — Expected: "${expected}" Got: "${actual}"`}`
            ]);
            return passed;
          } catch (e) {
            runStatuses[idx] = 'failed';
            outputs[idx] = 'Execution Error';
            setTestCasesStatus([...runStatuses]);
            setTestCasesActualOutput([...outputs]);
            setTerminalLogs(prev => [
              ...prev,
              `  -> Case ${idx + 1} (${tc.type}): ERROR - ${e.message}`
            ]);
            return false;
          }
        });

        const results = await Promise.all(promises);
        const allPassed = results.every(x => x === true);

        setTerminalLogs(prev => [
          ...prev,
          `----------------------------------------`,
          `Results: ${passedCount}/12 passed.`,
          allPassed
            ? `[Success] All 12 test cases passed! Marked as Solved.`
            : `[Failure] ${12 - passedCount} test case(s) failed. Fix your logic and resubmit.`
        ]);
        setIsCompiling(false);
        if (allPassed && !isSolved) onToggleSolved(question.id);

      } else {
        // Single test case run
        setTerminalLogs(prev => [...prev, `[System] Running Case ${selectedTestCase + 1} (${singleTest.type})...`]);
        const result = await compileAndRunCpp(code, singleTest.input);
        
        if (result.program_error) {
          setTerminalLogs(prev => [
            ...prev,
            `[Runtime Error] ${result.program_error.trim()}`
          ]);
          const newStatuses = [...testCasesStatus];
          newStatuses[selectedTestCase] = 'failed';
          setTestCasesStatus(newStatuses);
          setIsCompiling(false);
          return;
        }

        const actual = (result.program_output || '').trim();
        const expected = singleTest.expected.trim();
        const passed = actual === expected;

        const newStatuses = [...testCasesStatus];
        const newOutputs = [...testCasesActualOutput];
        newStatuses[selectedTestCase] = passed ? 'passed' : 'failed';
        newOutputs[selectedTestCase] = actual;

        if (passed) {
          setTerminalLogs(prev => [
            ...prev,
            `[Success] Output matches expected result.`,
            `Expected: "${expected}"`,
            `Received: "${actual}"`
          ]);
        } else {
          setTerminalLogs(prev => [
            ...prev,
            `[Failure] Wrong Answer.`,
            `Expected: "${expected}"`,
            `Received: "${actual}"`
          ]);
        }

        setTestCasesActualOutput(newOutputs);
        setTestCasesStatus(newStatuses);
        setIsCompiling(false);
      }

    } catch (err) {
      setTerminalLogs(prev => [
        ...prev,
        `[Error] Compilation / Execution failed: ${err.message}`
      ]);
      setIsCompiling(false);
    }
  };

  const resetTemplate = () => {
    if (confirm("Clear the editor? Your saved draft will be deleted and you will start from scratch.")) {
      setCode(BLANK_STARTER);
      localStorage.setItem(`cpp_code_${question.id}`, BLANK_STARTER);
      setTerminalLogs(prev => [...prev, `$ Editor cleared. Start writing your C++ solution from scratch.`]);
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
              <span className="text-[10px] px-2 py-0.5 rounded-md font-black text-primary uppercase">C++ IDE</span>
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
          
          {/* Read-only solved badge — only set automatically when all 12 test cases pass on Submit */}
          <div
            className={`flex items-center gap-2 px-4 py-1.5 border rounded-lg text-xs font-black uppercase tracking-wider select-none cursor-default ${
              isSolved
                ? 'border-accent-green/40 text-accent-green bg-accent-green/10 shadow-[0_0_12px_rgba(52,211,153,0.15)]'
                : 'border-white/5 text-text-muted/50 bg-dark-bg/30'
            }`}
            title={isSolved ? 'All 12 test cases passed — Solved!' : 'Submit all 12 test cases to mark as Solved'}
          >
            {isSolved ? <CheckCircle2 className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
            {isSolved ? "SOLVED" : "UNSOLVED"}
          </div>

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
                className="space-y-6 animate-fade-in"
              >
                {/* Unified Description narrative Card */}
                <div className="bg-dark-surface/30 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl p-5 relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                  <h4 className="text-xs font-black text-white mb-3.5 uppercase tracking-wider pb-2 flex items-center gap-2 border-b border-white/5">
                    <BookOpen className="w-4.5 h-4.5 text-primary" /> Story Formulation
                  </h4>
                  <div className="space-y-3.5">
                    {formatDescriptionText(question.description)}
                  </div>
                </div>

                {/* Formats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
                    <h5 className="text-[11px] font-black text-primary uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5 flex items-center gap-1.5">
                      <span>📥</span> Input Format Specifications
                    </h5>
                    <div className="text-xs text-text-muted leading-relaxed font-semibold space-y-2">
                      {question.inputFormat ? (
                        question.inputFormat.split('\n').map((line, idx) => (
                          <p key={idx} className="relative pl-3.5 text-text-main/80 font-medium">
                            <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-primary/60"></span>
                            {highlightVariables(line.trim())}
                          </p>
                        ))
                      ) : (
                        <p className="text-text-muted">Standard console inputs.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-dark-surface/40 border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
                    <h5 className="text-[11px] font-black text-primary uppercase tracking-widest border-b border-white/5 pb-2 mb-3.5 flex items-center gap-1.5">
                      <span>📤</span> Output Format Specifications
                    </h5>
                    <div className="text-xs text-text-muted leading-relaxed font-semibold space-y-2">
                      {question.outputFormat ? (
                        question.outputFormat.split('\n').map((line, idx) => (
                          <p key={idx} className="relative pl-3.5 text-text-main/80 font-medium">
                            <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-primary/60"></span>
                            {highlightVariables(line.trim())}
                          </p>
                        ))
                      ) : (
                        <p className="text-text-muted">Standard console output.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Constraints Card */}
                <div className="bg-dark-surface/40 border border-amber-500/20 bg-amber-500/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></div>
                  <h5 className="text-[11px] font-black text-amber-400 uppercase tracking-widest border-b border-amber-500/10 pb-2 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" /> Constraints
                  </h5>
                  {formatConstraints(question.constraints)}
                </div>

                {/* Examples Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2">
                    <Sparkles className="w-4.5 h-4.5 text-accent-purple" /> Example Cases
                  </h4>

                  <div className="bg-dark-surface/40 border border-white/10 rounded-2xl p-5 space-y-4 shadow-lg backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/5 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-black text-accent-purple uppercase tracking-widest flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" /> Sample Case 1
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Input Box */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Input</span>
                          <button 
                            onClick={() => copySampleText(question.sampleInput, 'in')} 
                            className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-primary hover:text-white transition-all bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg shadow-sm hover:bg-primary/20"
                          >
                            {copiedText === 'in' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedText === 'in' ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <pre className="font-mono text-xs text-text-main bg-black/40 p-3.5 rounded-xl border border-white/5 overflow-x-auto whitespace-pre custom-scrollbar select-all leading-5">
                          {question.sampleInput}
                        </pre>
                      </div>

                      {/* Output Box */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Output</span>
                          <button 
                            onClick={() => copySampleText(question.sampleOutput, 'out')} 
                            className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-accent-green hover:text-white transition-all bg-accent-green/10 border border-accent-green/20 px-2.5 py-1 rounded-lg shadow-sm hover:bg-accent-green/20"
                          >
                            {copiedText === 'out' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedText === 'out' ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <pre className="font-mono text-xs text-accent-green bg-black/40 p-3.5 rounded-xl border border-white/5 overflow-x-auto whitespace-pre custom-scrollbar select-all leading-5">
                          {question.sampleOutput}
                        </pre>
                      </div>
                    </div>

                    {question.explanation && (
                      <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-accent-purple" /> Explanation Walkthrough
                        </span>
                        <div className="bg-dark-bg/40 p-4 rounded-xl border border-white/5 text-xs text-text-muted/90 leading-relaxed font-semibold">
                          {formatExplanation(question.explanation)}
                        </div>
                      </div>
                    )}
                  </div>
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

            <div className="flex items-center gap-2">
              {/* Premium View Reference Solution Button */}
              <button
                onClick={() => setShowSolutionModal(true)}
                className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-accent-purple hover:text-white bg-accent-purple/10 border border-accent-purple/20 hover:bg-accent-purple/20 rounded-lg transition-all"
                title="View clean reference solution"
              >
                <Eye className="w-3.5 h-3.5" /> View Solution
              </button>
              
              <button
                onClick={resetTemplate}
                className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-text-muted hover:text-white bg-dark-bg/60 border border-white/5 hover:border-primary/30 rounded-lg transition-all"
                title="Reset starter template"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Template
              </button>
            </div>
          </div>

          {/* IDE Coding Interface / Terminal */}
          <div className="flex-1 flex flex-col min-h-0 relative font-mono text-sm">
            
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

      {/* Premium Reference Solution Modal */}
      <AnimatePresence>
        {showSolutionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-dark-surface border border-white/10 rounded-2xl overflow-hidden flex flex-col max-h-[85vh] shadow-[0_0_50px_rgba(139,92,246,0.15)]"
            >
              <div className="h-14 px-6 border-b border-white/10 flex items-center justify-between bg-dark-surface/90 relative">
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink opacity-50"></div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-purple" />
                  <span className="text-sm font-black text-white uppercase tracking-wider">C++ Reference Solution</span>
                </div>
                <button
                  onClick={() => setShowSolutionModal(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-text-muted hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-dark-bg/60">
                <div className="mb-4 text-xs text-text-muted bg-accent-purple/10 border border-accent-purple/20 p-3.5 rounded-xl leading-relaxed font-bold">
                  🔔 Study this clean implementation to understand standard competitive programming input parsing, DP arrays, BFS graphs, and math properties. Use this to help write your code in the editor!
                </div>

                <div className="relative group">
                  <pre className="font-mono text-xs text-text-main bg-black/60 p-5 rounded-xl border border-white/5 overflow-x-auto whitespace-pre custom-scrollbar select-text leading-5">
                    {CPP_SOLUTIONS[question.id] || `// No reference solution currently mapped.`}
                  </pre>
                  
                  {CPP_SOLUTIONS[question.id] && (
                    <button
                      onClick={() => copySampleText(CPP_SOLUTIONS[question.id], 'sol')}
                      className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-dark-surface hover:bg-white/5 border border-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all select-none"
                    >
                      {copiedText === 'sol' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedText === 'sol' ? 'Copied' : 'Copy Code'}
                    </button>
                  )}
                </div>
              </div>

              <div className="h-14 px-6 border-t border-white/10 bg-dark-surface/90 flex items-center justify-end">
                <button
                  onClick={() => setShowSolutionModal(false)}
                  className="px-5 py-2 bg-dark-bg hover:bg-white/5 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  Close Reference
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
