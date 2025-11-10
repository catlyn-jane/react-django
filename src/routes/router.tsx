import { createBrowserRouter } from 'react-router';
import GuestRouter from './GuestRouter';
import MainRouter from './MainRouter';

const router = createBrowserRouter([...GuestRouter, ...MainRouter])

export default router