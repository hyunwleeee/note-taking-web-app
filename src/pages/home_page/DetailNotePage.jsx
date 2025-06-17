import { makeSlugByTitle } from '@utils/makeSlug';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';import { useLayoutStore } from '@store/layoutStore';
import PageController from '@components/ui/page/PageController';

import data from '/data.json';
import BaseButton from '@components/base/BaseButton';

function DetailNotePage() {
    const { deviceType } = useLayoutStore();
  const isLaptop = deviceType === 'laptop';
  const { slug } = useParams();
  const [note, setNote] = useState();

  useEffect(() => {
    const foundNote = data.notes.find((item) => makeSlugByTitle(item.title) === slug);
    setNote(foundNote);
  }, [slug]);

  if (!note) return;

  return (
    <PageContainer>
      <div className='left_wrapper'>
        <PageController />
      <h2>{note?.title}</h2>
      <div className="information">
        <div className="label">
          <FlexBox j="start" g="6px">
            <BaseIcon type="tag" size={16}/>
            <span>Tags</span>
          </FlexBox>
        </div>
        <div className="value">{note.tags.join(', ')}</div>

        <div className="label">
          <FlexBox j="start" g="6px">
            <BaseIcon type="clock" size={16}/>
            <span>Last edited</span>
          </FlexBox>
        </div>
        <div className="value">{dayjs(note.lastEdited).format('DD MMM YYYY')}</div>
      </div>
      <p>{note.content}</p>
      </div>
      {isLaptop && <div className='right_wrapper'>
      <BaseButton
        theme="border"
        leftIcon={<BaseIcon type="archive" />}
        texture="Archive Note"
      />
      <BaseButton
        theme="border"
        leftIcon={<BaseIcon type="delete" />}
        texture="Delete Note"
      />
      </div>}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: calc(100 * var(--vh, vh));
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${({theme}) => theme.spacing[300]};
  ${({ theme }) => theme.inner};

  > div h2 {
    ${({ theme }) => theme.typography.textPreset1};
    margin: ${({ theme }) => `${theme.spacing[200]} 0`};
  }
  .information {
    ${({ theme }) => theme.typography.textPreset6};
    display: grid;
    grid-template-columns: max-content 1fr;
    row-gap: ${({ theme }) => theme.spacing[50]};
    column-gap: ${({ theme }) => theme.spacing[50]};
    align-items: center;
    padding-bottom: ${({ theme }) => theme.spacing[150]};
    border-bottom: 1px solid var(--theme-divider2-color);
    .label {
      width: 115px;
      color: var(--theme-text2-color);   
    }
    .value:last-child {
      color: var(--theme-text2-color);      
    }
    margin-bottom: ${({theme}) => theme.spacing[150]};
  }

  > div p {
    white-space: pre-wrap;
    ${({theme}) => theme.typography.textPreset5};
    color: var(--theme-text3-color); 
  }

  .left_wrapper {
    width: 100%;
    padding-top: ${({theme}) => theme.spacing[100]};
  }

  .right_wrapper {
    display: flex;
    flex-direction: column;
    flex: 0 0 242px;
    gap: ${({theme}) => theme.spacing[150]};
    border-left: 1px solid var(--theme-divider2-color);
    padding-left: ${({theme}) => theme.spacing[200]};
    padding-top: ${({theme}) => theme.spacing[300]};
  }

  ${({ theme }) => theme.media.laptop`
      display: flex;
      height: calc(100 * var(--vh, 1vh) - 77px);
      padding-top: 0;
  `}
`;

export default DetailNotePage;
