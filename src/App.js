import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import New from './components/New';
import firebase from './config/firebase';
class App extends Component {
  state = {
    firebaseInit: false,
  };

  componentDidMount() {
    firebase.isInitialized().then((resultado) => {
      this.setState({
        firebaseInit: resultado,
      });
    });
  }
  render() {
    return this.state.firebaseInit !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/new" component={New} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>carregando...</h1>
    );
  }
}

export default App;
