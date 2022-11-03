import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TybeTunes</h1>
        { !user && <Loading /> }
        { user && (<p data-testid="header-user-name">{user.name}</p>)}
      </header>
    );
  }
}

export default Header;
