import { SLICE_NAMES } from './../../common/constants/sliceNames';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../common/types/interfaces';
import shuffleFisherYates from '../../common/utils/shuffleFisherYates';

interface SprintState {
  words: [IWord, string, boolean][];
  correctWords: IWord[];
  wrongWords: IWord[];
  currentWord: number;
  pointsForCorrectAnswer: number;
  totalScore: number;
  streak: number;
  streakMultiplicity: number;
  secondsLeft: number;
  progressSec: number;
  isFinished: boolean;
  isStarted: boolean;
}

const minPoints = 10;
const pointsMultiplier = 2;
const multiplicationSteps = 3;
const streakForMultiplication = 3;
const maxPoints = minPoints * pointsMultiplier ** multiplicationSteps;
const roundDuration = 60;

const countProgressSec = (secondsLeft: number) => {
  return (secondsLeft / roundDuration) * 100;
};

const initialState: SprintState = {
  words: [],
  correctWords: [],
  wrongWords: [],
  currentWord: 0,
  pointsForCorrectAnswer: minPoints,
  totalScore: 0,
  streak: 0,
  streakMultiplicity: 1,
  secondsLeft: roundDuration,
  progressSec: 100,
  isFinished: false,
  isStarted: false,
};

export const sprintSlice = createSlice({
  name: SLICE_NAMES.sprint,
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
      state.progressSec = countProgressSec(state.secondsLeft);
    },
    createPares(state, action: PayloadAction<IWord[]>) {
      const wordsTranslation: string[] = [];
      action.payload.forEach((word) => {
        wordsTranslation.push(word.wordTranslate);
      });
      const shuffledTranslation = shuffleFisherYates(wordsTranslation);
      const finalTranslation: string[] = [];
      for (let i = 0; i < wordsTranslation.length; i++) {
        finalTranslation.push(
          Math.random() < 0.5 ? wordsTranslation[i] : shuffledTranslation[i]
        );
      }
      const finalWords: [IWord, string, boolean][] = [];
      for (let i = 0; i < action.payload.length; i++) {
        finalWords.push([
          action.payload[i],
          finalTranslation[i],
          finalTranslation[i] === wordsTranslation[i],
        ]);
      }
      state.words = shuffleFisherYates(finalWords);
    },
    checkAnswer(state, action: PayloadAction<boolean>) {
      if (action.payload === state.words[state.currentWord][2]) {
        state.totalScore += state.pointsForCorrectAnswer;
        state.streak++;
        state.correctWords.push(state.words[state.currentWord][0]);
        if (
          state.pointsForCorrectAnswer < maxPoints &&
          state.streak % streakForMultiplication === 0
        ) {
          state.streakMultiplicity =
            pointsMultiplier ** (state.streak / streakForMultiplication);
          state.pointsForCorrectAnswer *= pointsMultiplier;
        }
      } else {
        state.streak = 0;
        state.streakMultiplicity = 1;
        state.pointsForCorrectAnswer = minPoints;
        state.wrongWords.push(state.words[state.currentWord][0]);
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
