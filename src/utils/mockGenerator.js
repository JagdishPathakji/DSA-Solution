import { questions } from '../data/questions';

/**
 * Randomly shuffles an array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generates a mock session.
 * Strictly avoids questions in `solvedIds`.
 * Tries to pick from different topics if possible, or respects user selection.
 */
export const generateMock = (difficulty = null, specificTopics = [], unseenIds = [], solvedIds = [], topicCounts = {}) => {
  let globalPool = [...questions];

  const targetQuestions = specificTopics && specificTopics.length > 0 
    ? specificTopics.reduce((acc, topic) => acc + (topicCounts[topic] || 1), 0)
    : 3;

  // 1. Filter out permanently solved questions
  if (solvedIds && solvedIds.length > 0) {
    globalPool = globalPool.filter(q => !solvedIds.includes(q.id));
  }

  // 2. Apply explicit user difficulty filter
  if (difficulty && difficulty !== 'Random') {
    const diffPool = globalPool.filter(q => q.difficulty === difficulty);
    if (diffPool.length >= targetQuestions) globalPool = diffPool; 
  }

  // 3. Prefer questions not seen in recent mocks
  if (unseenIds && unseenIds.length > 0) {
    const unseenPool = globalPool.filter(q => !unseenIds.includes(q.id));
    if (unseenPool.length >= targetQuestions) {
      globalPool = unseenPool;
    }
  }

  // 4. Fallback if pool is too small (e.g. solved all questions)
  if (globalPool.length < targetQuestions) {
     globalPool = [...questions];
     if (difficulty && difficulty !== 'Random') {
       globalPool = globalPool.filter(q => q.difficulty === difficulty);
     }
  }

  globalPool = shuffleArray(globalPool);
  const selected = [];
  const selectedTopicNames = new Set();

  // 5. If specific topics are requested, try to pick requested amount from each
  if (specificTopics && specificTopics.length > 0) {
    for (const topic of specificTopics) {
      let count = 0;
      const targetCount = topicCounts[topic] || 1;
      for (const q of globalPool) {
        if (q.topic === topic && !selected.find(s => s.id === q.id)) {
          selected.push(q);
          selectedTopicNames.add(q.topic);
          count++;
          if (count >= targetCount) break;
        }
      }
    }
  }

  // 6. Fill the remaining spots to reach targetQuestions questions
  for (const q of globalPool) {
    if (selected.length >= targetQuestions) break;
    if (selected.find(s => s.id === q.id)) continue; // skip already selected

    // Prefer drawing from unselected topics if possible
    if (!selectedTopicNames.has(q.topic) || selected.length >= globalPool.length - (targetQuestions - selected.length)) {
      selected.push(q);
      selectedTopicNames.add(q.topic);
    }
  }

  // 7. Ultimate fallback to fill if unique topics weren't possible
  let index = 0;
  while (selected.length < targetQuestions && index < globalPool.length) {
    if (!selected.find(s => s.id === globalPool[index].id)) {
      selected.push(globalPool[index]);
    }
    index++;
  }

  return selected;
};
