import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCarsUserId, clearUserCars } from '../../actions/carActions';
import Car from './Car';
import fidgetspinner from '../../img/fidgetspinner.gif';

class UserCars extends Component {

    componentDidMount() {
        this.props.clearUserCars();
        this.props.getCarsUserId(this.props.match.params.id);
        window.scroll(0, 0);
    }

    render() {
        const { userCars } = this.props.cars;
        const { singleProfile } = this.props.profile;

        let carItem;

        if (userCars === null) {
            carItem = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />
        } else {

            if (userCars.length > 0) {
                carItem = userCars.map(car => (
                    <Car key={car._id} cars={car} />
                ))
            } else {
                carItem = <h3 className="text-center">There isn't any car for sale...</h3>
            }

        }

        return (
            <div className="cars-display">
                <div className="container">
                    <Link className="btn btn-secondary btn-block mb-3" to={`/profile/${singleProfile.username}`}>Back to profile</Link>
                    {carItem}
                </div>
            </div>
        )
    }
}

UserCars.propTypes = {
    cars: PropTypes.object.isRequired,
    getCarsUserId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    clearUserCars: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    cars: state.cars,
    profile: state.profile
});

export default connect(mapStateToProps, { getCarsUserId, clearUserCars })(UserCars);
