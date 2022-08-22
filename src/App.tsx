import Header from './pages/header/Header';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import Textbook from './features/textbook/Textbook';
import Sprint from './features/sprint/Sprint';
import AudioCall from './features/audiocall/AudioСall';
import Statistics from './features/statistics/Statistics';
import { Layout } from 'antd';
import AppFooter from './pages/footer/Footer';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 25px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/textbook" element={<Textbook />} />
          <Route path="/sprint" element={<Sprint />} />
          <Route path="/audiocall" element={<AudioCall />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
