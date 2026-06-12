export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clue, answer } = req.body;
  if (!clue || !answer) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const ANSWERS = {
    clue1: ["พี่มีนาฬิกา"],
    clue2: ["elden lord", "1324322411"],
  };

  const accepted = ANSWERS[clue];
  if (!accepted) {
    return res.status(400).json({ error: 'Unknown clue' });
  }

  const correct = accepted.some(a => a.toLowerCase() === answer.toLowerCase());

  // สำหรับ clue2 ต้องรู้ว่า path ไหน
  let redirect = null;
  if (correct && clue === 'clue2') {
    if (answer.toLowerCase() === 'elden lord') {
      redirect = 'final';
    } else {
      redirect = 'steam';
    }
  }

  res.json({ correct, redirect });
}
