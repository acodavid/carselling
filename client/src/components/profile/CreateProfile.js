import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            phoneNumber: '',
            address: '',
            facebook: '',
            instagram: '',
            twitter: '',
            errors: {},
            showLinks: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newProfile = {
            username: this.state.username,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            twitter: this.state.twitter

        }

        this.props.createProfile(newProfile, this.props.history);
    }

    onClick(e) {
        e.preventDefault();

        const { showLinks } = this.state;

        this.setState({
            showLinks: !showLinks
        })
    }

    render() {

        const { errors } = this.state;
        const { showLinks } = this.state;

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <h3 className="text-center mb-3">Create profile</h3>
                            <form onSubmit={this.onSubmit} noValidate>
                                <div className="form-group">
                                    <input value={this.state.username} onChange={this.onChange} type="text" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.username })} name="username" id="username" placeholder="Username" />
                                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.phoneNumber} onChange={this.onChange} type="number" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.phoneNumber })} name="phoneNumber" id="phoneNumber" placeholder="Phone number" />
                                    {errors.phoneNumber && (<div className="invalid-feedback">{errors.phoneNumber}</div>)}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.address} onChange={this.onChange} type="text" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.address })} name="address" id="address" placeholder="Address" />
                                    {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
                                </div>
                                <button onClick={this.onClick} className="btn btn-secondary btn-block mb-3">+ Social network links (optional)</button>
                                {showLinks ? (
                                    <div className="social-links">
                                        <div className="form-group">
                                            <input value={this.state.facebook} onChange={this.onChange} type="url" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.facebook })} name="facebook" id="facebook" placeholder="Facebook URL" />
                                            {errors.facebook && (<div className="invalid-feedback">{errors.facebook}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.instagram} onChange={this.onChange} type="url" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.instagram })} name="instagram" id="instagram" placeholder="Instagram URL" />
                                            {errors.instagram && (<div className="invalid-feedback">{errors.instagram}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.twitter} onChange={this.onChange} type="url" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.twitter })} name="twitter" id="twitter" placeholder="Twitter URL" />
                                            {errors.twitter && (<div className="invalid-feedback">{errors.twitter}</div>)}
                                        </div>
                                    </div>
                                ) : null}
                                <button onSubmit={this.onSubmit} className="btn btn-primary btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));