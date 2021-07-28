import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../config/firebase';
import './dashboard.css';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: localStorage.nome,
    };
    this.logout = this.logout.bind(this);
  }
  logout = async () => {
    await firebase.logout().catch((err) => {
      console.log(err);
    });
    localStorage.removeItem('nome');
    this.props.history.push('/');
  };

  async componentDidMount() {
    if (!firebase.getCurrent()) {
      this.props.history.replace('/login');
      return null;
    }

    firebase.getUserName((info) => {
      localStorage.nome = info.val().nome;
      this.setState({ nome: localStorage.nome });
    });
  }
  render() {
    return (
      <div id="dashboard">
        <div className="user-info">
          <h1>Tela de {this.state.nome}</h1>
          <Link to="/dashboard/new">Novo Post</Link>
        </div>
        <p>Logado com: {firebase.getCurrent()}</p>
        <button onClick={() => this.logout()}>Logout</button>
      </div>
    );
  }
}
export default withRouter(Dashboard);
