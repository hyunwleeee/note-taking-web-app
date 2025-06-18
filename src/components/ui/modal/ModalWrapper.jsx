import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styled, { keyframes } from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import FlexBox from '@components/style/FlexBox';

function ModalWrapper({
  icon,
  title,
  sub,
  onClose,
  onSubmit,
  cancelText = 'Cancel',
  submitText = 'Archive Note',
  isDangerous = false,
  children,
}) {
  return (
    <ModalContainer isOpen overlayClassName="modal_overlay" onRequestClose={onClose}>
      <header>
        {icon && <span className="icon_wrapper">{icon}</span>}
        <FlexBox a="start" d="column" g="6px">
          <h3>{title}</h3>
          <p>{sub}</p>
        </FlexBox>
      </header>
      <main>{children}</main>

      <footer>
        <FlexBox j="end" g={'16px'}>
          <BaseButton
            texture={cancelText}
            isDangerous={isDangerous}
            theme="secondary"
            onClick={onClose}
          />
          {onSubmit && (
            <BaseButton
              theme="primary"
              isDangerous={isDangerous}
              texture={submitText}
              label={cancelText}
              onClick={onSubmit}
            />
          )}
        </FlexBox>
      </footer>
    </ModalContainer>
  );
}

const fadeInMobile = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) rotateX(-30deg);
  }
  to {
    opacity: 1;
    transform: sacle(1) translateY(-50%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translate(-50%, -50%);
  }
  to {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);

  }
`;

const ModalContainer = styled(ReactModal)`
  all: unset;
  position: absolute;
  z-index: 10;
  left: 16px;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.white};
  animation: ${fadeInMobile} 0.2s ease-in-out forwards;
  border-radius: ${({ theme }) => theme.radius[8]};
  box-shadow: ${({ theme }) => theme.shadow};

  > header {
    display: flex;
    gap: 16px;
    padding: ${({ theme }) => theme.spacing[200]};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
    span {
      flex: 0 0 40px;
      height: 40px;
      background: ${({ theme }) => theme.colors.neutral100};
      border-radius: ${({ theme }) => theme.radius[8]};
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h3 {
      ${({ theme }) => theme.typography.textPreset3};
      color: ${({ theme }) => theme.colors.neutral950};
    }
    p {
      ${({ theme }) => theme.typography.textPreset5};
      color: ${({ theme }) => theme.colors.neutral600};
    }
  }

  > footer {
    padding: ${({ theme }) => `${theme.spacing[200]} ${theme.spacing[250]}`};
  }

  ${({ theme }) => theme.media.tablet`
    width: 440px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: ${fadeIn} 0.2s ease-in-out forwards;
  `}
`;

export default ModalWrapper;

ModalWrapper.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  sub: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  isDangerous: PropTypes.bool,
  children: PropTypes.node,
};
