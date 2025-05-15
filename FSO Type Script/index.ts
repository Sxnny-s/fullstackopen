import express, { Request, Response } from 'express';
const PORT = 3000;
const app = express();
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequestBody;

  // Validate that daily_exercises is an array and not empty
  if (!daily_exercises || !Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // Validate that all elements in daily_exercises are numbers
  if (!daily_exercises.every((exercise) => typeof exercise === 'number')) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // Validate that target is a number
  if (!target || typeof target !== 'number') {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // Call the exerciseCalculator function
  const result = exerciseCalculator(daily_exercises, target);
  return res.json(result);
});

app.get('/bmi', (req, res) => {
    const error = {
        error: "malformatted parameters"
    };
    
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if ((!height || !weight) || (typeof height != 'number' || typeof weight != 'number')) {
        res.json(error);
    }

    const bmi = calculateBmi(height, weight);

    res.json({
        weight: weight,
        height: height,
        bmi: bmi
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});