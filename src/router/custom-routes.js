import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/users/home-page";
import UserTemplate from "../templates/user-template";
import AboutPage from "../pages/users/about-page";
import ContactPage from "../pages/users/contact-page";
import PrivacyPolicyPage from "../pages/users/privacy-policy-page";
import VehiclesPage from "../pages/users/vehicles-page";
import VehicleDetailsPage from "../pages/users/vehicle-details-page";
import NotFoundPage from "../pages/common/not-found-page";
import UnauthorizedPage from "../pages/common/unauthorized-page";
import AuthPage from "../pages/users/auth-page";
const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<UserTemplate><HomePage /></UserTemplate>}/>
          <Route path="about" element={<UserTemplate><AboutPage /></UserTemplate>}/>
          <Route path="contact" element={<UserTemplate><ContactPage /></UserTemplate>}/>
          <Route path="privacy-policy" element={<UserTemplate><PrivacyPolicyPage /></UserTemplate>}/>
          <Route path="vehicles">
            <Route index element={<UserTemplate><VehiclesPage /></UserTemplate>}/>
            <Route path=":vehicleId" element={<UserTemplate><VehicleDetailsPage /></UserTemplate>}/>
          </Route>
          <Route path="auth" element={<UserTemplate><AuthPage /></UserTemplate>}/>
          <Route path="unauthorized" element={<UserTemplate><UnauthorizedPage /></UserTemplate>}/>
          <Route path="*" element={<UserTemplate><NotFoundPage /></UserTemplate>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
