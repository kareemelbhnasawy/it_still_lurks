import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import Home from '@/pages/Home'
import Archive from '@/pages/Archive'
import Watch from '@/pages/Watch'
import ContentDetail from '@/pages/ContentDetail'
import Lore from '@/pages/Lore'
import Ledger from '@/pages/Ledger'
import Report from '@/pages/Report'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/archive', element: <Archive /> },
      { path: '/archive/:id', element: <Archive /> },
      { path: '/watch', element: <Watch /> },
      { path: '/watch/:slug', element: <ContentDetail /> },
      { path: '/lore', element: <Lore /> },
      { path: '/lore/ledger', element: <Ledger /> },
      { path: '/report', element: <Report /> },
      { path: '/signal', element: <Report /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
