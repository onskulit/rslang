import { GamesType } from './../types/enums';

interface GameInfo {
  name: string;
  description: string;
  path: string;
  pathWithMenu: string;
}

interface GamesInfo {
  [GamesType.sprint]: GameInfo;
  [GamesType.audition]: GameInfo;
}

const gamesInfo: GamesInfo = {
  [GamesType.sprint]: {
    name: 'Спринт',
    description: 'Учит быстро переводить на ваш родной язык.',
    path: '/sprint-game',
    pathWithMenu: '/sprint',
  },
  [GamesType.audition]: {
    name: 'Аудиовызов',
    description: 'Улучшает восприятие речи на слух.',
    path: '/audition-game',
    pathWithMenu: '/audition',
  },
};

export default gamesInfo;
