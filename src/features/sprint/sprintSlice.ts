import { SLICE_NAMES } from './../../common/constants/sliceNames';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../common/types/interfaces';
import shuffleFisherYates from '../../common/utils/shuffleFisherYates';

enum StreakColor {
  STEP_1 = 'grey',
  STEP_2 = 'yellow',
  STEP_3 = 'green',
  STEP_4 = 'purple',
}

interface SprintState {
  words: [IWord, string, boolean][];
  correctWords: IWord[];
  wrongWords: IWord[];
  currentWordPos: number;
  pointsForCorrectAnswer: number;
  totalScore: number;
  streak: number;
  streakMultiplicity: number;
  streakProgress: number;
  streakColor: StreakColor;
  secondsLeft: number;
  progressRoundPercent: number;
  isFinished: boolean;
  isStarted: boolean;
}

const INITIAL_STREAK = 0;
const INITIAL_TOTAL_SCORE = 0;
const INITIAL_CURRENT_WORD_POS = 0;
const INITIAL_STREAK_PROGRESS = 0;
const INITIAL_PROGRESS_SEC = 100;

const minPoints = 10;
const pointsMultiplier = 2;
const multiplicationSteps = 3;
const streakForMultiplication = 3;
const maxStreak = streakForMultiplication * multiplicationSteps;
const maxPoints = minPoints * pointsMultiplier ** multiplicationSteps;
const roundDuration = 60;

const countProgressRoundPercent = (secondsLeft: number) => {
  return (secondsLeft / roundDuration) * 100;
};

const countStreakProgress = (streak: number) => {
  return (streak / maxStreak) * 100;
};

const countMultiplicity = (streak: number) => {
  return pointsMultiplier ** Math.floor(streak / streakForMultiplication);
};

const updateStreakColor = (streak: number) => {
  if (streak < streakForMultiplication) return StreakColor.STEP_1;
  if (streak < streakForMultiplication * 2) return StreakColor.STEP_2;
  if (streak < streakForMultiplication * 3) return StreakColor.STEP_3;
  return StreakColor.STEP_4;
};

const initialState: SprintState = {
  words: [],
  correctWords: [],
  wrongWords: [],
  currentWordPos: INITIAL_CURRENT_WORD_POS,
  pointsForCorrectAnswer: minPoints,
  totalScore: INITIAL_TOTAL_SCORE,
  streak: INITIAL_STREAK,
  streakMultiplicity: countMultiplicity(INITIAL_STREAK),
  streakProgress: INITIAL_STREAK_PROGRESS,
  streakColor: StreakColor.STEP_1,
  secondsLeft: roundDuration,
  progressRoundPercent: INITIAL_PROGRESS_SEC,
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
      state.progressRoundPercent = countProgressRoundPercent(state.secondsLeft);
    },
    createPares(state, action: PayloadAction<IWord[]>) {
      const paresForGame: [IWord, string, boolean][] = [];

      for (let i = 0; i < action.payload.length; i++) {
        const word = action.payload[i];
        const randomPosition = Math.floor(
          Math.random() * action.payload.length
        );
        const translationForPare =
          Math.random() < 0.5
            ? word.wordTranslate
            : action.payload[randomPosition].wordTranslate;
        paresForGame.push([
          word,
          translationForPare,
          translationForPare === word.wordTranslate,
        ]);
      }
      state.words = shuffleFisherYates(paresForGame);
    },
    checkAnswer(state, action: PayloadAction<boolean>) {
      if (action.payload === state.words[state.currentWordPos][2]) {
        state.totalScore += state.pointsForCorrectAnswer;
        if (state.streak < maxStreak) {
          state.streak++;
          state.streakProgress = countStreakProgress(state.streak);
        }
        state.correctWords.push(state.words[state.currentWordPos][0]);
        if (
          state.pointsForCorrectAnswer < maxPoints &&
          state.streak % streakForMultiplication === 0
        ) {
          state.pointsForCorrectAnswer *= pointsMultiplier;
        }
      } else {
        state.streak = INITIAL_STREAK;
        state.streakProgress = INITIAL_STREAK_PROGRESS;
        state.pointsForCorrectAnswer = minPoints;
        state.wrongWords.push(state.words[state.currentWordPos][0]);
      }
      state.streakMultiplicity = countMultiplicity(state.streak);
      state.streakColor = updateStreakColor(state.streak);
      if (state.words.length - 1 === state.currentWordPos) {
        state.isFinished = true;
        state.isStarted = false;
      } else {
        state.currentWordPos++;
      }
    },
  },
});

export default sprintSlice.reducer;
