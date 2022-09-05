import React, { FC } from 'react';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { useCreateUserMutation } from '../../../api/userSlice';
import { IFormAuthProps } from '../../../../common/types/auth';
import { AUTH_TUPE } from '../../../../common/constants/auth';
import { IUserInputData } from '../../../../common/types/user';
import { performSignIn, userSignIn } from '../../common';
import styles from '../../authorization.module.css';
import {
  AUTH_INPUT_PLACEHOLDER,
  BAD_FORM_MESSAGE,
  FORM_ITEM_NAMES,
  MIN_PASSWORD_SYMBOL,
} from '../../../../common/constants/form';
import Loader from '../../../../common/components/Loader';

const RegistrationForm: FC<IFormAuthProps> = ({ setAuthType }) => {
  const [createUser, { error: creationError, isLoading: isCreationLoading }] =
    useCreateUserMutation();
  const { signIn, isSignInLoading } = performSignIn();

  const authorizeUser = async (userInputData: IUserInputData) => {
    const creationData = await createUser(userInputData);
    if (creationData && !creationError) userSignIn(userInputData, signIn);
  };

  return (
    <>
      {isCreationLoading || isSignInLoading ? (
        <Loader />
      ) : (
        <>
          {creationError && (
            <h1 style={{ color: 'red' }}>
              Пользователь с таким e-mail уже существет
            </h1>
          )}
          <Form
            onFinish={(data: IUserInputData) => authorizeUser(data)}
            initialValues={{ remember: true }}
            scrollToFirstError
            style={{ marginTop: 20 }}
          >
            <Form.Item
              name={FORM_ITEM_NAMES.email}
              rules={[
                {
                  type: 'email',
                  message: BAD_FORM_MESSAGE.email.incorrect,
                },
                {
                  required: true,
                  message: BAD_FORM_MESSAGE.email.empty,
                },
              ]}
            >
              <Input
                prefix={<GoogleOutlined className="site-form-item-icon" />}
                placeholder={AUTH_INPUT_PLACEHOLDER.email}
              />
            </Form.Item>

            <Form.Item
              name={FORM_ITEM_NAMES.name}
              rules={[
                {
                  required: true,
                  message: BAD_FORM_MESSAGE.name.empty,
                  whitespace: true,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={AUTH_INPUT_PLACEHOLDER.name}
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
                    if (value.length >= MIN_PASSWORD_SYMBOL) {
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

            <Form.Item
              name={FORM_ITEM_NAMES.confirmPassword}
              dependencies={[FORM_ITEM_NAMES.password]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: BAD_FORM_MESSAGE.confirmPassword.empty,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue(FORM_ITEM_NAMES.password) === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(BAD_FORM_MESSAGE.confirmPassword.incorrect)
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={AUTH_INPUT_PLACEHOLDER.confirmPassword}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
              >
                зарегистрироваться
              </Button>
              Уже с нами?
              <button
                className={styles.authButton}
                onClick={() => setAuthType(AUTH_TUPE.logIn)}
              >
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
