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

function Routes() {
  return (
    <Router basename={"/adaptive"}>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/adaptive"} component={Home} />
        <Route path={"/kesehatan"} component={RouterHealth} />
        <Route path={"/bioskop"} component={RouteMovies} />
        <Route path={"/tempatwisata"} component={RouteTempatWisata} />
        <Route path={"/entertainment"} component={RouterEntertainment} />
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
      </Switch>
    </Router>
  );
}

function RouteGovernment() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Government} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouteFinance() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Finance} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouteServices() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Services} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouteSalon() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Salon} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouterHealth() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={HealthCare} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouteMovies() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Movies} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouteTempatWisata() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={TempatWisata} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouterEntertainment() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Entertainment} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RoutePhotoStudio() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={PhotoStudio} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

function RouteEvents() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Events} />
      <Route path={`${path}/:routeID`} component={Service} />
    </Switch>
  );
}

export default Routes;
