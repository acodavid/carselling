import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getProfileById, clearSingleProfile } from '../../actions/profileActions';

import fidgetspinner from '../../img/fidgetspinner.gif';

class SingleProfileId extends Component {

    componentDidMount() {
        this.props.clearSingleProfile();
        this.props.getProfileById(this.props.cars.car.user);
    }

    render() {

        const { singleProfile, profile } = this.props.profile;
        let content;

        if (singleProfile === null) {
            content = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />
        } else {
            content = (
                <div className="row">
                    <div className="col-md-8 m-auto">
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

                            {singleProfile.username === profile.username ? (
                                <Link to="/profile" className="btn btn-secondary btn-block mt-2 mb-2">Show my profile</Link>
                            ) : (
                                    <Link to={`/profile/${singleProfile.username}`} className="btn btn-secondary btn-block mt-2 mb-2">Show profile</Link>
                                )}

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

SingleProfileId.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    clearSingleProfile: PropTypes.func.isRequired,
    cars: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    cars: state.cars
})

export default connect(mapStateToProps, { getProfileById, clearSingleProfile })(SingleProfileId);
