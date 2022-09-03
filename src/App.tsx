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
import Authorization from './features/authorization/authorization';
import { storage } from './utils/localStorage';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useGetUserByIdQuery } from './features/api/userSlice';
import { IUserAuthData } from './common/types/user';
import { changeValidation } from './features/user/userSlice';
import { STORAGE_KEY } from './common/constants/localStorage';
import { IAuth } from './common/types/auth';
import Loader from './common/components/Loader';
import { RootState } from './app/store';

const { Content } = Layout;

const checkToken = (): IAuth => {
  const { isSuccess, isFetching } = useGetUserByIdQuery();

  return { isFetching, isSuccess };
};

const checkAuth = (): IAuth => {
  const userData: IUserAuthData = JSON.parse(
    storage.get(STORAGE_KEY.userAuthData)
  );

  if (userData) {
    const { isFetching, isSuccess } = checkToken();
    return { isFetching, isSuccess };
  }

  return { isFetching: false, isSuccess: false };
};

function App() {
  const authResponse = checkAuth();
  const dispatch = useAppDispatch();

  const { isRunning } = useAppSelector((state: RootState) => state.gameStatus);

  useEffect(() => {
    dispatch(changeValidation(authResponse.isSuccess));
  }, [authResponse.isSuccess]);

  return (
    <>
      {authResponse.isFetching ? (
        <Loader />
      ) : (
        <Layout>
          {!isRunning && <Header />}
          <Content style={{ padding: '20px 25px' }}>
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
              <Route path="/authorization" element={<Authorization />} />
            </Routes>
          </Content>
          <AppFooter />
        </Layout>
      )}
    </>
  );
}

export default App;
