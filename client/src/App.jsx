import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import { Provider } from 'react-redux';
import { store } from './app/store.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerListPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  }
])

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App