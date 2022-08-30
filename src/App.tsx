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
import Audition from './features/audition/Audition';
import gamesInfo from './common/constants/gamesInfo';
import Col from 'antd/es/grid/col';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content>
        <Col>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/textbook" element={<Textbook />} />
            <Route
              path="/sprint"
              element={<GameMenu game={GamesType.sprint} />}
            />
            <Route
              path="/audition"
              element={<GameMenu game={GamesType.audition} />}
            />
            <Route
              path={gamesInfo[GamesType.sprint].path}
              element={<Sprint />}
            />
            <Route
              path={gamesInfo[GamesType.audition].path}
              element={<Audition />}
            />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Col>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
