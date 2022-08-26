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
import { useAppDispatch } from './app/hooks';
import {
  useGetUserByIdQuery,
  useRefreshTokenQuery,
} from './app/services/UserService';
import { IUserAuthData } from './common/types/user';
import { changeValidation } from './app/reducers/userSlice';
import { STORAGE_KEY } from './common/constants/localStorage';

const { Content } = Layout;

const refreshToken = (userData: IUserAuthData) => {
  const { data, isSuccess } = useRefreshTokenQuery({
    token: userData.refreshToken,
    userId: userData.userId,
  });

  if (isSuccess) {
    userData.token = data.token;
    userData.refreshToken = data.refreshToken;
    storage.set(STORAGE_KEY.userAuthData, JSON.stringify(userData));
  }
};

const checkToken = (userData: IUserAuthData) => {
  const { isSuccess, isFetching } = useGetUserByIdQuery({
    token: userData.token,
    userId: userData.userId,
  });

  if (isFetching) {
    return { isFetching: true, isSuccess: isSuccess };
  }

  return { isFetching: false, isSuccess: isSuccess };
};

const checkAuth = () => {
  const userData: IUserAuthData = JSON.parse(
    storage.get(STORAGE_KEY.userAuthData)
  );

  if (userData) {
    const response = checkToken(userData);
    return response;
  }
  return { isFetching: false, isSuccess: false };
};

function App() {
  // const userData: IUserAuthData = JSON.parse(
  //   storage.get(STORAGE_KEY.userAuthData)
  // );

  // refreshToken(userData);
  const authResponse = checkAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    authResponse.isSuccess
      ? dispatch(changeValidation(true))
      : dispatch(changeValidation(false));
  }, [authResponse]);

  return (
    <>
      {authResponse.isFetching ? (
        <h1>Loading...</h1>
      ) : (
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
