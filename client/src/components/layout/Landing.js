import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isLogged) {
            this.props.history.push('/cars')
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">

                                <h1 className="display-3 text-info mb-4">Car selling</h1>
                                <p className="lead text-info"> Buy a new car / sell your car </p>

                                <hr />
                                <Link to="/register" className="btn btn-lg btn-primary mr-3">Registration</Link>
                                <Link to="/login" className="btn btn-lg btn-primary">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);