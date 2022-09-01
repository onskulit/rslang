import React, { FC } from 'react';
import { LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import {
  AUTH_TUPE,
  MIN_PASSWORD_NUMBER,
} from '../../../../common/constants/auth';
import {
  AUTH_INPUT_PLACEHOLDER,
  BAD_FORM_MESSAGE,
  FORM_ITEM_NAMES,
} from '../../../../common/constants/form';
import { IFormAuthProps } from '../../../../common/types/auth';
import styles from '../../authorization.module.css';
import { performSignIn, userSignIn } from '../../common';

const LogInForm: FC<IFormAuthProps> = ({ setAuthType }) => {
  const { signIn, isSignInLoading, error } = performSignIn();

  return (
    <>
      {error && <h1 style={{ color: 'red' }}>Неверный e-mail или пароль</h1>}
      {isSignInLoading ? (
        <Spin />
      ) : (
        <Form
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={(data) => userSignIn(data, signIn)}
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
                  if (value.length >= MIN_PASSWORD_NUMBER) {
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
              войти
            </Button>
            Ещё не с нами? Тогда
            <button
              className={styles.authButton}
              onClick={() => setAuthType(AUTH_TUPE.signIn)}
            >
              зарегистрируйся
            </button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LogInForm;
