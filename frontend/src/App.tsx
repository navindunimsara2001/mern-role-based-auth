import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import routes from './component/routes'

function App() {
  const domRoutes = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={domRoutes} />
    </>
  )
}

export default App
