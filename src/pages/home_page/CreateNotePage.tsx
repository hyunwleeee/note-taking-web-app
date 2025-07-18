import useFormState from '@hooks/useFormState';
import { useLayoutStore } from '@store/layoutStore';
import clsx from 'clsx';
import dayjs from 'dayjs';
import styled from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import BaseInput from '@components/base/BaseInput';
import BaseMultiSelect from '@components/base/BaseMultiSelect';
import BaseTextarea from '@components/base/BaseTextarea';
import FlexBox from '@components/style/FlexBox';
import { Note } from '@type/note';
import { useLabelStore } from '@store/labelStore';

function CreateNotePage() {
  const { deviceType } = useLayoutStore();
  const isLaptop = deviceType === 'laptop';
  const { formState, formDispatch } = useFormState<Note>({
    title: '',
    tags: [],
    content: '',
    isArchived: false,
  });

  const { labelList } = useLabelStore();

  return (
    <PageContainer>
      <div className="left_wrapper">
        <BaseInput
          value={formState.title}
          onChange={(value: string) => formDispatch({ type: 'title', value })}
          placeholder="Enter a title..."
        />
        <div className="information">
          <div className={clsx('label', 'stroke_icn')}>
            <FlexBox j="start" g="6px">
              <BaseIcon type="tag" size={16} />
              <span>Tags</span>
            </FlexBox>
          </div>
          <div className="value">
            <BaseMultiSelect
              isSearch
              value={formState.tags}
              onChange={(value) => formDispatch({ type: 'tags', value })}
              options={
                labelList?.map((label) => {
                  return { name: label.name, value: String(label.id) };
                }) || []
              }
            />
          </div>

          <div className="label">
            <FlexBox j="start" g="6px">
              <BaseIcon type="clock" size={16} />
              <span>Last edited</span>
            </FlexBox>
          </div>
          <div className="value">
            {formState.lastEdited
              ? dayjs(formState.lastEdited).format('DD MMM YYYY')
              : 'Not yet saved'}
          </div>
        </div>
        <div className="content_wrapper">
          <BaseTextarea
            value={formState.content}
            onChange={(value: string) => formDispatch({ type: 'content', value })}
            placeholder="Start typing your note here"
          />
        </div>
      </div>
      {isLaptop && <div className="right_wrapper"></div>}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: calc(100 * var(--vh, vh));
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[300]};
  ${({ theme }) => theme.inner};

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
      svg path {
        fill: var(--theme-text-color);
      }
      &.stroke_icn {
        svg path {
          fill: transparent;
          stroke: var(--theme-text-color);
        }
      }
    }
    .value:last-child {
      color: var(--theme-text2-color);
    }
    margin-bottom: ${({ theme }) => theme.spacing[150]};
  }

  .left_wrapper {
    width: 100%;
    > div:first-child div {
      border: none;
      padding: 0;
      margin: ${({ theme }) => `${theme.spacing[150]} 0`};
      border-radius: 0;
      input {
        ${({ theme }) => theme.typography.textPreset1};
      }

      &:active,
      &:hover {
        background: transparent;
      }
    }

    > div:last-child textarea {
      border: none;
      padding: ${({ theme }) => `${theme.spacing[50]} 0`};
      border-radius: 0;
      &:active,
      &:hover {
        background: transparent;
      }
    }
  }

  .right_wrapper {
    display: flex;
    flex-direction: column;
    flex: 0 0 242px;
    gap: ${({ theme }) => theme.spacing[150]};
    border-left: 1px solid var(--theme-divider2-color);
    padding-left: ${({ theme }) => theme.spacing[200]};
    padding-top: ${({ theme }) => theme.spacing[300]};
  }

  .content_wrapper {
    height: calc(100% - 250px);
    white-space: pre-wrap;
    ${({ theme }) => theme.typography.textPreset5};
    color: var(--theme-text3-color);
    > div textarea {
      border: none;
    }
  }

  ${({ theme }) => theme.media.laptop`
    display: flex;
    height: calc(100 * var(--vh, 1vh) - 77px);
    padding-top: 0;
    .content_wrapper {
      height: calc(100% - 148px);
    }
  `}
`;

export default CreateNotePage;
