import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '../../common/types/interfaces';
import shuffleFisherYates from '../../common/utils/shuffleFisherYates';

interface SprintState {
  words: [string, string, boolean][];
  currentWord: number;
  pointsForCorrectAnswer: number;
  totalScore: number;
  streak: number;
  secondsLeft: number;
  isFinished: boolean;
  isStarted: boolean;
}

const minPoints = 10;
const pointsMultiplier = 2;
const multiplicationSteps = 3;
const streakForMultiplication = 3;
const maxPoints = minPoints * pointsMultiplier ** multiplicationSteps;
const roundDuration = 60;

const initialState: SprintState = {
  words: [],
  currentWord: 0,
  pointsForCorrectAnswer: minPoints,
  totalScore: 0,
  streak: 0,
  secondsLeft: roundDuration,
  isFinished: false,
  isStarted: false,
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    resetGame() {
      return initialState;
    },
    startGame(state) {
      state.isStarted = true;
    },
    decreaseTimer(state) {
      state.secondsLeft--;
      if (state.secondsLeft === 0) {
        state.isFinished = true;
        state.isStarted = false;
      }
    },
    createPares(state, action: PayloadAction<Word[]>) {
      state.words = [];
      const words: string[] = [];
      const wordsTranslation: string[] = [];
      action.payload.forEach((word) => {
        words.push(word.word);
        wordsTranslation.push(word.wordTranslate);
      });
      const shuffledTranslation = shuffleFisherYates(wordsTranslation);
      for (let i = 0; i < words.length; i++) {
        state.words.push([
          words[i],
          shuffledTranslation[i],
          shuffledTranslation[i] === wordsTranslation[i],
        ]);
      }
    },
    checkAnswer(state, action: PayloadAction<boolean>) {
      if (action.payload === state.words[state.currentWord][2]) {
        state.totalScore += state.pointsForCorrectAnswer;
        state.streak++;
        if (
          state.pointsForCorrectAnswer < maxPoints &&
          state.streak % streakForMultiplication === 0
        )
          state.pointsForCorrectAnswer *= pointsMultiplier;
      } else {
        state.streak = 0;
        state.pointsForCorrectAnswer = minPoints;
      }
      if (state.words.length - 1 === state.currentWord) {
        state.isFinished = true;
        state.isStarted = false;
      } else {
        state.currentWord++;
      }
    },
  },
});

export default sprintSlice.reducer;
