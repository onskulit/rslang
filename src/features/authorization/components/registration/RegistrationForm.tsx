import React, { FC, useEffect } from 'react';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {
  useCreateUserMutation,
  useSignInMutation,
} from '../../../../app/services/UserService';
import { IFormAuthProps } from '../../../../common/types/auth';
import { AUTH_TUPE, DATA_UNDERFINED } from '../../../../common/constants/auth';
import { storage } from '../../../../utils/localStorage';
import { changeValidation } from '../../../../app/reducers/userSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { IUserInputData } from '../../../../common/types/user';
import { STORAGE_KEY } from '../../../../common/constants/localStorage';
import {
  AUTH_INPUT_PLACEHOLDER,
  BAD_FORM_MESSAGE,
  FORM_ITEM_NAMES,
  MIN_PASSWORD_SYMBOL,
} from '../../../../common/constants/form';

const RegistrationForm: FC<IFormAuthProps> = ({ setAuthType }) => {
  const [createUser, { error: creationError, isLoading: isCreationLoading }] =
    useCreateUserMutation();
  const [signIn, { data: userSignInData, isLoading: isSignInLoading }] =
    useSignInMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof userSignInData !== DATA_UNDERFINED) {
      const jsonData = JSON.stringify(userSignInData);
      storage.set(STORAGE_KEY.userAuthData, jsonData);
      dispatch(changeValidation(true));
    }
  }, [userSignInData]);

  const authorizeUser = async (userInputData: IUserInputData) => {
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
            onFinish={(data: IUserInputData) => authorizeUser(data)}
            initialValues={{ remember: true }}
            scrollToFirstError
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
