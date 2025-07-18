import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import BaseInput from '@components/base/BaseInput';

function PageHeaderSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const blurFocus = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node))
        setIsFocused(false);
    };

    document.addEventListener('mousedown', blurFocus);

    return () => {
      document.removeEventListener('mousedown', blurFocus);
    };
  }, []);

  return (
    <HeaderSearchWrapper ref={wrapperRef} onClick={() => setIsFocused(true)} $open={isFocused}>
      <BaseInput
        leftIcon={<BaseIcon type="search" color={'#717784'} />}
        placeholder="Search by title, content, or tags..."
        value={searchValue}
        onChange={setSearchValue}
        onEnterDown={() => {
          console.log('value: ', searchValue);
        }}
      />
    </HeaderSearchWrapper>
  );
}

const HeaderSearchWrapper = styled.div<{ $open: boolean }>`
  width: ${({ $open }) => ($open ? '400px' : '300px')};
  transition: 0.2s ease-in;
`;

export default PageHeaderSearch;
