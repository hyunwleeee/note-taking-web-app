import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

type OnChange =
  | ((value: string | number) => void)
  | Dispatch<SetStateAction<string | number>>
  | ((name: string, value: string | number) => void)


interface IBaseTextareaProps {
  name?: string;
  value: string;
  placeholder: string;
  onChange: OnChange;
  disabled?: boolean;
  maxLength?: number;
};

interface ICounterProps {
  $err: boolean;
}

function BaseTextarea({ name, value, placeholder, onChange, disabled = false, maxLength }: IBaseTextareaProps) {
  const handleChange = (value: string) => {
    if (name)
      (onChange as (name: string, value: string | number) => void)(name, value);
    else
      (onChange as (value: string | number) => void | Dispatch<SetStateAction<string | number>>)(value);
  };

  return (
    <TextareaContainer>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
      />
      {maxLength && (
        <Counter $err={value.length >= maxLength}>
          <em>{value ? value.length : '0'}</em> / {maxLength}
        </Counter>
      )}
    </TextareaContainer>
  );
}

const TextareaContainer = styled.div`
  position: relative;
  height: 100%;
  > textarea {
    border: none;
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid var(--theme-border-color);
    border-radius: ${({ theme }) => theme.radius[8]};
    padding: ${({ theme }) => `${theme.spacing[150]} ${theme.spacing[200]}`};
    ${({ theme }) => theme.typography.textPreset5};
    background: transparent;
    color: var(--theme-text-color);
    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral500};
    }
    &:hover {
      background: var(--theme-input-hover-color);
    }
    &:active {
      outline: ${({ theme }) => `2px solid ${theme.colors.neutral500}`};
      outline-offset: 2px;
    }
  }
`;

const Counter = styled.div<ICounterProps>`
  position: absolute;
  color: ${({ $err, theme }) => ($err ? theme.colors.red500 : theme.colors.neutral600)};
  right: ${({ theme }) => theme.spacing[150]};
  bottom: ${({ theme }) => theme.spacing[200]};
  ${({ theme }) => theme.typography.textPreset6};
`;

export default BaseTextarea;
