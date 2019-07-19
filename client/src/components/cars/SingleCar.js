import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fidgetspinner from '../../img/fidgetspinner.gif';
import { getCarByID, deleteCar } from '../../actions/carActions';
import { withRouter } from 'react-router-dom';
import PitanjaForm from '../pitanja/PitanjaForm';
import PitanjaList from '../pitanja/PitanjaList';
import DefaultCar from '../../img/DefaultCar.png';
import prazan from '../../validation/prazan';

class SingleCar extends Component {


    constructor() {
        super();
        this.state = {
            clicked: false
        };

        this.setClicked = this.setClicked.bind(this);
    }

    onDeleteClick(carId) {
        this.props.deleteCar(carId, this.props.history);
    }

    setClicked(e) {
        this.setState({ clicked: !this.state.clicked });
    }

    componentDidMount() {
        this.props.getCarByID(this.props.match.params.id)
    }

    render() {

        const { car } = this.props.cars;
        const { auth } = this.props;

        let carItem;

        if (car === null) {
            carItem = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Ucitavanje" />
        } else {
            carItem = (
                <div className="car-design mb-3">
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-md-4">

                                <Link to="/cars" className="btn btn-secondary btn-block mb-3"><i className="fas fa-backward"></i>---Nazad ka automobilima</Link>

                                {prazan(car.slika && car.slika.imageName) ? (
                                    <img src={DefaultCar} alt="" />
                                ) : (
                                        <img src={car.slika.imageData} alt="" />
                                    )}





                                <table className="table table-hover">
                                    <tr className="table-primary">
                                        <td>Cijena:</td>
                                        {car.cijena === 'Po dogovoru' ? (
                                            <td>{car.cijena}</td>
                                        ) : (
                                                <td>{car.cijena} KM</td>
                                            )}
                                    </tr>
                                </table>
                                <div className="card">
                                    <div className="card-body">
                                        <p className="lead">Detalji:</p>
                                        <p className="lead">{car.detalji}</p>
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-8 m-auto">
                                <div className="card card-body">
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr className="table-light">
                                                <td>Proizvođač:</td>
                                                <td>{car.proizvodjac}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Model:</td>
                                                <td>{car.model}</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Godište:</td>
                                                <td>{car.godiste}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Kilometraža:</td>
                                                <td>{car.kilometraza} km</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Kubikaža:</td>
                                                <td>{car.kubikaza}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Kilovati:</td>
                                                <td>{car.kw} KW</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Transmisija:</td>
                                                <td>{car.transmisija}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Gorivo:</td>
                                                <td>{car.gorivo}</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Broj vrata:</td>
                                                <td>{car.brojvrata}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td>Boja:</td>
                                                <td>{car.boja}</td>
                                            </tr>
                                            <tr className="table-light">
                                                <td>Stanje:</td>
                                                <td>{car.stanje}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                    <Link to={`/profile/${car.korisnik}`} className="btn btn-secondary btn-block mb-3">Prikazi detalje o prodavcu</Link>
                                    <div className="row">
                                        <div className="col-md-6">
                                            {car.korisnik === auth.korisnik.id ? (
                                                <Link to={`/edit/car/${car._id}`} className="btn btn-warning btn-block mb-3">Izmeni podatke o automobilu</Link>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6">
                                            {car.korisnik === auth.korisnik.id ? (
                                                <button type="button" className="btn btn-danger btn-block mb-3" onClick={this.onDeleteClick.bind(this, car._id)}>Izbriši automobil</button>
                                            ) : null}
                                        </div>
                                    </div>
                                    <button onClick={this.setClicked} className="btn btn-secondary btn-block mb-3">Pitanja</button>
                                    {!this.state.clicked ? null : (
                                        <div>
                                            <PitanjaForm carId={this.props.match.params.id} />
                                            <PitanjaList carId={this.props.match.params.id} pitanja={car.pitanja} />
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
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cars: state.cars,
    auth: state.authorization
})

export default connect(mapStateToProps, { getCarByID, deleteCar })(withRouter(SingleCar));