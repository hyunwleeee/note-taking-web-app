import useAlert from '@hooks/useAlert';
import useModal from '@hooks/useModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import BaseInput from '@components/base/BaseInput';
import FlexBox from '@components/style/FlexBox';
import Header from '@components/ui/header/Header';
import ModalWrapper from '@components/ui/modal/ModalWrapper';

const TestModal = ({ onClose, onSubmit }) => {
  return (
    <ModalWrapper
      icon={<BaseIcon type="archive" />}
      title="Archive Note"
      sub="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

const TestDeleteModal = ({ onClose, onSubmit }) => {
  return (
    <ModalWrapper
      icon={<BaseIcon type="delete" />}
      title="Delete Note"
      sub="Are you sure you want to permanently delete this note? This action cannot be undone."
      onClose={onClose}
      onSubmit={onSubmit}
      isDangerous
    />
  );
};

const Test = () => {
  const [value, setValue] = useState('');
  const { openModal } = useModal();
  const alert = useAlert();

  const handleModal = () => {
    openModal(TestModal, {
      onSubmit: () => {
        console.log('delete');
      },
    });
  };

  const handleDeleteModal = () => {
    openModal(TestDeleteModal, {
      onSubmit: () => {
        console.log('create');
      },
    });
  };

  const handleAlert = () => {
    alert(
      <FlexBox style={{ width: '100%' }}>
        <span>123</span>
        <a href="https://www.naver.com">Archived Notes</a>
      </FlexBox>,
      'success'
    );
    alert('', 'success');
    alert('Note saved Successfully!', 'success');
  };
  return (
    <>
      <Header />
      <BaseButton texture="Create" onClick={handleModal} />
      <BaseButton isDangerous texture="Delete" onClick={handleDeleteModal} />
      <BaseButton texture="alert" onClick={handleAlert} />
      <BaseButton texture="Primary Button" />
      <BaseButton texture="Primary Button" disabled />
      <Link to="https://www.naver.com">naver</Link>
      <BaseButton theme="secondary" texture="Secondary Button" />
      <BaseButton theme="secondary" texture="Secondary Button" disabled />
      <BaseButton
        theme="border"
        leftIcon={<BaseIcon type="restore" />}
        texture="Border Button"
        rightIcon={<BaseIcon type="restore" />}
      />
      <BaseButton
        theme="border"
        disabled
        leftIcon={<BaseIcon type="restore" />}
        texture="Border Button"
      />
      <div>
        <BaseIcon type="archive" />
        <BaseIcon type="arrow-left" />
        <BaseIcon type="checkmark" />
        <BaseIcon type="chevron-right" />
        <BaseIcon type="clock" />

        <BaseIcon type="cross" />
        <BaseIcon type="delete" />
        <BaseIcon type="font-monospace" />
        <BaseIcon type="font-sans-serif" />
        <BaseIcon type="font-serif" />

        <BaseIcon type="font" />
        <BaseIcon type="google" />
        <BaseIcon type="hide-password" />
        <BaseIcon type="home" />
        <BaseIcon type="info" />

        <BaseIcon type="lock" />
        <BaseIcon type="logout" />
        <BaseIcon type="menu" />
        <BaseIcon type="moon" />
        <BaseIcon type="plus" />

        <BaseIcon type="restore" />
        <BaseIcon type="search" />
        <BaseIcon type="settings" />
        <BaseIcon type="show-password" />
        <BaseIcon type="status" />

        <BaseIcon type="sun" />
        <BaseIcon type="system-theme" />
        <BaseIcon type="tag" />
      </div>
      <h1>hyunwlee</h1>

      <BaseInput
        label="Change Label"
        leftIcon={<BaseIcon type="show-password" color={'#717784'} />}
        rightIcon={<BaseIcon type="show-password" color={'#717784'} />}
        placeholder="Placeholder text"
        description="This is a hint text to help user."
        value={value}
        onChange={setValue}
        onEnterDown={() => {
          console.log('value: ', value);
        }}
      />
      <BaseInput
        label="Change Label"
        leftIcon={<BaseIcon type="show-password" color={'#717784'} />}
        rightIcon={<BaseIcon type="show-password" color={'#717784'} />}
        placeholder="Placeholder text"
        description="This is a hint text to help user."
      />

      <BaseInput
        label="Change Label"
        leftIcon={<BaseIcon type="show-password" color={'#717784'} />}
        rightIcon={<BaseIcon type="show-password" color={'#717784'} />}
        placeholder="Placeholder text"
        description="This is a hint text to help user."
      />

      <BaseInput
        theme="disabled"
        label="Change Label"
        leftIcon={<BaseIcon type="show-password" color={'#717784'} />}
        rightIcon={<BaseIcon type="show-password" color={'#717784'} />}
        placeholder="Placeholder text"
        description="This is a hint text to help user."
      />

      <BaseInput
        theme="error"
        label="Change Label"
        leftIcon={<BaseIcon type="show-password" color={'#717784'} />}
        rightIcon={<BaseIcon type="show-password" color={'#717784'} />}
        placeholder="Placeholder text"
        description="This is a hint text to help user."
      />
    </>
  );
};

export default Test;
