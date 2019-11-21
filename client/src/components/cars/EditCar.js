import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCarByID, updateCar } from '../../actions/carActions';
import FileBase from 'react-file-base64';
import fidgetspinner from '../../img/fidgetspinner.gif';

class EditCar extends Component {

    constructor() {
        super();
        this.state = {
            brand: '',
            model: '',
            prize: '',
            year: '',
            kilometrage: '',
            cubic: '',
            kilowatts: '',
            transmission: '',
            fuelType: '',
            doors: '',
            colour: '',
            condition: '',
            details: '',
            errors: {},
            imageName: '',
            imageData: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.getCarByID(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.cars.car) {
            const car = nextProps.cars.car;

            this.setState({
                brand: car.brand,
                model: car.model,
                prize: car.prize,
                year: car.year,
                kilometrage: car.kilometrage,
                cubic: car.cubic,
                kilowatts: car.kilowatts,
                transmission: car.transmission,
                fuelType: car.fuelType,
                doors: car.doors,
                colour: car.colour,
                condition: car.condition,
                details: car.details,
                imageName: car.picture.imageName,
                imageData: car.picture.imageData
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    getFiles(files) {
        this.setState({
            imageName: "base-image-" + Date.now()
        })
        this.setState({
            imageData: files.base64.toString()
        })

    }

    onSubmit(id, e) {
        e.preventDefault();

        const newCar = {
            _id: id,
            brand: this.state.brand,
            model: this.state.model,
            prize: this.state.prize,
            year: this.state.year,
            kilometrage: this.state.kilometrage,
            cubic: this.state.cubic,
            kilowatts: this.state.kilowatts,
            transmission: this.state.transmission,
            fuelType: this.state.fuelType,
            doors: this.state.doors,
            colour: this.state.colour,
            condition: this.state.condition,
            details: this.state.details,
            imageName: this.state.imageName,
            imageData: this.state.imageData
        }

        this.props.updateCar(newCar, this.props.history);

        this.setState({
            brand: '',
            model: '',
            prize: '',
            year: '',
            kilometrage: '',
            cubic: '',
            kilowatts: '',
            transmission: '',
            fuelType: '',
            doors: '',
            colour: '',
            condition: '',
            details: '',
            imageName: '',
            imageData: ''
        })

    }

    render() {

        const { brand, model, prize, year, kilometrage, cubic, kilowatts, transmission, fuelType, doors, colour, condition, details, errors } = this.state;

        let content;

        if (this.props.cars.loading) {
            content = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />
        } else {
            content = (
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center mb-3">Edit Car</h3>
                        <form onSubmit={this.onSubmit.bind(this, this.props.match.params.id)} noValidate>
                            <div className="form-group">
                                <label htmlFor="brand">Choose brand of the vehicle: </label>
                                <select className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.brand })} name="brand" id="brand" onChange={this.onChange} value={brand}>
                                    <option value=""></option>
                                    <option value="Alfa Romeo">Alfa Romeo</option>
                                    <option value="Aston Martin">Aston Martin</option>
                                    <option value="Audi">Audi</option>
                                    <option value="Škoda">Skoda</option>
                                    <option value="BMW">BMW</option>
                                    <option value="Buggatti">Buggatti</option>
                                    <option value="Chevrolet">Chevrolet</option>
                                    <option value="Citroen">Citroen</option>
                                    <option value="Corvette">Corvette</option>
                                    <option value="Dacia">Dacia</option>
                                    <option value="Ferrari">Ferrari</option>
                                    <option value="Fiat">Fiat</option>
                                    <option value="Ford">Ford</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Hummer">Hummer</option>
                                    <option value="Hyundai">Hyundai</option>
                                    <option value="Jaguar">Jaguar</option>
                                    <option value="Jeep">Jeep</option>
                                    <option value="Kia">Kia</option>
                                    <option value="Lada">Lada</option>
                                    <option value="Lamborghini">Lamborghini</option>
                                    <option value="Mazda">Mazda</option>
                                    <option value="Mercedes">Mercedes</option>
                                    <option value="Mini">Mini</option>
                                    <option value="Mitsubishi">Mitsubishi</option>
                                    <option value="Nissan">Nissan</option>
                                    <option value="Opel">Opel</option>
                                    <option value="Peugeot">Peugeot</option>
                                    <option value="Porsche">Porsche</option>
                                    <option value="Renault">Renault</option>
                                    <option value="Rolls Royce">Rolls Royce</option>
                                    <option value="Rover">Rover</option>
                                    <option value="Seat">Seat</option>
                                    <option value="Smart">Smart</option>
                                    <option value="Suzuki">Suzuki</option>
                                    <option value="Tesla">Tesla</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Volkswagen">Volkswagen</option>
                                    <option value="Volvo">Volvo</option>
                                    <option value="Zastava">Zastava</option>
                                    <option value="Yugo">Yugo</option>
                                    <option value="Drugo">Other ...</option>
                                </select>
                                {errors.brand && (<div className="invalid-feedback">{errors.brand}</div>)}
                            </div>
                            <div className="form-group">
                                <input value={model} onChange={this.onChange} type="text" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.model })} name="model" id="model" placeholder="Model" />
                                {errors.model && (<div className="invalid-feedback">{errors.model}</div>)}
                            </div>
                            <div className="form-group">
                                <input value={prize} onChange={this.onChange} type="number" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.prize })} name="prize" id="prize" placeholder="Prize in EUR" />
                                {errors.prize && (<div className="invalid-feedback">{errors.prize}</div>)}
                            </div>
                            <div className="form-group">
                                <input value={year} onChange={this.onChange} type="number" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.year })} name="year" id="year" placeholder="Year" />
                                {errors.year && (<div className="invalid-feedback">{errors.year}</div>)}
                            </div>
                            <div className="form-group">
                                <input value={kilometrage} onChange={this.onChange} type="number" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.kilometrage })} name="kilometrage" id="kilometrage" placeholder="Kilometrage" />
                                {errors.kilometrage && (<div className="invalid-feedback">{errors.kilometrage}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cubic">Cubic:</label>
                                <select className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.cubic })} name="cubic" id="cubic" onChange={this.onChange} value={cubic}>
                                    <option value=""></option>
                                    <option value="1.0">1.0</option>
                                    <option value="1.1">1.1</option>
                                    <option value="1.2">1.2</option>
                                    <option value="1.3">1.3</option>
                                    <option value="1.4">1.4</option>
                                    <option value="1.5">1.5</option>
                                    <option value="1.6">1.6</option>
                                    <option value="1.7">1.7</option>
                                    <option value="1.8">1.8</option>
                                    <option value="1.9">1.9</option>
                                    <option value="2.0">2.0</option>
                                    <option value="2.1">2.1</option>
                                    <option value="2.2">2.2</option>
                                    <option value="2.3">2.3</option>
                                    <option value="2.4">2.4</option>
                                    <option value="2.5">2.5</option>
                                    <option value="2.6">2.6</option>
                                    <option value="2.7">2.7</option>
                                    <option value="2.8">2.8</option>
                                    <option value="2.9">2.9</option>
                                    <option value="3.0">3.0</option>
                                    <option value="3.1">3.1</option>
                                    <option value="3.2">3.2</option>
                                    <option value="3.3">3.3</option>
                                    <option value="3.4">3.4</option>
                                    <option value="3.5">3.5</option>
                                    <option value="3.6">3.6</option>
                                    <option value="3.7">3.7</option>
                                    <option value="3.8">3.8</option>
                                    <option value="3.9">3.9</option>
                                    <option value="4.0">4.0</option>
                                    <option value="4.1">4.1</option>
                                    <option value="4.2">4.2</option>
                                    <option value="4.3">4.3</option>
                                    <option value="4.4">4.4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="4.6">4.6</option>
                                    <option value="4.7">4.7</option>
                                    <option value="4.8">4.8</option>
                                    <option value="4.9">4.9</option>
                                    <option value="5.0">5.0</option>
                                </select>
                                {errors.cubic && (<div className="invalid-feedback">{errors.cubic}</div>)}
                            </div>
                            <div className="form-group">
                                <input value={kilowatts} onChange={this.onChange} type="number" className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.kilowatts })} name="kilowatts" id="kilowatts" placeholder="Kilowatts (KW)" />
                                {errors.kilowatts && (<div className="invalid-feedback">{errors.kilowatts}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="transmission">Transmission:</label>
                                <select className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.transmission })} name="transmission" id="transmission" onChange={this.onChange} value={transmission}>
                                    <option value=""></option>
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Semi-automatic">Semi-automatic</option>
                                </select>
                                {errors.transmission && (<div className="invalid-feedback">{errors.transmission}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="fuelType">Fuel type:</label>
                                <select className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.fuelType })} name="fuelType" id="fuelType" onChange={this.onChange} value={fuelType}>
                                    <option value=""></option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="Gas">Gas</option>
                                </select>
                                {errors.fuelType && (<div className="invalid-feedback">{errors.fuelType}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="doors">Doors:</label>
                                <select className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.doors })} name="doors" id="doors" onChange={this.onChange} value={doors}>
                                    <option value=""></option>
                                    <option value="2/3">2/3</option>
                                    <option value="4/5">4/5</option>
                                </select>
                                {errors.doors && (<div className="invalid-feedback">{errors.doors}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="colour">Colour:</label>
                                <select className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.colour })} name="colour" id="colour" onChange={this.onChange} value={colour}>
                                    <option value=""></option>
                                    <option value="White">White</option>
                                    <option value="Black">Black</option>
                                    <option value="Red">Red</option>
                                    <option value="Purple">Purple</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Gray">Gray</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Green">Green</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Yellow">Yellow</option>
                                </select>
                                {errors.colour && (<div className="invalid-feedback">{errors.colour}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="condition">Condition:</label>
                                <select className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.condition })} name="condition" id="condition" onChange={this.onChange} value={condition}>
                                    <option value=""></option>
                                    <option value="Used-car">Used-car</option>
                                    <option value="New-car">New-car</option>
                                </select>
                                {errors.condition && (<div className="invalid-feedback">{errors.condition}</div>)}
                            </div>
                            <div className="form-group">
                                <textarea className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.details })} name="details" id="details" cols="30" rows="5" onChange={this.onChange} value={details} placeholder="Extra details"></textarea>
                                {errors.details && (<div className="invalid-feedback">{errors.details}</div>)}
                            </div>
                            <div className="form-group">
                                <p className="lead">Choose main photo: </p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles.bind(this)}></FileBase>
                                <img className="mt-3" src={this.state.imageData} alt="" />
                            </div>
                            <button onSubmit={this.onSubmit} className="btn btn-primary btn-block mt-4 mb-4">Update car</button>
                        </form>
                    </div>
                </div>
            )
        }

        return (
            <div className="edit-car">
                <div className="container">
                    {content}
                </div>
            </div>
        )
    }
}

EditCar.propTypes = {
    errors: PropTypes.object.isRequired,
    cars: PropTypes.object.isRequired,
    getCarByID: PropTypes.func.isRequired,
    updateCar: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    cars: state.cars
});

export default connect(mapStateToProps, { getCarByID, updateCar })(withRouter(EditCar));