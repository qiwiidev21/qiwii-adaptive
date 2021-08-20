import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import HealthCare from "../screens/HealthCare";
import PhotoStudio from "../screens/PhotoStudio";
import Entertainment from "../screens/Entertainment";
import Events from "../screens/Event";
import Government from "../screens/Government";
import Finance from "../screens/Finance";
import Salon from "../screens/Salon";
import Schedule from "../screens/Schedule";
import Service from "../screens/Service";
import Services from "../screens/Services";
import TempatWisata from "../screens/TempatWisata";
import Movies from "../screens/Movies";
import Retail from "../screens/Retail";
import Expedition from "../screens/Expedition";
import ReviewQueue from "../screens/ReviewQueue";
import ReviewTicket from "../screens/ReviewTicket";
import Profile from "../screens/Profile";
import ProfileEdit from "../screens/ProfileEdit";
import PasswordEdit from "../screens/PasswordEdit";
import Antrian from "../screens/Antrian";
import Mall from "../screens/Mall";
import Cafe from "../screens/Cafe";
import Karaoke from "../screens/Karaoke";
import Gym from "../screens/Gym";

function Routes() {
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/adaptive"} component={Home} />
        <Route path={"/profile"} component={RouteProfile} />
        <Route path={"/antrian"} component={RouteQueue} />
        <Route path={"/kesehatan"} component={RouterHealth} />
        <Route path={"/bioskop"} component={RouteMovies} />
        <Route path={"/cafe"} component={RouteCafe} />
        <Route path={"/gym"} component={RouteGym} />
        <Route path={"/karaoke"} component={RouteKaraoke} />
        <Route path={"/mall"} component={RouteMall} />
        <Route path={"/tempatwisata"} component={RouteTempatWisata} />
        <Route path={"/leisure"} component={RouterEntertainment} />
        <Route path={"/photoStudio"} component={RoutePhotoStudio} />
        <Route path={"/events"} component={RouteEvents} />
        <Route path={"/pemerintahan"} component={RouteGovernment} />
        <Route path={"/keuangan"} component={RouteFinance} />
        <Route path={"/kecantikan"} component={RouteSalon} />
        <Route path={"/services"} component={RouteServices} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route path={"/schedule"} component={Schedule} />
        <Route path={"/service"} component={Service} />
        <Route path={"/retail"} component={RouteRetail} />
        <Route path={"/expedition"} component={RouteExpedition} />
      </Switch>
    </Router>
  );
}

function RouteScedule() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Service} />
      <Route path={`${path}/:routeID`} component={RouteReview} />
    </Switch>
  );
}

function RouteReview() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Schedule} />
      <Route path={`${path}/review`} component={RouteReviewTicket} />
    </Switch>
  );
}

function RouteReviewTicket() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={ReviewQueue} />
      <Route path={`${path}/ticket`} component={ReviewTicket} />
    </Switch>
  );
}

function RouteGovernment() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Government} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteFinance() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Finance} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteServices() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Services} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteSalon() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Salon} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouterHealth() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={HealthCare} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteQueue() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Antrian} />
      <Route path={`${path}/ticket`} component={ReviewTicket} />
    </Switch>
  );
}

function RouteProfile() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Profile} />
      <Route path={`${path}/edit`} component={ProfileEdit} />
      <Route path={`${path}/password`} component={PasswordEdit} />
    </Switch>
  );
}

function RouteMovies() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Movies} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteCafe() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Cafe} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteGym() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Gym} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteKaraoke() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Karaoke} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteMall() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Mall} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteTempatWisata() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={TempatWisata} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouterEntertainment() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Entertainment} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RoutePhotoStudio() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={PhotoStudio} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteEvents() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Events} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}

function RouteRetail() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Retail} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}
function RouteExpedition() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Expedition} />
      <Route path={`${path}/:routeID`} component={RouteScedule} />
    </Switch>
  );
}
export default Routes;
