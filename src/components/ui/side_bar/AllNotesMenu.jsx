import { makeSlugByTitle } from '@utils/makeSlug';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';

import MenuItem from './MenuItem';
import data from '/data.json';

function AllNotesMenu() {
  const changeToOptionList = (list) => {
    return list.map(({ title, tags, lastEdited }) => ({
      name: title,
      value: title,
      tags,
      lastEdited,
      path: '/notes/' + makeSlugByTitle(title),
    }));
  };

  const settingList = changeToOptionList(data.notes);

  return (
    <ul className="top_list">
      {settingList.map((item, idx) => (
        <MenuItem
          key={idx}
          type="note"
          iconType={item.icon}
          name={item.name}
          path={item.path}
          tags={item.tags}
          lastEdited={item.lastEdited}
        />
      ))}
    </ul>
  );
}

export default AllNotesMenu;

const AllNotesContainer = styled.div`
  width: 100%;
  height: 100%;

  .top_list {
    display: flex;
    flex-flow: column nowrap;
    gap: 4px;
  }

  ${({ theme }) => theme.inner};
  padding-top: 0;

  .button_wrapper {
    position: fixed;
    bottom: 72px;
    right: 16px;
    > button {
      width: 48px;
      height: 48px;
      border-radius: ${({ theme }) => theme.radius.full};
      text-align: center;
      padding: 0;
      svg {
        width: 32px;
      }
    }
  }

  ${({ theme }) => theme.media.tablet`
    height: calc(100% - 74px);
    padding-top: 0;
    .button_wrapper {
      position: fixed;
      bottom: 106px;
      right: 36px;
      > button {
        width: 64px;
        height: 64px;
        text-align: center;
        padding: 0;
        svg {
          width: 32px;
        }
      }
    }
  `}

  ${({ theme }) => theme.media.laptop`
    padding: 0;
     width: 290px;
    height: calc(100% - 80px);
    .button_wrapper {
      position: sticky;
      top: 0;
       padding: ${({ theme }) =>
      `${theme.spacing[250]} ${theme.spacing[200]} ${theme.spacing[200]} ${theme.spacing[400]}`};
      display: inline-block;
      width: 100%;
      position: sticky;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      > button {
        width: 100%;
        height: 40px;
        border-radius: ${({ theme }) => theme.radius[8]};
      }
    }
    .top_list {
      padding: ${({ theme }) =>
      `${theme.spacing[0]} ${theme.spacing[200]} ${theme.spacing[200]} ${theme.spacing[400]}`};
      display: flex;
      flex-flow: column nowrap;
      gap: 4px;
    }
  `}
}
`;
