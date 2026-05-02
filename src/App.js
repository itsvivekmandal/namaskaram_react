import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
// import About from "./components/About";
// import Restaurant from "./components/Restaurant";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Shimmer from "../src/components/Shimmer";
import Dish from "./components/Dish";
import UserContext from "./utils/UserContext";
import Cart from "./components/Cart";
import Store from "./utils/Store";
import { Provider } from "react-redux";
// import UserContext from "./utils/UserContext";

const About = lazy(() => import("./components/About"));
const Restaurant = lazy(() => import("./components/Restaurant"));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();

  useEffect(() => {
    const data = {
      name: 'Itsvivekmandal'
    };

    setUserName(data.name);
  }, []);

  // console.log(Store);
  return (
    <Provider store={Store}>
      <UserContext.Provider value={{loggedInUser: userName,avatar: userImage, setUserName, setUserImage}}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  )
};

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <AppLayout />,
    children: [
      {
        path:'/',
        element: <Body />
      },
      {
        path:'/contact',
        element: <Contact />
      },
      {
        path:'/about',
        // element: <Suspense><About/></Suspense>
        element: <Suspense fallback={<Shimmer/>}><About/></Suspense>
      },
      {
        path:'/restaurant/:id',
        element: <Suspense><Restaurant/></Suspense>
      },
      {
        path: '/dish/:id',
        element: <Dish/>
      },
      {
        path: '/cart',
        element: <Cart/>
      }
    ],
    errorElement: <Error />
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);

