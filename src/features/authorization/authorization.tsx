import React, { useState } from 'react';
import RegistrationForm from './components/registration/RegistrationForm';
import LogInForm from './components/login/LogInForm';
import { AUTH_TUPE } from '../../common/constants/auth';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import styles from './authorization.module.css';

const Authorization = () => {
  const [authType, setAuthType] = useState(AUTH_TUPE.logIn);
  const { validate } = useAppSelector((state) => state.user);

  return validate ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className={styles.auth}>
      {authType === AUTH_TUPE.logIn ? (
        <LogInForm setAuthType={setAuthType} />
      ) : (
        <RegistrationForm setAuthType={setAuthType} />
      )}
    </div>
  );
};

export default Authorization;
