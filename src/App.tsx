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
            element={
              <GameMenu game={GamesType.sprint}>
                <Sprint />
              </GameMenu>
            }
          />
          <Route
            path="/audiocall"
            element={
              <GameMenu game={GamesType.audiocall}>
                <AudioСall />
              </GameMenu>
            }
          />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
