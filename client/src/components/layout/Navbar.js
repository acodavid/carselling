import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();

    }

    render() {

        const { isLogged, user } = this.props.auth;

        const Logged = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link text-muted" to="/profile">{user.name}</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/login" onClick={this.onLogoutClick.bind(this)}>Logout</a>
                </li>
            </ul>
        );

        const NotLogged = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Registration</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">acod</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/cars"> Cars
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            {isLogged ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add/car"> Add car
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                        {isLogged ? Logged : NotLogged}
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearProfile })(Navbar);