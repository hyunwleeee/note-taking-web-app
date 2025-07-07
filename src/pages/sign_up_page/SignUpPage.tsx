import useNavigation from '@hooks/useNavigation';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import BaseInput from '@components/base/BaseInput';
import clsx from 'clsx';

// import useAuth from '@hooks/useAuth.js';

function SignUpPage() {
  // const auth = useAuth();
  const { Navigate } = useNavigation();
  const refs = useRef({
    email: null,
    password: null,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
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
    } else handleSubmit(e);
  };

  useEffect(() => {
    refs.current.email.focus();
  }, []);

  return (
    <SignUpContainer>
      <h2>Create Your Account</h2>
      <p>Sign up to start organizing your notes and boost your productivity.</p>
      <SignUpFormContainer onSubmit={handleSubmit}>
        <BaseInput
          label="Email Address"
          name="email"
          placeholder="email@example.com"
          value={loginData.email}
          onChange={handleChange}
          onEnterDown={handleEnterInput}
          ref={(el) => (refs.current.email = el)}
        />
        <BaseInput
          type={isPwType ? 'text' : 'password'}
          label="Password"
          name="password"
          description="At least 8 characters"
          rightIcon={
            <BaseButton theme="ghost" onClick={() => setIsPwType((prev) => !prev)}>
              <BaseIcon type="show-password" className={clsx(isPwType && 'pw-type')} />
            </BaseButton>
          }
          value={loginData.password}
          onChange={handleChange}
          onEnterDown={handleEnterInput}
          ref={(el) => (refs.current.password = el)}
        />
        <BaseButton type="submit" texture="Sign up" size="full" />
        <div className="oauth_wrapper">
          <p>Or log in with</p>
          <BaseButton
            theme="border"
            leftIcon={<BaseIcon type="google" color={'#0E121B'} />}
            texture="Google"
            size="full"
          />
        </div>
        <div className="sign_up_wrapper">
          <span>Already have an account? </span>
          <BaseButton theme="ghost" onClick={() => Navigate.move('/login')}>
            Login
          </BaseButton>
        </div>
      </SignUpFormContainer>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  > h2 {
    ${({ theme }) => theme.typography.textPreset1};
    text-align: center;
    color: var(--theme-text-color);
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }
  > p {
    ${({ theme }) => theme.typography.textPreset5};
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral600};
    margin-bottom: ${({ theme }) => theme.spacing[400]};
  }
`;

const SignUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[200]};
  > div svg {
     stroke: transparent;
     path {
       fill: var(--theme-menu-text-color);
     }
     &.pw-type path {
       fill: var(--theme-text-color);
       stroke: var(--theme-text-color);
     }
   }
  .oauth_wrapper {
    text-align: center;
    border-top: 1px solid var(--theme-border-color);
    ${({ theme }) => theme.typography.textPreset6};
    color: ${({ theme }) => theme.colors.neutral600};
    > p {
      padding: ${({ theme }) => `${theme.spacing[300]} 0 ${theme.spacing[200]}`};
    }
  }
  .sign_up_wrapper {
    padding-top: ${({ theme }) => theme.spacing[200]};
    border-top: 1px solid var(--theme-border-color);
    text-align: center;
    > span {
      color: ${({ theme }) => theme.colors.neutral600};
    }
    > button {
      color: var(--theme-text-color);
      ${({ theme }) => theme.typography.textPreset5};
    }
  }
`;

export default SignUpPage;
