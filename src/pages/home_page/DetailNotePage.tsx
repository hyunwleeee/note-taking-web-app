import useAlert from '@hooks/useAlert';
import useModal from '@hooks/useModal';
import { useLayoutStore } from '@store/layoutStore';
import { makeSlugByTitle } from '@utils/makeSlug';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';
import ModalWrapper from '@components/ui/modal/ModalWrapper';
import PageController from '@components/ui/page/PageController';
import { Note } from '@type/note';
import { ModalProps } from '@type/modal';
import data from '@assets/data';


function DetailNotePage() {
  const { deviceType } = useLayoutStore();
  const isLaptop = deviceType === 'laptop';
  const { slug } = useParams();
  const [note, setNote] = useState<Note>();
  const { openModal, closeModal } = useModal();

  const isArchived = true;

  useEffect(() => {
    const foundNote = data.notes.find((item) => makeSlugByTitle(item.title) === slug);
    setNote(foundNote);
  }, [slug]);

  if (!note) return;

  const handleModal = () => {
    openModal(ArchivedModal, {
      onClose: () => closeModal(ArchivedModal),
      onSubmit: () => {
        console.log('Archive Note');
      },
    });
  };

  const handleDeleteModal = () => {
    openModal(DeleteModal, {
      onClose: () => closeModal(DeleteModal),
      onSubmit: () => {
        console.log('Delete Note');
      },
    });
  };

  return (
    <PageContainer>
      <div className="left_wrapper">
        <PageController onArchiveModal={handleModal} onDeleteModal={handleDeleteModal} />
        <h2>{note?.title}</h2>
        <div className="information">
          <div className={clsx('label', 'stroke_icn')}>
            <FlexBox j="start" g="6px">
              <BaseIcon type="tag" size={16} />
              <span>Tags</span>
            </FlexBox>
          </div>
          <div className="value">{note.tags.join(', ')}</div>

          {isArchived && (
            <>
              <div className="label">
                <FlexBox j="start" g="6px">
                  <BaseIcon type="status" size={16} />
                  <span>Status</span>
                </FlexBox>
              </div>
              <div className="value">Archived</div>
            </>
          )}

          <div className="label">
            <FlexBox j="start" g="6px">
              <BaseIcon type="clock" size={16} />
              <span>Last edited</span>
            </FlexBox>
          </div>
          <div className="value">{dayjs(note.lastEdited).format('DD MMM YYYY')}</div>
        </div>
        <p>{note.content}</p>
      </div>
      {isLaptop && (
        <div className="right_wrapper">
          <BaseButton
            theme="border"
            leftIcon={<BaseIcon type="archive" />}
            texture="Archive Note"
            onClick={handleModal}
          />
          <BaseButton
            theme="border"
            leftIcon={<BaseIcon type="delete" />}
            texture="Delete Note"
            onClick={handleDeleteModal}
          />
        </div>
      )}
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

  > div p {
    white-space: pre-wrap;
    ${({ theme }) => theme.typography.textPreset5};
    color: var(--theme-text3-color);
  }

  .left_wrapper {
    width: 100%;
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

  ${({ theme }) => theme.media.laptop`
    display: flex;
    height: calc(100 * var(--vh, 1vh) - 77px);
    padding-top: 0;
  `}
`;

export default DetailNotePage;

function ArchivedModal({ onClose, onSubmit }: ModalProps) {
  const alert = useAlert();
  const handleSubmit = () => {
    onSubmit();
    alert('정상으로 보관되었습니다.', 'success');
    onClose();
  };
  return (
    <ModalWrapper
      icon={<BaseIcon type="archive" />}
      title="Archive Note"
      sub="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
      onClose={onClose}
      submitText="Archive Note"
      onSubmit={handleSubmit}
    />
  );
}


function DeleteModal({ onClose, onSubmit }: ModalProps) {
  const alert = useAlert();
  const handleSubmit = () => {
    onSubmit();
    alert('정상으로 삭제되었습니다.', 'success');
    onClose();
  };
  return (
    <ModalWrapper
      icon={<BaseIcon type="delete" />}
      title="Delete Note"
      sub="Are you sure you want to permanently delete this note? This action cannot be undone."
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Delete Note"
      isDangerous
    />
  );
}


