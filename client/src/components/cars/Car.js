import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DefaultCar from '../../img/DefaultCar.png';

class Car extends Component {

    render() {

        const { cars } = this.props

        return (
            <div className="card card-body mb-3">
                <div className="card-header">
                    <h3>{cars.brand}</h3>
                    <h5>{cars.model}</h5>
                </div>
                <div className="card-body mb-3">
                    <div className="row">
                        {cars.picture.imageName === '' ? (
                            <div className="col-md-5">
                                <img src={DefaultCar} className="img-fluid mb-3" alt="" />
                                <br />
                            </div>) : (
                                <div className="col-md-5">
                                    <img src={cars.picture.imageData} className="img-fluid mb-3" alt="" />
                                    <br />
                                </div>
                            )}

                        <div className="col-md-7">
                            <table className="table table-hover">
                                <tbody>
                                    <tr className="table-light">
                                        <td>Year:</td>
                                        <td>{cars.year}</td>
                                    </tr>
                                    <tr className="table-secondary">
                                        <td>Condition:</td>
                                        <td>{cars.condition}</td>
                                    </tr>
                                    <tr className="table-light">
                                        <td>Fuel type:</td>
                                        <td>{cars.fuelType}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <br />
                            {cars.prize === 'Price negotiable' ? (
                                <span className="badge badge-primary mt-5 mr-2" style={{ float: 'right', fontSize: '23px' }}>Prize: {cars.prize} </span>
                            ) : (
                                    <span className="badge badge-primary mt-5 mr-2" style={{ float: 'right', fontSize: '23px' }}>Prize: {cars.prize} €</span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <Link to={`/car/${cars._id}`} className="btn btn-secondary btn-block">Show other details</Link>
                </div>
            </div>

        )
    }
}

Car.propTypes = {
    cars: PropTypes.object.isRequired
}

export default Car;