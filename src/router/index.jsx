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

const DetailTagPage = lazy(() => import('@pages/tags_page/DetailTagPage'));

const SettingsLayout = lazy(() => import('@pages/settings_page/SettingsLayout'));
const ColorThemePage = lazy(() => import('@pages/settings_page/ColorThemePage'));
const FontThemePage = lazy(() => import('@pages/settings_page/FontThemePage'));
const ChangePasswordPage = lazy(() => import('@pages/settings_page/ChangePasswordPage'));

const RootRouter = () => {
  const createRouteGroup = (
    <>
      <Route element={<SiteLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="archived" element={<ArchivedPage />} />

        <Route path="tags">
          <Route path="" element={<TagsPage />} />
          <Route path=":slug" element={<DetailTagPage />} />
        </Route>

        <Route path="settings" element={<SettingsLayout />}>
          <Route path="color-theme" element={<ColorThemePage />} />
          <Route path="font-theme" element={<FontThemePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>
      <Route path="test" element={<Test />} />
    </>
  );

  const router = createBrowserRouter(createRoutesFromElements(createRouteGroup));

  return <RouterProvider router={router} />;
};

export default RootRouter;
