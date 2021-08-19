import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./Navbar/Navbar";
import HomePage from "./IndexPage/HomePage";
import EventListPage from "./EventListPage/EventListPage";
import EventDetails from "./EventListPage/EventDetails/EventDetails";
import LostFoundPage from "./LostFoundPage/LostFoundPage";
import Lost from "./LostFoundPage/LostItems/Lost";
import Found from "./LostFoundPage/FoundItems/Found";
import AttendancePage from "./AttendancePage/StudentAttendanceDetails";
import Attendance from "./AttendancePage/AttendanceIndexPage";
import StudentSemester from "./AttendancePage/StudentSemester";
import ProductList from "./CanteenPage/components/ProductList";
import Details from "./CanteenPage/components/Details";
import Cart from "./CanteenPage/components/Cart/Cart";
import Modal from "./CanteenPage/components/Modal";
import Default from "./Default";
import Login from "./Forms/loginForm";
import { LoginContext } from "../global/LoginContext";
import Teacher from "./AttendancePage/Teacher/TeacherWelcomeScreen";

const BaseRouter = (props) => {
  useEffect(() => {
    let pathName = window.location.pathname.replace("/", "").toUpperCase();
    document.title = `${pathName} ${
      pathName.length ? "-" : ""
    } Smart University App`;
  }, []);
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/event/:id" component={EventDetails} />
        <Route path="/event" component={EventListPage} />
        <Route path="/lostfound" component={LostFoundPage} />
        <Route path="/lost" component={Lost} />
        <Route path="/found" component={Found} />
        <Route path="/login" component={Login} />
        <Route path="/attendanceStudent" component={AttendancePage} />
        <Route path="/attendance" component={Attendance} />
        <Route path="/attendanceStudentSemester" component={StudentSemester} />
        <Route path="/attendanceDetails" component={AttendancePage} />
        <PrivateRoute path="/teacherWelcome" component={Teacher} />
        <Route path="/canteen" component={ProductList} />
        <Route path="/canteenItemDetails" component={Details} />
        <PrivateCanteenRoute path="/canteenCart" component={Cart} />
        <Route path="/" exact component={HomePage} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isTeacherAuth } = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isTeacherAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    ></Route>
  );
};

const PrivateCanteenRoute = ({ component: Component, ...rest }) => {
  const { isTeacherAuth, isAuth } = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isTeacherAuth || isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/canteen",
            }}
          />
        )
      }
    ></Route>
  );
};
export default BaseRouter;
