import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Movie from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/common/navbar";
import MoviesDetails from "./components/moviedetails";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MoviesDetails} />
            <Route path="/movies" component={Movie} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/" component={Movie} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
