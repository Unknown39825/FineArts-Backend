import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Homepage/Hompage.jsx';
import ArtGallery from './Components/ArtGallery/index.jsx';
import JoinUs from './Components/JoinUs/JoinUs.jsx';
import Signup from './Components/Authentication/Signup.jsx';
import Forgot from './Components/Authentication/ForgotPassword.jsx';
import Signin from './Components/Authentication/Signin.jsx';
import Error from './Components/Base/Error.jsx';
import EventUpdate from './Components/Authentication/adminPanel/Updates/EventUpdate.jsx';
import HomeCardUpdate from './Components/Authentication/adminPanel/Updates/UpdateHomeCard.jsx';
import WorkshopUpdate from './Components/Authentication/adminPanel/Updates/UpdateWorkshop.jsx';
import AdminRoute from './Components/Authentication/auth/AdminRouters.jsx';
import ProtectedRoute from './Components/Authentication/auth/ProtectedRoutes.jsx';
import PhotoUpdate from './Components/Authentication/adminPanel/Updates/photoGalleryUpdate.jsx';
import { ToastContainer } from 'react-toastify';
import Adminpanel from './Components/Authentication/adminPanel/Admin.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="/art" element={<ArtGallery />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/join" element={<ProtectedRoute>     <JoinUs />   </ProtectedRoute>} />
        <Route path="/artwork/:id" element={<ProtectedRoute>     <PhotoUpdate />   </ProtectedRoute>}/>
        <Route path="/admin" element={<AdminRoute>     <Adminpanel />   </AdminRoute>}/>
        <Route path="/event/:id" element={<AdminRoute>     <EventUpdate />   </AdminRoute>}/>
        <Route path="/homecard/:id" element={<AdminRoute>     <HomeCardUpdate />   </AdminRoute>}/>
        <Route path="/workshop/:id" element={<AdminRoute>     <WorkshopUpdate />   </AdminRoute>}/>
        <Route path="/artwork/:id" element={<AdminRoute>     <PhotoUpdate />   </AdminRoute>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
