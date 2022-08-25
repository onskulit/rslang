import React, { FC, useEffect, useState } from 'react';
import { LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useAppDispatch } from '../../../../app/hooks';
import { changeValidation } from '../../../../app/reducers/userSlice';
import { useSignInMutation } from '../../../../app/services/UserService';
import { AUTH_TUPE, DATA_UNDERFINED } from '../../../../common/constants/auth';
import {
  AUTH_INPUT_PLACEHOLDER,
  BAD_FORM_MESSAGE,
  FORM_ITEM_NAMES,
} from '../../../../common/constants/form';
import { STORAGE_KEY } from '../../../../common/constants/localStorage';
import { IFormAuthProps } from '../../../../common/types/auth';
import { storage } from '../../../../utils/localStorage';

const LogInForm: FC<IFormAuthProps> = ({ setAuthType }) => {
  const userAuthData = storage.get(STORAGE_KEY.userAuthData);
  const [signIn, { data: userSignInData, error, isLoading }] =
    useSignInMutation();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof userSignInData !== DATA_UNDERFINED) {
      const jsonData = JSON.stringify(userSignInData);
      storage.set(STORAGE_KEY.userAuthData, jsonData);
      dispatch(changeValidation(true));
    }
  }, [userSignInData]);

  return (
    <>
      {error && <h1 style={{ color: 'red' }}>Неверный e-mail или пароль</h1>}
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <Form
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={(data) => signIn(data)}
        >
          <Form.Item
            name={FORM_ITEM_NAMES.email}
            rules={[{ required: true, message: BAD_FORM_MESSAGE.email.empty }]}
          >
            <Input
              prefix={<GoogleOutlined className="site-form-item-icon" />}
              placeholder={AUTH_INPUT_PLACEHOLDER.email}
            />
          </Form.Item>

          <Form.Item
            name={FORM_ITEM_NAMES.password}
            rules={[
              {
                required: true,
                message: BAD_FORM_MESSAGE.password.empty,
              },
              () => ({
                validator(_, value) {
                  if (value.length >= 8) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(BAD_FORM_MESSAGE.password.incorrect)
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={AUTH_INPUT_PLACEHOLDER.password}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%' }}
            >
              Log in
            </Button>
            Ещё не с нами? Тогда
            <button onClick={() => setAuthType(AUTH_TUPE.signIn)}>
              зарегистрируйся
            </button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LogInForm;
