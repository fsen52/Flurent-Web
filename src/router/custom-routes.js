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
import ProfilePage from "../pages/users/profile-page";
import ProtectedRoute from "./protected-route";
import ReservationsPage from "../pages/users/reservations-page";
import ReservationDetailsPage from "../pages/users/reservation-details-page";
import ScrollToTop from "../components/common/scroll-to-top/scroll-to-top";
import AdminTemplate from "../templates/admin-template";
import AdminDashboardPage from "../pages/admins/admin-dashboard-page";
import AdminUsersPage from "../pages/admins/admin-users-page";
import AdminUserEditPage from "../pages/admins/admin-user-edit-page";
import AdminVehiclesPage from "../pages/admins/admin-vehicles-page";
import AdminVehicleEditPage from "../pages/admins/admin-vehicle-edit-page";
import AdminVehicleNewPage from "../pages/admins/admin-vehicle-new-page";
import AdminReservationsPage from "../pages/admins/admin-reservations-page";
import AdminReservationEditPage from "../pages/admins/admin-reservation-edit-page";
import AdminContactMessagesPage from "../pages/admins/admin-contact-messages-page";
import AdminContactMessageEditPage from "../pages/admins/admin-contact-message-edit-page";
const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/">
          <Route index element={<UserTemplate><HomePage /></UserTemplate>}/>
          <Route path="Flurent-Web" element={<UserTemplate><HomePage /></UserTemplate>}/>
          <Route path="about" element={<UserTemplate><AboutPage /></UserTemplate>}/>
          <Route path="contact" element={<UserTemplate><ContactPage /></UserTemplate>}/>
          <Route path="privacy-policy" element={<UserTemplate><PrivacyPolicyPage /></UserTemplate>}/>
          <Route path="user">
          <Route index element={<ProtectedRoute><UserTemplate><ProfilePage /></UserTemplate></ProtectedRoute>}/>
              <Route path="reservations">
                  <Route index element={<ProtectedRoute><UserTemplate><ReservationsPage /></UserTemplate></ProtectedRoute>}/>
                  <Route path=":reservationId" element={<ProtectedRoute><UserTemplate><ReservationDetailsPage/></UserTemplate></ProtectedRoute>}/>
              </Route>
          </Route>
          <Route path="vehicles">
              <Route index element={<UserTemplate><VehiclesPage /></UserTemplate>}/>
              <Route path=":vehicleId" element={<UserTemplate><VehicleDetailsPage /></UserTemplate>}/>
          </Route>
          <Route path="auth" element={<UserTemplate><AuthPage /></UserTemplate>}/>
          <Route path="unauthorized" element={<UserTemplate><UnauthorizedPage /></UserTemplate>}/>

          <Route path="rentadmin">
              <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminDashboardPage/></AdminTemplate></ProtectedRoute>}/>
              <Route path="users">
                  <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminUsersPage/></AdminTemplate></ProtectedRoute>}/>
                  <Route path=":userId" element={<ProtectedRoute admin={true}><AdminTemplate><AdminUserEditPage/></AdminTemplate></ProtectedRoute>}/>
              </Route>  
              <Route path="vehicles">
                  <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminVehiclesPage/></AdminTemplate></ProtectedRoute>}/>
                  <Route path=":vehicleId" element={<ProtectedRoute admin={true}><AdminTemplate><AdminVehicleEditPage/></AdminTemplate></ProtectedRoute>}/>
                  <Route path="new" element={<ProtectedRoute admin={true}><AdminTemplate><AdminVehicleNewPage/></AdminTemplate></ProtectedRoute>}/>   
              </Route>
              <Route path="reservations">
                  <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminReservationsPage/></AdminTemplate></ProtectedRoute>}/>
                  <Route path=":reservationId" element={<ProtectedRoute admin={true}><AdminTemplate><AdminReservationEditPage/></AdminTemplate></ProtectedRoute>}/>
              </Route>
              <Route path="contact-messages">
                  <Route index element={<ProtectedRoute admin={true}><AdminTemplate><AdminContactMessagesPage/></AdminTemplate></ProtectedRoute>}/>
                  <Route path=":messageId" element={<ProtectedRoute admin={true}><AdminTemplate><AdminContactMessageEditPage/></AdminTemplate></ProtectedRoute>}/>
              </Route>
          </Route>


          <Route path="*" element={<UserTemplate><NotFoundPage /></UserTemplate>}/>
         

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
