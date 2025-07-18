import useNavigation from '@hooks/useNavigation';
import { FormEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import BaseInput from '@components/base/BaseInput';
import clsx from 'clsx';
import { login, loginWithGithub, loginWithGoogle } from '@firebase_/auth';
import { useAuthStore } from '@store/authStore';
import { type Role } from '@firebase_/role';
import useAlert from '@hooks/useAlert';
import { APIError } from '@type/errors/api-error';

function LoginPage() {
  const { move } = useNavigation();
  const alert = useAlert();
  const refs = useRef<{
    email: HTMLInputElement | null;
    password: HTMLInputElement | null;
  }>({
    email: null,
    password: null,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isPwType, setIsPwType] = useState(false);

  const { setUser } = useAuthStore();

  const handleChange: (name: string, value: string | number) => void = (name, value) => {
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitLogin = async () => {
    try {
      const { user, role } = await login(loginData.email, loginData.password);
      setUser(user, role);
      move('/');
    } catch (error) {
      if (error instanceof APIError) {
        alert(error.message, 'error');
      } else {
        alert('알 수 없는 오류가 발생헀습니다.', 'error');
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitLogin();
  };


  const handleEnterInput = (e: KeyboardEvent<HTMLInputElement>, name: string) => {
    if (e.key !== 'Enter') return;
    if (name === 'email') {
      e.preventDefault();
      refs.current.password?.focus();
    } else {
      e.preventDefault();
      submitLogin();
    }
  };

  const handleGithubLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { user, role } = await loginWithGithub();
      useAuthStore.getState().setUser(user, role as Role);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleGoogleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { user, role } = await loginWithGoogle();
      useAuthStore.getState().setUser(user, role as Role);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /* 전체 프로젝트에 우 클릭 막음 */
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    refs.current.email?.focus();
  }, []);

  return (
    <LoginContainer>
      <h2>Welcome to Note</h2>
      <p>Please log in to continue</p>
      <LoginFormContainer onSubmit={handleSubmit}>
        <BaseInput
          label="Email Address"
          name="email"
          placeholder="email@example.com"
          value={loginData.email}
          onChange={(name: string, value: string) => handleChange(name, value)}
          onEnterDown={handleEnterInput}
          ref={(el) => (refs.current.email = el)}
        />
        <div className="password_wrapper">
          <BaseButton theme="ghost" onClick={() => move('/forgot-password-page')}>
            Forgot
          </BaseButton>
          <BaseInput
            type={isPwType ? 'text' : 'password'}
            label="Password"
            name="password"
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
        </div>
        <BaseButton type="submit" texture="Login" size="full" />
        <div className="oauth_wrapper">
          <p>Or log in with</p>
          <BaseButton
            theme="border"
            leftIcon={<BaseIcon type="github" />}
            texture="Github"
            size="full"
            onClick={(e) => handleGithubLogin(e)}
          />
          <BaseButton
            theme="border"
            leftIcon={<BaseIcon type="google" />}
            texture="Google"
            size="full"
            onClick={(e) => handleGoogleLogin(e)}
          />
        </div>
        <div className="sign_up_wrapper">
          <span>No account yet? </span>
          <BaseButton type='button' theme="ghost" onClick={() => move('/sign-up')}>
            Sign Up
          </BaseButton>
        </div>
      </LoginFormContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.section`
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

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[200]};
  .password_wrapper {
    position: relative;
    > button {
      position: absolute;
      top: -${({ theme }) => `${theme.spacing[75]}`};
      right: 0;
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.colors.neutral600};
      text-underline-offset: ${({ theme }) => theme.spacing[50]};
    }
    div svg {
      stroke: transparent;
      path {
        fill: var(--theme-menu-text-color);
      }
      &.pw-type path {
        fill: var(--theme-text-color);
        stroke: var(--theme-text-color);
      }
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
    > button:first-of-type {
      margin-bottom: ${({ theme }) => theme.spacing[100]};
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

export default LoginPage;
