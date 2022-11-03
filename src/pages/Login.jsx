import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    nome: '',
    loading: false,
    click: false,
  };

  handleClick = () => {
    this.setState({ click: true });
    const { nome } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: nome });
      this.setState({ loading: false });
    });
  };

  render() {
    const { nome, loading, click } = this.state;
    const caracterMin = 3;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ ({ target: { value } }) => this.setState({ nome: value }) }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ nome.length < caracterMin }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        {loading === true && (<Loading />)}
        {(!loading && click) && (<Redirect to="/search" />)}
      </div>
    );
  }
}

export default Login;
