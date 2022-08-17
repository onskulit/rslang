/* import { Counter } from './features/counter/Counter'; */

import Header from './features/Header/Header';
import { Routes, Route } from 'react-router-dom';
import MainPage from './features/mainPage/MainPage';
import Textbook from './features/textbook/Textbook';
import Sprint from './features/sprint/Sprint';
import Audiocall from './features/audiocall/Audiocall';
import Statistics from './features/statistics/Statistics';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/sprint" element={<Sprint />} />
        <Route path="/audiocall" element={<Audiocall />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
