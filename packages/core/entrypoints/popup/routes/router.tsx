import { createBrowserRouter } from 'react-router-dom';
import Home from '@/entrypoints/popup/views/home/Home';

const router = createBrowserRouter([
  {
    path: '/popup.html',
    element: <Home />
  }
]);

export { router };
