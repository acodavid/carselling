import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isLogged) {
            this.props.history.push('/profile')
        }
    }



    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isLogged) {
            this.props.history.push('/profile');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const loggedUser = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(loggedUser);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <h3 className="mt-5 mb-3 text-center">Login</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input value={this.state.email} onChange={this.onChange} type="email" className={classnames('form-control form-control-lg mb-1', {
                                        'is-invalid': errors.email
                                    })} name="email" id="email" placeholder="Email" />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.password} onChange={this.onChange} type="password" className={classnames('form-control form-control-lg mb-1', {
                                        'is-invalid': errors.password
                                    })} name="password" id="password" placeholder="Password" />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <input type="submit" value="Login" className="btn btn-primary btn-block mb-5" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);