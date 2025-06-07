import Logo from '@components/ui/header/Logo';
import FlexBox from '@components/style/FlexBox';
import styled from 'styled-components';
import clsx from 'clsx';

import useNavigation from '@hooks/useNavigation';
import BaseIcon from '@components/base/BaseIcon';

function Navigation() {
  const { Navigate } = useNavigation();
  const navList = [
    { name: 'all notes', path: '/', icon: 'home' },
    { name: 'archived', path: '/archived', icon: 'archive' },
  ];

  const tagList = [
    { name: 'Cooking' },
    { name: 'Dev' },
    { name: 'Fitness' },
    { name: 'Health' },
    { name: 'Personal' },
    { name: 'React' },
    { name: 'Recipes' },
    { name: 'Shopping' },
    { name: 'Travel' },
    { name: 'TypeScript' },
  ];



  const isActive = (path) => location.pathname === path;

  const handleMove = (path) => {
    Navigate.move(path);
  };

  return (
    <NavigationContainer>
      <FlexBox j='start' a='stretch' d='column' g='16px' className='logo_wrapper'>
        <Logo />
      </FlexBox>
      <nav>
        <ul className='nav_list'>
          {navList.map((item, idx) => (
            <li
              className={clsx(isActive(item.path) && 'active')}
              onClick={() => handleMove(item.path)}
              key={idx}
            >
              <FlexBox j='start' a='center' g='8px' style={{ height: '100%' }}>
                <BaseIcon type={item.icon} />
                {item.name}
              </FlexBox>
            </li>
          ))}
        </ul>
        <ul className='tag_list'>
          <h3>Tags</h3>
          {tagList.map((item, idx) => (
            <li key={`${item.name}_${idx}`}>
              <FlexBox j='start' a='center' g='8px' style={{ height: '100%' }}>
                <BaseIcon type='tag' />
                {item.name}
              </FlexBox>
            </li>
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
  box-shadow: ${({ theme }) => theme.shadow};

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
    
    > li {
      ${({ theme }) => theme.typography.textPreset4};
      height: 40px; 
      padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[150]}`};
      border-radius: ${({ theme }) => theme.radius[8]}};
      text-transform: capitalize;
    }
    li.active, li:hover  {
      background: ${({ theme }) => theme.colors.neutral100};
    }
  }

  .tag_list {
    h3 {
      color: ${({ theme }) => theme.colors.neutral500};
      height: 20px;
      padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[100]}`};
      margin-bottom: ${({ theme }) => theme.spacing[100]};
    }
    > li {
      ${({ theme }) => theme.typography.textPreset4};
      height: 40px; 
      padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[150]}`};
      border-radius: ${({ theme }) => theme.radius[8]}};
      text-transform: capitalize;
    }
    li.active, li:hover  {
      background: ${({ theme }) => theme.colors.neutral100};
    }
  }
`;
