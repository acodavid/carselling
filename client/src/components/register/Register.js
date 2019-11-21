import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);

    }

    render() {

        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <h3 className="mt-5 mb-3 text-center">Registration</h3>
                            <form onSubmit={this.onSubmit} noValidate>
                                <div className="form-group">
                                    <input value={this.state.name} onChange={this.onChange} type="text" className={classnames('form-control form-control-lg mb-1', {
                                        'is-invalid': errors.name
                                    })} name="name" id="name" placeholder="Name" />
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>
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
                                <div className="form-group">
                                    <input value={this.state.password2} onChange={this.onChange} type="password" className={classnames('form-control form-control-lg mb-1', {
                                        'is-invalid': errors.password2
                                    })} name="password2" id="password2" placeholder="Confirm Password" />
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                </div>
                                <input type="submit" value="Register" className="btn btn-primary btn-block mb-5" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));