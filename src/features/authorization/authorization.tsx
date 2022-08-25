import React, { useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import {
  useCreateUserMutation,
  useSignInMutation,
} from '../../app/services/UserService';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import RegistrationForm from './components/registration/RegistrationForm';
import LogInForm from './components/login/LogInForm';
import { AUTH_TUPE } from '../../common/constants/auth';
import { Navigate, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Authorization = () => {
  const [authType, setAuthType] = useState(AUTH_TUPE.logIn);
  const { validate } = useAppSelector((state) => state.user);

  return validate ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div>
      {authType === AUTH_TUPE.logIn ? (
        <LogInForm setAuthType={setAuthType} />
      ) : (
        <RegistrationForm setAuthType={setAuthType} />
      )}
    </div>
  );
};

export default Authorization;
