import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Test from '@pages/test_page/Test';

const RootRouter = () => {

  const createRouteGroup = (
    <>
      <Route path="" element={<>main</>} />
      <Route path="test" element={<Test />} />
    </>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(createRouteGroup)
  )

  return <RouterProvider router={router} />
}

export default RootRouter;
