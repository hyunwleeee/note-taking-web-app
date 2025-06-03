import Logo from '@components/ui/header/Logo';
import BaseButton from '@components/base/BaseButton';

const Test = () => {
  return (
    <>
      <Logo />
      <BaseButton>
        Primary Button
      </BaseButton>
      <BaseButton
        theme='secondary'
      >
        Secondary Button
      </BaseButton>
      <BaseButton
        theme='border'
      >
        Border Button
      </BaseButton>
      <h1>hyunwlee</h1>
    </>
  );
}

export default Test;
