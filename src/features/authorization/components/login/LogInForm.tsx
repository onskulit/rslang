import { LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { changeValidation } from '../../../../app/reducers/userSlice';
import { useSignInMutation } from '../../../../app/services/UserService';
import { AUTH_TUPE } from '../../../../common/constants/auth';
import { IFormAuthProps } from '../../../../common/types/auth';
import { storage } from '../../../../utils/localStorage';

const LogInForm: FC<IFormAuthProps> = ({ setAuthType }) => {
  const userAuthData = storage.get('userAuthData');
  const [signIn, { data: userSignInData, error, isLoading }] =
    useSignInMutation();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof userSignInData !== 'undefined') {
      const jsonData = JSON.stringify(userSignInData);
      storage.set('userAuthData', jsonData);
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
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={(data) => signIn(data)}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Введите ваш email' }]}
          >
            <Input
              prefix={<GoogleOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Введите ваш пароль',
              },
              () => ({
                validator(_, value) {
                  if (value.length >= 8) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Пароль должен составлять 8 символов и больше ;)')
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="пароль"
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
