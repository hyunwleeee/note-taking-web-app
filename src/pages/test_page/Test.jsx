import { useState } from 'react';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import BaseInput from '@components/base/BaseInput';
import Header from '@components/ui/header/Header';

const Test = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Header />
      <BaseButton texture="Primary Button" />
      <BaseButton texture="Primary Button" disabled />
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
