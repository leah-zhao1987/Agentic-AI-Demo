import Detail from '../pages/Detail';
import Home from '../pages/Home';
import NewsPage from '../pages/NewsPage';
import NotFound from '../pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/Home',
        element: <Home />,
    },
    {
        path: '/detail/:id',
        element: <Detail />,
    },
    {
        path: '/news', // 添加新的路由路径
        element: <NewsPage />,
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;