import PropTypes from 'prop-types';
import styled from 'styled-components';

function BaseTextarea({ name, value, placeholder, onChange, disabled = false, maxLength }) {
  const handleChange = (value) => {
    if (name) onChange(name, value);
    else onChange(value);
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

const Counter = styled.div`
  position: absolute;
  color: ${({ $err, theme }) => ($err ? theme.colors.red500 : theme.colors.neutral600)};
  right: ${({ theme }) => theme.spacing[150]};
  bottom: ${({ theme }) => theme.spacing[200]};
  ${({ theme }) => theme.typography.textPreset6};
`;

export default BaseTextarea;

BaseTextarea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};
