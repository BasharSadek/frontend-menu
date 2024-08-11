import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App';
import './index.css'


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './dashboard/home/Home';
import NotFound from './dashboard/notFound/NotFound';
import Category from './dashboard/category/Category';
import CreateCategory from './dashboard/category/CreateCategory';
import EditCategory from './dashboard/category/EditCategory';
import Subcategory from './dashboard/subcategory/Subcategory';
import EditSubcategory from './dashboard/subcategory/EditSubcategory';
import CreateSubcategory from './dashboard/subcategory/CreateSubcategory';
import Item from './dashboard/item/Item';
import CreateItem from './dashboard/item/CreateItem';
import EditItem from './dashboard/item/EditItem';
import Discount from './dashboard/discount/Discount';
import CreateDiscount from './dashboard/discount/CreateDiscount';
import EditDiscount from './dashboard/discount/EditDiscount';
import Profile from './dashboard/user/Profile';


import SignIn from './client/SignIn'
import SignUp from './client/SignUp'

import { ContextProvider } from './components/Auth';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter(

  createRoutesFromElements(
    <>


      <Route path="signIn" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />


  
      <Route path="/" element={<RequireAuth><App /></RequireAuth>}>
        <Route index element={<Home />} />

        <Route path="discount" element={<Discount />} />
        <Route path="createDiscount" element={<CreateDiscount />} />
        <Route path="editDiscount/:id" element={<EditDiscount />} />

        <Route path="category" element={<Category />} />
        <Route path="createCategory" element={<CreateCategory />} />
        <Route path="editCategory/:id" element={<EditCategory />} />

        <Route path="subcategory" element={<Subcategory />} />
        <Route path="createSubcategory" element={<CreateSubcategory />} />
        <Route path="editSubcategory/:id" element={<EditSubcategory />} />

        <Route path="item" element={<Item />} />
        <Route path="createItem" element={<CreateItem />} />
        <Route path="editItem/:id" element={<EditItem />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      
      </Route>

  
    </>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>

  </React.StrictMode>
);