import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useRouteStore } from '@store/routeStore.js';

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { setSlideDirection } = useRouteStore();

  const move = (path, state) => {
    if (path.charAt(0) === '/') {
      navigate(path, { state });
    } else {
      navigate(`${location.pathname}/${path}`, { state });
    }
    setSlideDirection('slide-next');
  };

  const inner = (path, state) => {
    if (path.charAt(0) === '/') {
      navigate(path, { ...state, replace: true });
    } else {
      navigate(`${location.pathname}/${path}`, { ...state, replace: true });
    }
    setSlideDirection('slide-next');
  };

  const goBack = () => {
    navigate(-1);
    setSlideDirection('slide-prev');
  };

  const goHome = () => {
    navigate('');
    setSlideDirection('slide-prev');
  };

  const fade = (path, state, replace = true) => {
    if (path.charAt(0) === '/') {
      navigate(path, { ...state, replace });
    } else {
      navigate(`${location.pathname}/${path}`, { ...state, replace });
    }
    setSlideDirection('null');
  };

  // 현재 설정된 query 와 함께 이동
  const moveWithQuery = (pathname, queryParamKey = 'g') => {
    const queryParamValue = searchParams.get(queryParamKey);

    const path = {
      pathname: pathname,
      search: createSearchParams({ [queryParamKey]: queryParamValue ?? '' }).toString(),
    };
    setSlideDirection('slide-next');
    navigate(path);
  };

  return {
    Navigate: {
      move,
      goBack,
      goHome,
      fade,
      moveWithQuery,
      inner,
    },
  };
};

export default useNavigation;
