import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./Navbar/Navbar";
import HomePage from "./IndexPage/HomePage";
import EventIndex from "../pages/Event-Index";
import EventDetails from "pages/Event-Details";
import LostFoundPage from "pages/LostFoundIndex";
import Lost from "pages/LostIndex";
import Found from "pages/FoundIndex";
import AttendanceIndex from "../pages/Attendance-Index/index.jsx";
import AttendancePage from "./AttendancePage/AttendanceDetails/index";
//import StudentSemester from "./AttendancePage/StudentSemester";
import ProductList from "./CanteenPage/components/ProductList";
import Details from "./CanteenPage/components/Details";
import Cart from "./CanteenPage/components/Cart/Cart";
import Modal from "./CanteenPage/components/Modal";
import Default from "./Default";
import TeacherLogin from "./Forms/Login/index";
import TeacherRegister from "./Forms/Register/index";
import StudentLogin from "./Forms/Login/index";
import Register from "./Forms/Register/index";
import Teacher from "./AttendancePage/Teacher/Welcome/index";


//test routes
import TestRegister from "./Forms/Register/Register";
import TestLogin from "./Forms/Login/Login";

import { LoginContext } from "../global/LoginContext";
import AttendanceStudent from "../pages/Attendance-Student";

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
        <Route path="/event" component={EventIndex} />
        <Route path="/lostfound" component={LostFoundPage} />
        <Route path="/lost" component={Lost} />
        <Route path="/found" component={Found} />
        <Route path="/signin" component={StudentLogin} />
        <Route path="/signup" component={Register} />
        <Route path="/login/teacher" component={TeacherLogin} />
        <Route path="/register/teacher" component={TeacherRegister} />
        <Route path="/attendanceStudent" component={AttendancePage} />
        <Route path="/attendance" component={AttendanceIndex} />
        <Route path="/attendanceStudentSemester" component={AttendanceStudent} />
        <Route path="/attendanceDetails" component={AttendancePage} />
        <PrivateRoute path="/teacherWelcome" component={Teacher} />
        <Route path="/canteen" component={ProductList} />
        <Route path="/canteenItemDetails" component={Details} />
        <PrivateCanteenRoute path="/canteenCart" component={Cart} />

        {/*test routes*/}
        <Route path="/testRegister" component={TestRegister}/>
        <Route path="/testLogin" component={TestLogin}/>

        
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
