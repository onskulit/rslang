/* import { Counter } from './features/counter/Counter'; */

import Header from './features/header/Header';
import { Routes, Route } from 'react-router-dom';
import MainPage from './features/mainPage/MainPage';
import Textbook from './features/textbook/Textbook';
import Sprint from './features/sprint/Sprint';
import Audiocall from './features/audiocall/Audiocall';
import Statistics from './features/statistics/Statistics';
import { Layout } from 'antd';

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
          <Route path="/audiocall" element={<Audiocall />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
