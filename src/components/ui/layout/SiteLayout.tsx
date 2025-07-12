import { useLayoutStore } from '@store/layoutStore';
import { useEffect, useLayoutEffect } from 'react';
import { useOutlet } from 'react-router-dom';

import { BREAK_POINTS } from '@assets/styles/media';

import Header from '@components/ui/header/Header';
import MenuBar from '@components/ui/menu_bar/MenuBar';

import PageLayout from './PageLayout';
import { useLabelStore } from '@store/labelStore';
import { getRepoLabels } from '@apis/github';
import { info } from '@constants/info';

function SiteLayout() {
  const { setDeviceType } = useLayoutStore();
  const outlet = useOutlet();
  const { setLabelList } = useLabelStore();
  const { data: labelList } = getRepoLabels(info.username, info.repo);

  //반응형 vh설정
  useLayoutEffect(() => {
    const setVh = () => {
      if (window.innerWidth <= BREAK_POINTS.tablet) setDeviceType('mobile');
      else if (window.innerWidth <= BREAK_POINTS.laptop) setDeviceType('tablet');
      else setDeviceType('laptop');

      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    if (labelList) {
      setLabelList(labelList);
    }
  }, [labelList])

  return (
    <>
      <Header />
      <PageLayout>{outlet}</PageLayout>
      <MenuBar />
    </>
  );
}

export default SiteLayout;
