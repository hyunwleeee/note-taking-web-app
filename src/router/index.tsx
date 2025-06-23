import Test from '@pages/test_page/Test';
import { lazy } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AuthLayout from '@components/ui/layout/AuthLayout';
import SiteLayout from '@components/ui/layout/SiteLayout';

const CreateNotePage = lazy(() => import('@pages/home_page/CreateNotePage'));
const DetailNotePage = lazy(() => import('@pages/home_page/DetailNotePage'));
const HomePage = lazy(() => import('@pages/home_page/HomePage'));

const SearchPage = lazy(() => import('@pages/search_page/SearchPage'));

const ArchivedPage = lazy(() => import('@pages/archived_page/ArchivedPage'));

const TagsPage = lazy(() => import('@pages/tags_page/TagsPage'));

const DetailTagPage = lazy(() => import('@pages/tags_page/DetailTagPage'));

const ColorThemePage = lazy(() => import('@pages/settings_page/ColorThemePage'));
const FontThemePage = lazy(() => import('@pages/settings_page/FontThemePage'));
const ChangePasswordPage = lazy(() => import('@pages/settings_page/ChangePasswordPage'));

const LoginPage = lazy(() => import('@pages/login_page/LoginPage'));
const SignUpPage = lazy(() => import('@pages/sign_up_page/SignUpPage'));
const ForgotPasswordPage = lazy(() => import('@pages/forgot_password_page/ForgotPasswordPage'));
const ResetYourPasswordPage = lazy(
  () => import('@pages/reset_your_password_page/ResetYourPasswordPage')
);

const RootRouter = () => {
  const createRouteGroup = (
    <>
      <Route element={<SiteLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="archived" element={<ArchivedPage />} />

        <Route path="notes/create" element={<CreateNotePage />} />
        <Route path="notes/:slug" element={<DetailNotePage />} />
        <Route path="archived/:slug" element={<DetailNotePage />} />

        <Route path="tags">
          <Route path="" element={<TagsPage />} />
          <Route path=":slug" element={<DetailTagPage />} />
        </Route>

        <Route path="settings">
          <Route path="color-theme" element={<ColorThemePage />} />
          <Route path="font-theme" element={<FontThemePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="forgot-password-page" element={<ForgotPasswordPage />} />
        <Route path="reset-your-password-page" element={<ResetYourPasswordPage />} />
      </Route>
      <Route path="test">
        <Route path="" element={<Test />} />
      </Route>
    </>
  );

  const router = createBrowserRouter(createRoutesFromElements(createRouteGroup));

  return <RouterProvider router={router} />;
};

export default RootRouter;
