import { makeSlugByTitle } from '@utils/makeSlug';
import styled from 'styled-components';

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

  padding: ${({ theme }) => `${theme.spacing[250]} ${theme.spacing[200]} 0 ${theme.spacing[400]}`};
  border-right: 1px solid var(--theme-divider2-color);

  .logo_wrapper {
    height: 52px;
    display: flex;
    justify-content: center;
    > section {
      width: 100%;
    }
    margin-bottom: ${({ theme }) => theme.spacing[200]};
  }

  .top_list {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    gap: 4px;
    padding-bottom: ${({ theme }) => theme.spacing[100]};
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }
`;
