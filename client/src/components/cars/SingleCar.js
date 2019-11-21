import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fidgetspinner from '../../img/fidgetspinner.gif';
import { getCarByID, deleteCar, clearCar } from '../../actions/carActions';
import { getPictures, clearPictures, deletePictures } from '../../actions/pictureActions';
import { withRouter } from 'react-router-dom';
import QuestionForm from '../questions/QuestionForm';
import QuestionList from '../questions/QuestionList';
import DefaultCar from '../../img/DefaultCar.png';
import isEmpty from '../../validation/isEmpty';
import SingleProfileId from '../profile/SingleProfileId';

class SingleCar extends Component {


    constructor() {
        super();
        this.state = {
            clicked: false,
            clickedSeller: false
        };

        this.setClicked = this.setClicked.bind(this);
        this.setClickedSeller = this.setClickedSeller.bind(this);
    }

    componentDidMount() {
        this.props.clearCar();
        this.props.clearPictures();
        this.props.getPictures(this.props.match.params.id);
        this.props.getCarByID(this.props.match.params.id);

    }

    onDeleteClick(carId) {
        this.props.deleteCar(carId, this.props.history);

    }

    setClicked(e) {
        this.setState({ clicked: !this.state.clicked });
    }

    setClickedSeller(e) {
        this.setState({ clickedSeller: !this.state.clickedSeller });
    }

    deletePictures(id, car_id) {
        this.props.deletePictures(id, this.props.history, car_id);
    }


    render() {

        const { car } = this.props.cars;
        const { auth } = this.props;
        const { pictures } = this.props.pictures;

        let carItem;

        if (car === null) {
            carItem = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />
        } else {
            carItem = (
                <div className="car-design mb-3">
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-md-4">

                                <Link to="/cars" className="btn btn-secondary btn-block mb-3"><i className="fas fa-backward"></i>---Back</Link>

                                {isEmpty(car.picture && car.picture.imageName) ? (
                                    <img src={DefaultCar} alt="" />
                                ) : (
                                        <img src={car.picture.imageData} alt="" />
                                    )}

                                <table className="table table-hover">
                                    <tbody>
                                        <tr className="table-primary">
                                            <td>Prize:</td>
                                            {car.prize === 'Price negotiable' ? (
                                                <td>{car.prize}</td>
                                            ) : (
                                                    <td>{car.prize} €</td>
                                                )}
                                        </tr>
                                    </tbody>
                                </table>

                                {pictures !== null ? (
                                    <Link to={`/pictures/car/${car._id}`} className="btn btn-secondary btn-block">Show pictures</Link>
                                ) : null}


                                {car.user === auth.user.id && pictures !== null ? (
                                    <Link to={`/edit/pictures/${pictures._id}/${car._id}`} className="btn btn-warning btn-block">Edit pictures</Link>
                                ) : null}

                                {car.user === auth.user.id && pictures !== null ? (
                                    <button onClick={this.deletePictures.bind(this, pictures._id, car._id)} className="btn btn-danger btn-block">Delete all pictures</button>
                                ) : null}

                                {car.user === auth.user.id && pictures === null ? (
                                    <Link to={`/add/pictures/car/${car._id}`} className="btn btn-secondary btn-block">Add pictures</Link>
                                ) : null}

                                <div className="card mt-3">
                                    <div className="card-body">
                                        <p className="lead">Extra details:</p>
                                        <p className="lead">{car.details}</p>
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-8 m-auto">
                                <div className="card card-body">
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr className="table-light">
                                                <td>Brand:</td>
                                                <td>{car.brand}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Model:</td>
                                                <td>{car.model}</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Year:</td>
                                                <td>{car.year}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Kilometrage:</td>
                                                <td>{car.kilometrage} km</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Cubic:</td>
                                                <td>{car.cubic}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Kilowatts:</td>
                                                <td>{car.kilowatts} kW</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Transmission:</td>
                                                <td>{car.transmission}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Fuel type:</td>
                                                <td>{car.fuelType}</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Doors:</td>
                                                <td>{car.doors}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Colour:</td>
                                                <td>{car.colour}</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Condition:</td>
                                                <td>{car.condition}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                    <button onClick={this.setClickedSeller} className="btn btn-secondary btn block mb-3">Seller information</button>

                                    {!this.state.clickedSeller ? null : (
                                        <SingleProfileId />
                                    )}



                                    <div className="row">
                                        <div className="col-md-6">
                                            {car.user === auth.user.id ? (
                                                <Link to={`/edit/car/${car._id}`} className="btn btn-warning btn-block mb-3">Edit car</Link>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6">
                                            {car.user === auth.user.id ? (
                                                <button type="button" className="btn btn-danger btn-block mb-3" onClick={this.onDeleteClick.bind(this, car._id)}>Delete car</button>
                                            ) : null}
                                        </div>
                                    </div>
                                    <button onClick={this.setClicked} className="btn btn-secondary btn-block mb-3">Questions</button>
                                    {!this.state.clicked ? null : (
                                        <div>
                                            <QuestionForm carId={this.props.match.params.id} />
                                            <QuestionList carId={this.props.match.params.id} questions={car.questions} />
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

        return (
            <div>
                {carItem}
            </div>
        )
    }
}

SingleCar.propTypes = {
    getCarByID: PropTypes.func.isRequired,
    cars: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    pictures: PropTypes.object.isRequired,
    deleteCar: PropTypes.func.isRequired,
    clearCar: PropTypes.func.isRequired,
    getPictures: PropTypes.func.isRequired,
    clearPictures: PropTypes.func.isRequired,
    deletePictures: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    cars: state.cars,
    auth: state.auth,
    pictures: state.pictures
})

export default connect(mapStateToProps, { getCarByID, deleteCar, clearCar, getPictures, clearPictures, deletePictures })(withRouter(SingleCar));