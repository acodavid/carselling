import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByUsername, clearSingleProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';
import fidgetspinner from '../../img/fidgetspinner.gif';

class SingleProfile extends Component {

    componentDidMount() {
        this.props.clearSingleProfile();
        this.props.getProfileByUsername(this.props.match.params.username);
    }

    render() {

        const { singleProfile } = this.props.profile;
        let content;

        if (singleProfile === null) {
            content = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />
        } else {
            content = (
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="container mt-5 mb-5">
                            <table className="table table-hover">
                                <tbody>
                                    <tr className="table-light">
                                        <td>Name:</td>
                                        <td>{singleProfile.user.name}</td>
                                    </tr>
                                    <tr className="table-secondary">
                                        <td>Phone number:</td>
                                        <td>{singleProfile.phoneNumber}</td>
                                    </tr>
                                    <tr className="table-light">
                                        <td>Address:</td>
                                        <td>{singleProfile.address}</td>
                                    </tr>
                                    <tr className="table-secondary">
                                        <td>Username:</td>
                                        <td>{singleProfile.username}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {!isEmpty(singleProfile.links) ? (
                                <p className="text-muted text-center mb-2">Social network links:</p>
                            ) : null}
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 m-auto">
                                        {isEmpty(singleProfile.links && singleProfile.links.facebook) ? null : (
                                            <a className="text-white p-2 m-auto" href={singleProfile.links.facebook} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-facebook fa-2x" /> Facebook
                                            </a>
                                        )}
                                        {isEmpty(singleProfile.links && singleProfile.links.instagram) ? null : (
                                            <a className="text-white p-2 m-auto" href={singleProfile.links.instagram} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-instagram fa-2x" /> Instagram
                                            </a>
                                        )}
                                        {isEmpty(singleProfile.links && singleProfile.links.twitter) ? null : (
                                            <a className="text-white p-2 m-auto" href={singleProfile.links.twitter} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-twitter fa-2x" /> Twitter
                                            </a>
                                        )}
                                    </div>

                                </div>

                            </div>
                            <Link to={`/cars/user/${singleProfile.user._id}`} className="btn btn-secondary btn-block mt-3">Show user cars</Link>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                {content}
            </div>


        )
    }
}

SingleProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByUsername: PropTypes.func.isRequired,
    clearSingleProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByUsername, clearSingleProfile })(SingleProfile);