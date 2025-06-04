import Test from '@pages/test_page/Test';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const RootRouter = () => {
  const createRouteGroup = (
    <>
      <Route path="" element={<>main</>} />
      <Route path="test" element={<Test />} />
    </>
  );

  const router = createBrowserRouter(createRoutesFromElements(createRouteGroup));

  return <RouterProvider router={router} />;
};

export default RootRouter;
