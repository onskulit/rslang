import Header from './pages/header/Header';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import Textbook from './features/textbook/Textbook';
import Statistics from './features/statistics/Statistics';
import { Layout } from 'antd';
import AppFooter from './pages/footer/Footer';
import GameMenu from './common/components/games/GameMenu';
import { GamesType } from './common/types/enums';
import Sprint from './features/sprint/Sprint';
import AudioСall from './features/audiocall/AudioСall';
import gamesInfo from './common/constants/gamesInfo';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 25px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/textbook" element={<Textbook />} />
          <Route
            path="/sprint"
            element={<GameMenu game={GamesType.sprint} />}
          />
          <Route
            path="/audiocall"
            element={<GameMenu game={GamesType.audiocall} />}
          />
          <Route path={gamesInfo[GamesType.sprint].path} element={<Sprint />} />
          <Route
            path={gamesInfo[GamesType.audiocall].path}
            element={<AudioСall />}
          />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
