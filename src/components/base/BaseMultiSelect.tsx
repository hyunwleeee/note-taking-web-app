import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import BaseCheckBoxGroup from '@components/base/BaseCheckBoxGroup';
import BaseIcon from '@components/base/BaseIcon';

import BaseCheckBox from './BaseCheckBox';
import BaseInput from './BaseInput';

type SelectLocation = {
  left: number;
  top: number | 'unset';
  bottom: number | 'unset';
}

interface IBaseMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: { name: string, value: string }[];
  isSearch: boolean;
  style: CSSProperties;
  selectStyle: CSSProperties;
};

interface IMultiSelectWrapperProps {
  $open: boolean;
}

const variants = {
  initial: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: 'top',
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    transformOrigin: 'top',
    transition: {
      type: 'spring',
      duration: 0.2,
      bounce: 0,
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: 'top',
  },
};

const BaseMultiSelect = ({ value = [], onChange, options, isSearch, style, selectStyle }: IBaseMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredList, setFilteredList] = useState(options);
  const [selectLocation, setSelectLocation] = useState<SelectLocation>({ left: 0, top: 0, bottom: 0 });
  const [isAllChecked, setIsAllChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickSelector = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAllClick = () => {
    if (!isAllChecked) onChange(options.map((option) => option.value));
    else onChange([]);
    setIsAllChecked((prev) => !prev);
  };

  useEffect(() => {
    const arr = options.filter((option) => value.includes(option.value)).map((item) => item.name);
    setText(arr.join(', '));
    setIsAllChecked(options.length === arr.length);
  }, [value, options]);

  useEffect(() => {
    if (!searchValue) {
      setFilteredList(options);
    } else {
      const arr = options.filter((option) =>
        option.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredList(arr);
    }
  }, [searchValue, options]);

  useEffect(() => {
    const blurFocus = (e: MouseEvent) => {
      if (!selectRef.current || !inputRef.current) return;

      const target = e.target as Node;

      if (!selectRef.current.contains(target) && !inputRef.current.contains(target))
        setIsOpen(false);
    };

    document.addEventListener('mousedown', blurFocus);

    return () => {
      document.removeEventListener('mousedown', blurFocus);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !selectContainerRef.current) return;

    const rect = selectContainerRef.current.getBoundingClientRect();

    /* 문서 전체 높이 */
    const pageHeight = document.documentElement.scrollHeight;
    /* 해당 node top + 현재 스크롤 위치 */
    const elementTop = rect.top + window.scrollY;
    const thredhold = pageHeight * 0.75;

    const left = rect.left;

    if (elementTop > thredhold) {
      setSelectLocation({
        left,
        top: 'unset',
        bottom: -(elementTop - pageHeight - 8),
      });
    } else {
      setSelectLocation({
        left,
        top: rect.top + rect.height + 8,
        bottom: 'unset',
      });
    }
  }, [isOpen]);

  return (
    <MultiSelectWrapper $open={isOpen} style={style}>
      <div className="select_container" ref={selectContainerRef} style={selectStyle}>
        <div className="select_input" ref={inputRef} onClick={handleClickSelector}>
          <p>{text || <span>Please select options...</span>}</p>
          <BaseIcon type="chevron-right" />
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <ToggleContainer
              initial="initial"
              animate="animate"
              variants={variants}
              ref={selectRef}
              style={{
                left: selectLocation.left,
                top: selectLocation.top,
                bottom: selectLocation.bottom,
              }}
            >
              {isSearch && (
                <div className="search_wrapper">
                  <BaseInput
                    placeholder="Enter a search..."
                    value={searchValue}
                    onChange={setSearchValue}
                  />
                </div>
              )}
              {!searchValue && options.length > 0 && (
                <div className="all_check_wrapper">
                  <BaseCheckBox name={'ALL'} checked={isAllChecked} onChange={handleAllClick} />
                </div>
              )}
              {<BaseCheckBoxGroup value={value} onChange={onChange} options={filteredList} />}
            </ToggleContainer>
          )}
        </AnimatePresence>,
        document.getElementById('select-root')!
      )}
    </MultiSelectWrapper>
  );
};

const MultiSelectWrapper = styled.div<IMultiSelectWrapperProps>`
  .select_container {
    .select_input {
      border: 1px solid var(--theme-border-color);
      border-radius: ${({ theme }) => theme.radius[8]};
      display: flex;
      padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[200]}`};
      height: 32px;
      align-items: center;
      justify-content: space-between;
      > svg {
        transform: ${({ $open }) => ($open ? 'rotate(270deg)' : 'rotate(90deg)')};
        path {
          fill: var(--theme-text-color);
        }
      }
      p span {
        color: var(--theme-text2-color);
      }
    }
  }
`;

const ToggleContainer = styled(motion.div)`
  position: absolute;
  background: var(--theme-bg-color);
  border-radius: ${({ theme }) => theme.radius[8]};
  border: 1px solid var(--theme-border-color);
  padding: ${({ theme }) => theme.spacing[200]};

  .search_wrapper {
    > div {
      height: 32px;
    }
    margin-bottom: ${({ theme }) => theme.spacing[150]};
  }

  .all_check_wrapper {
    padding-bottom: ${({ theme }) => theme.spacing[50]};
  }

  > ul {
    border-top: 1px solid var(--theme-border-color);
    padding-top: ${({ theme }) => theme.spacing[100]};
    flex-flow: column wrap;
    row-gap: ${({ theme }) => theme.spacing[50]};
  }
`;

export default BaseMultiSelect;
