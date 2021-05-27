import React from 'react'
import { BrowserRouter ,Switch,Route} from 'react-router-dom'
import Hompage from './Components/Homepage/Hompage.jsx'
import ArtGallery from './Components/ArtGallery/index.jsx'
import JoinUs from './Components/JoinUs/JoinUs.jsx'
import Signup from './Components/Authentication/Signup.jsx'
import Forgot from './Components/Authentication/ForgotPassword.jsx'
import Signin from './Components/Authentication/Signin.jsx'
import Error from './Components/Base/Error.jsx'
import admin from './Components/Authentication/adminPanel/admin.jsx'
import EventUpdate from './Components/Authentication/adminPanel/Updates/EventUpdate.jsx'
import HomeCardUpdate from './Components/Authentication/adminPanel/Updates/UpdateHomeCard.jsx'
import WorkshopUpdate from './Components/Authentication/adminPanel/Updates/UpdateWorkshop.jsx'
import AdminRoute from './Components/Authentication/auth/AdminRouters.js'
import ProtectedRoute from './Components/Authentication/auth/ProtectedRoutes.js'
import PhotoUpdate from './Components/Authentication/adminPanel/Updates/photoGalleryUpdate.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/art" component={ArtGallery} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/forgot" component={Forgot} />

        <ProtectedRoute exact path="/join" component={JoinUs} />

        <AdminRoute exact path="/admin" component={admin} />
        <AdminRoute exact path="/event/:id" component={EventUpdate} />
        <AdminRoute exact path="/homecard/:id" component={HomeCardUpdate} />
        <AdminRoute exact path="/Workshop/:id" component={WorkshopUpdate} />
        <AdminRoute exact path="/artwork/:id" component={PhotoUpdate} />

        <Route path="/" exact={true} component={Hompage} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
