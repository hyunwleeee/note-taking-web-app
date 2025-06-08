import Logo from '@components/ui/header/Logo';
import FlexBox from '@components/style/FlexBox';
import styled from 'styled-components';

import MenuItem from './MenuItem';

function Navigation() {
  const navList = [
    { name: 'all notes', path: '/', icon: 'home' },
    { name: 'archived', path: '/archived', icon: 'archive' },
  ];

  const tagList = [
    { name: 'Cooking', path: '/tags/Cooking' },
    { name: 'Dev', path: '/tags/Dev' },
    { name: 'Fitness', path: '/tags/Fitness' },
    { name: 'Health', path: '/tags/Health' },
    { name: 'Personal', path: '/tags/Personal' },
    { name: 'React', path: '/tags/React' },
    { name: 'Recipes', path: '/tags/Recipes' },
    { name: 'Shopping', path: '/tags/Shopping' },
    { name: 'Travel', path: '/tags/Travel' },
    { name: 'TypeScript', path: '/tags/TypeScript' },
  ];


  return (
    <NavigationContainer>
      <FlexBox j='start' a='stretch' d='column' g='16px' className='logo_wrapper'>
        <Logo />
      </FlexBox>
      <nav>
        <ul className='nav_list'>
          {navList.map((item, idx) => (
            <MenuItem
              key={idx}
              iconType={item.icon}
              name={item.name}
              path={item.path}
            />
          ))}
        </ul>
        <ul className='tag_list'>
          <h3>Tags</h3>
          {tagList.map((item, idx) => (
            <MenuItem
              key={`item_${idx}`}
              iconType='tag'
              name={item.name}
              path={item.path}
            />
          ))}
        </ul>
      </nav>
    </NavigationContainer >
  );
}

export default Navigation;

const NavigationContainer = styled.div`
  width: 272px; 
  padding: ${({ theme }) => `${theme.spacing[150]} ${theme.spacing[200]}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};

  .logo_wrapper {
    height: 52px;
    display: flex;
    justify-content: center;
    > section {
      width: 100%;
    }
    margin-bottom: ${({ theme }) => theme.spacing[200]};
  }

  .nav_list {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    gap: 4px; 
    padding-bottom: ${({ theme }) => theme.spacing[100]};
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }

  .tag_list {
    h3 {
      color: ${({ theme }) => theme.colors.neutral500};
      height: 20px;
      padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[100]}`};
      margin-bottom: ${({ theme }) => theme.spacing[100]};
    }
  }
`;
