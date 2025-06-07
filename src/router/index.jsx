import Test from '@pages/test_page/Test';
import { lazy } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import SiteLayout from '@components/ui/layout/SiteLayout';

const HomePage = lazy(() => import('@pages/home_page/HomePage'));

const SearchPage = lazy(() => import('@pages/search_page/SearchPage'));

const ArchivedPage = lazy(() => import('@pages/archived_page/ArchivedPage'));

const TagsPage = lazy(() => import('@pages/tags_page/TagsPage'));

const SettingsPage = lazy(() => import('@pages/settings_page/SettingsPage'));

const RootRouter = () => {
  const createRouteGroup = (
    <>
      <Route element={<SiteLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="archived" element={<ArchivedPage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="test" element={<Test />} />
    </>
  );

  const router = createBrowserRouter(createRoutesFromElements(createRouteGroup));

  return <RouterProvider router={router} />;
};

export default RootRouter;
