import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';

import BaseInput from '@components/base/BaseInput';
// import useAuth from '@hooks/useAuth.js';

function LoginPage() {
  // const auth = useAuth();
  const refs = useRef({
    email: null,
    password: null
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [isPwType, setIsPwType] = useState(false);

  const handleChange = (name, value) => {
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await auth.login(loginData);
  };

  const handleEnterInput = (e, name) => {
    if (e.key !== 'Enter') return;
    if (name === 'email') {
      e.preventDefault();
      refs.current.password.focus();
    }
    else
      handleSubmit(e);
  }

  /* 전체 프로젝트에 우 클릭 막음 */
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    refs.current.email.focus();
  }, [])

  return (
    <LoginContainer>
      <h2>Welcome to Note</h2>
      <p>Please log in to continue</p>
      <LoginFormContainer onSubmit={handleSubmit}>
          <BaseInput
            label="Email Address"
            name='email'
            placeholder="email@example.com"
            value={loginData.email}
            onChange={handleChange}
            onEnterDown={handleEnterInput}
            ref={el => refs.current.email = el}
          />
          <div className='password_wrapper'>
            <BaseButton theme='ghost'>
              Forgot
            </BaseButton>
            <BaseInput
              type={isPwType ? 'text' : 'password'}
              label="Password"
              name='password'
              rightIcon={
                <BaseButton
                  theme='ghost'
                  onClick={() => setIsPwType((prev) => !prev)}
                >
                <BaseIcon
                  type="show-password"
                  color={isPwType ? '#0E121B': '#717784'}
                />
                </BaseButton>
              }
              value={loginData.password}
              onChange={handleChange}
              onEnterDown={handleEnterInput}
              ref={el => refs.current.password = el}
            />
          </div>
          <BaseButton 
            texture="Login"
            size='full'
            onClick={() => {}}
          />
          <div className='oauth_wrapper'>
            <p>Or log in with</p>
          <BaseButton
            theme='border'
            leftIcon={<BaseIcon type="google" color={'#0E121B'} />}
            texture="Google"
            size='full'
          />
        </div>
        <div className='sign_up_wrapper'>
          <span>No account yet? </span>
          <BaseButton theme='ghost'>Sign Up</BaseButton>
        </div>
      </LoginFormContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.section`
  > h2 {
    ${({ theme }) => theme.typography.textPreset1};
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral950};
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }
  > p {
    ${({ theme }) => theme.typography.textPreset5};
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral600};
    margin-bottom: ${({ theme }) => theme.spacing[200]};
  }
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[200]};
  .password_wrapper {
    position: relative;
    > button {
      position: absolute;
      right: 0;
      text-decoration: underline;
      text-decoration-color : ${({ theme }) => theme.colors.neutral600};
      text-underline-offset: ${({ theme }) => theme.spacing[50]};
    }
  }
  .oauth_wrapper {
    text-align: center;
    border-top: ${({theme}) => `1px solid ${theme.colors.neutral200}`};
    ${({ theme }) => theme.typography.textPreset6};
    color: ${({ theme }) => theme.colors.neutral600};
    > p {
        padding: ${({ theme }) => `${theme.spacing[300]} 0 ${theme.spacing[200]}`};
    }
  }
  .sign_up_wrapper {
    padding-top: ${({ theme }) => theme.spacing[200]};
    border-top: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
    text-align: center;
    > span {
      color: ${({ theme }) => theme.colors.neutral600};
    }
    > button {
      color: ${({ theme }) => theme.colors.neutral950};
      ${({ theme }) => theme.typography.textPreset5};
    }
  }
`;

export default LoginPage;
