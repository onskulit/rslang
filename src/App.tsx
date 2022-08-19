import Header from './pages/header/Header';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import Textbook from './features/textbook/Textbook';
import Sprint from './features/sprint/Sprint';
import Audition from './pages/audition/Audition';
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
          <Route path="/audiocall" element={<Audition />} />
          {/* <Route exact path="/users/:userId" component={UserPage} /> */}
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
