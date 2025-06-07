import Header from '@components/ui/header/Header';
import { useLayoutEffect, Suspense } from 'react';
import MenuBar from '@components/ui/menu_bar/MenuBar';
import TransitionComponent from '@components/animation/TransitionWrapper';
import { useLayoutStore } from '@store/layoutStore.js';
import { BREAK_POINTS } from '@assets/styles/media';
import PageLayout from './PageLayout';

function SiteLayout() {
  const { setDeviceType } = useLayoutStore();

  //반응형 vh설정
  useLayoutEffect(() => {
    const setVh = () => {
      if (window.innerWidth <= BREAK_POINTS.tablet)
        setDeviceType('mobile');
      else if (window.innerWidth <= BREAK_POINTS.laptop)
        setDeviceType('tablet');
      else
        setDeviceType('laptop');

      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <>
      <Header />
      <Suspense fallback={<div>loading...</div>}>
        <PageLayout>
          <TransitionComponent />
        </PageLayout>
      </Suspense>
      <MenuBar />
    </>
  );
}


export default SiteLayout;
