import { useRouteStore } from '@store/routeStore';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
  To,
} from 'react-router-dom';

const useNavigation = <T,>() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { setSlideDirection } = useRouteStore();

  const move = (path: To, state?: T) => {
    if (typeof path === 'string' && path.startsWith('/')) {
      navigate(path, { state });
    } else {
      navigate(`${location.pathname}/${path}`, { state });
    }
    setSlideDirection('slide-next');
  };

  const inner = (path: To, state?: T) => {
    if (typeof path === 'string' && path.startsWith('/')) {
      navigate(path, { state, replace: true });
    } else {
      navigate(`${location.pathname}/${path}`, { state, replace: true });
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

  const fade = (path: To, state?: T, replace = true) => {
    if (typeof path === 'string' && path.startsWith('/')) {
      navigate(path, { state, replace });
    } else {
      navigate(`${location.pathname}/${path}`, { state, replace });
    }
    setSlideDirection('null');
  };

  const moveWithQuery = (pathname: string, queryParamKey = 'g') => {
    const queryParamValue = searchParams.get(queryParamKey);
    const path = {
      pathname,
      search: createSearchParams({
        [queryParamKey]: queryParamValue ?? '',
      }).toString(),
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

