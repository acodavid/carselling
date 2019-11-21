import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteProfile, clearProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';
import fidgetspinner from '../../img/fidgetspinner.gif';

class Profile extends Component {

    componentDidMount() {
        this.props.clearProfile();
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        e.preventDefault();

        this.props.deleteProfile();
    }

    render() {

        const { user } = this.props.auth;
        const { profile } = this.props.profile;


        let content;

        if (profile === null) {
            content = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />
        } else {
            if (Object.keys(profile).length > 0) {
                content = (
                    <div className="container mt-5 mb-5">
                        <table className="table table-hover">
                            <tbody>
                                <tr className="table-light">
                                    <td>Name:</td>
                                    <td>{profile.user.name}</td>
                                </tr>
                                <tr className="table-secondary">
                                    <td>Phone number:</td>
                                    <td>{profile.phoneNumber}</td>
                                </tr>
                                <tr className="table-light">
                                    <td>Address:</td>
                                    <td>{profile.address}</td>
                                </tr>
                                <tr className="table-secondary">
                                    <td>Username:</td>
                                    <td>{profile.username}</td>
                                </tr>
                            </tbody>
                        </table>
                        {!isEmpty(profile.links) ? (
                            <p className="text-muted text-center mb-2">Social network links:</p>
                        ) : null}

                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 m-auto">
                                    {isEmpty(profile.links && profile.links.facebook) ? null : (
                                        <a className="text-white p-2 m-auto" href={profile.links.facebook} target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-facebook fa-2x" /> Facebook
                                             </a>
                                    )}
                                    {isEmpty(profile.links && profile.links.instagram) ? null : (
                                        <a className="text-white p-2 m-auto" href={profile.links.instagram} target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram fa-2x" /> Instagram
                                            </a>
                                    )}
                                    {isEmpty(profile.links && profile.links.twitter) ? null : (
                                        <a className="text-white p-2 m-auto" href={profile.links.twitter} target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-twitter fa-2x" /> Twitter
                                            </a>
                                    )}
                                </div>

                            </div>
                            <Link to="/edit/profile" className="btn btn-primary btn-block mt-3 mb-2">Edit</Link>
                            <button type="button" className="btn btn-danger btn-block mb-2" onClick={this.onDeleteClick.bind(this)}>Delete profile and account</button>
                            <Link to="/cars/my-cars" className="btn btn-secondary btn-block mb-3">My cars</Link>
                        </div>
                    </div>
                )
            } else {
                content = (
                    <div className="container">
                        <p className="lead text-center mt-5">Welcome to our website, {user.ime}</p>
                        <p className="lead text-center">You don't have a profile? Click here and fill the form with your details</p>
                        <Link to="/create/profile" className="btn btn-primary btn-block mb-5">Create profile</Link>
                    </div>
                );
            }
        }

        return (
            <div className="profil">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    clearProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile, clearProfile })(Profile);


