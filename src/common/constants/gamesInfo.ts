import { GamesType } from './../types/enums';

interface GameInfo {
  name: string;
  description: string;
  path: string;
}

interface GamesInfo {
  [GamesType.sprint]: GameInfo;
  [GamesType.audiocall]: GameInfo;
}

const gamesInfo: GamesInfo = {
  [GamesType.sprint]: {
    name: 'Спринт',
    description: 'Учит быстро переводить на ваш родной язык.', // Для этой тренировки используются слова из вашего словаря.
    path: '/sprint',
  },
  [GamesType.audiocall]: {
    name: 'Аудиовызов',
    description: 'Улучшает восприятие речи на слух.',
    path: '/audiocall',
  },
};

export default gamesInfo;
