import { makeSlugByTitle } from '@utils/makeSlug';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';

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
    <AllNotesContainer>
      <div className="button_wrapper">
        <BaseButton texture="+ Create New Note" size="full" onClick={() => {}} />
      </div>
      <nav>
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
      </nav>
    </AllNotesContainer>
  );
}

export default AllNotesMenu;

const AllNotesContainer = styled.div`
  min-width: 290px;
  height: calc(100% - 80px);
  overflow-y: auto;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  border-right: 1px solid var(--theme-divider2-color);

  .top_list {
    margin: ${({ theme }) => `0 ${theme.spacing[200]} 0 ${theme.spacing[400]}`};
    display: flex;
    flex-flow: column nowrap;
    gap: 4px;
    padding-bottom: ${({ theme }) => theme.spacing[100]};
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }

  .button_wrapper {
    position: sticky;
    top: 0;
    background: var(--theme-shdaow-color);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    padding: ${({ theme }) =>
      `${theme.spacing[250]} ${theme.spacing[200]} ${theme.spacing[200]} ${theme.spacing[400]}`};
    }
}
`;
