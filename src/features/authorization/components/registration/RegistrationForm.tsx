import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import React, { FC, useEffect } from 'react';
import {
  useCreateUserMutation,
  useSignInMutation,
} from '../../../../app/services/UserService';
import { IFormAuthProps, IUserData } from '../../../../common/types/auth';
import { AUTH_TUPE } from '../../../../common/constants/auth';
import { storage } from '../../../../utils/localStorage';
import { changeValidation } from '../../../../app/reducers/userSlice';
import { useAppDispatch } from '../../../../app/hooks';

const RegistrationForm: FC<IFormAuthProps> = ({ setAuthType }) => {
  const [createUser, { error: creationError, isLoading: isCreationLoading }] =
    useCreateUserMutation();
  const [signIn, { data: userSignInData, isLoading: isSignInLoading }] =
    useSignInMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof userSignInData !== 'undefined') {
      const jsonData = JSON.stringify(userSignInData);
      storage.set('userAuthData', jsonData);
      dispatch(changeValidation(true));
      console.log(userSignInData);
    }
  }, [userSignInData]);

  const authorizeUser = async (userInputData: IUserData) => {
    const creationData = await createUser(userInputData);
    if (creationData && !creationError) signIn(userInputData);
  };

  return (
    <>
      {isCreationLoading || isSignInLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {creationError && (
            <h1 style={{ color: 'red' }}>
              Пользователь с таким e-mail уже существет
            </h1>
          )}
          <Form
            name="register"
            onFinish={(data: IUserData) => authorizeUser(data)}
            initialValues={{ remember: true }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'TВы ввели невалидный E-mail!',
                },
                {
                  required: true,
                  message: 'Введите E-mail!',
                },
              ]}
            >
              <Input
                prefix={<GoogleOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите ваш nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="nickname"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите ваш пароль!',
                },
                () => ({
                  validator(_, value) {
                    if (value.length >= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Пароль должен составлять 8 символов и больше ;)'
                      )
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

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста подтвердите пароль!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Пароль не соответствует!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="подтвердите пароль"
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
              Уже с нами?
              <button onClick={() => setAuthType(AUTH_TUPE.logIn)}>
                Да, войти!
              </button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default RegistrationForm;
