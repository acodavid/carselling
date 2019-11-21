import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCars } from '../../actions/carActions';
import fidgetspinner from '../../img/fidgetspinner.gif';
import Posts from '../layout/Posts';
import Pagination from '../layout/Pagination';



class Cars extends Component {

    constructor() {
        super();
        this.state = {
            brand: '',
            model: '',
            prizeMin: '',
            prizeMax: '',
            fuelType: '',
            yearMin: '',
            yearMax: '',
            transmission: '',
            condition: '',
            doors: '',
            kilometrageMin: '',
            kilometrageMax: '',
            colour: '',
            filter: [],
            flag: false,
            currentPage: 1,
            postsPerPage: 5,
            showFilterPart: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showFilter = this.showFilter.bind(this);
    }

    componentDidMount() {
        this.props.getCars();
        window.scroll(0, 0);
    }

    showFilter() {
        this.setState({
            showFilterPart: !this.state.showFilterPart
        }
        )
    }

    onSubmit(e) {
        e.preventDefault();

        const { cars } = this.props.cars;
        const { brand, model, prizeMin, prizeMax, fuelType, yearMax, yearMin, transmission, condition, doors, kilometrageMin, kilometrageMax, colour } = this.state;

        this.setState({
            flag: true
        })

        let filter = cars;

        //brand
        if (brand !== '') {
            filter = filter.filter(item => item.brand === brand)
        }

        //model
        if (model !== '') {
            filter = filter.filter(item => item.model === model)
        }

        //prize
        if (prizeMin !== '') {
            filter = filter.filter(item => parseFloat(item.prize) > parseFloat(prizeMin))
        }
        if (prizeMax !== '') {
            filter = filter.filter(item => parseFloat(item.prize) < parseFloat(prizeMax))
        }

        //fuelType
        if (fuelType !== '') {
            filter = filter.filter(item => item.fuelType === fuelType)
        }

        //year
        if (yearMin !== '') {
            filter = filter.filter(item => parseFloat(item.year) > parseFloat(yearMin))
        }
        if (yearMax !== '') {
            filter = filter.filter(item => parseFloat(item.year) < parseFloat(yearMax))
        }

        //year
        if (kilometrageMin !== '') {
            filter = filter.filter(item => parseFloat(item.kilometrage) > parseFloat(kilometrageMin))
        }
        if (kilometrageMax !== '') {
            filter = filter.filter(item => parseFloat(item.kilometrage) < parseFloat(kilometrageMax))
        }

        //transmission
        if (transmission !== '') {
            filter = filter.filter(item => item.transmission === transmission)
        }

        //condition
        if (condition !== '') {
            filter = filter.filter(item => item.condition === condition)
        }

        //doors
        if (doors !== '') {
            filter = filter.filter(item => item.doors === doors)
        }

        //colour
        if (colour !== '') {
            filter = filter.filter(item => item.colour === colour)
        }

        this.setState({
            filter
        })



    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { cars } = this.props.cars;
        const { brand, model, prizeMin, prizeMax, fuelType, yearMin, yearMax, transmission, condition, doors, kilometrageMax, kilometrageMin, colour, currentPage, postsPerPage, showFilterPart } = this.state;

        let carItem;
        let filterItem;

        if (cars === null) {
            carItem = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />
        } else {

            if (cars.length > 0) {

                const indexOfLastPost = currentPage * postsPerPage;
                const indexOfFirstPost = indexOfLastPost - postsPerPage;
                const currentPosts = cars.slice(indexOfFirstPost, indexOfLastPost);
                let currentFilteredPost;
                if (this.state.filter !== []) {
                    currentFilteredPost = this.state.filter.slice(indexOfFirstPost, indexOfLastPost)
                }

                const paginate = pageNumber => {
                    this.setState({
                        currentPage: pageNumber
                    })

                    window.scroll(0, 0);
                }

                carItem = (
                    <div className="cars">
                        <Posts cars={currentPosts} />
                        <div className="m-auto">
                            {cars.length < 5 ? null : (
                                <Pagination postsPerPage={postsPerPage} totalPosts={cars.length} paginate={paginate} />
                            )}

                        </div>

                    </div>
                )

                filterItem = (
                    <div className="filtered-cars">
                        <Posts cars={currentFilteredPost} />
                        <div className="m-auto">
                            {this.state.filter.length < 5 ? null : (
                                <Pagination postsPerPage={postsPerPage} totalPosts={this.state.filter.length} paginate={paginate} />
                            )}

                        </div>

                    </div>
                )

            } else {
                carItem = <h3 className="text-center mt-4">There isn't any car for sale...</h3>
            }

        }

        return (
            <div className="cars-display">
                <div className="container">
                    <div className="row">
                        <Link className="btn btn-primary btn-block mb-1" to="/add/car">Add car</Link>
                        <button className="btn btn-secondary btn-block mb-3" onClick={this.showFilter}>Search for Cars</button>
                    </div>

                    {showFilterPart ? (
                        <div className="row">
                            <div className="col-md-3" style={{ backgroundColor: '#303030' }}>
                                <p className="lead" style={{ fontSize: '25px' }}>Filter:</p>
                                <form onSubmit={this.onSubmit}>
                                    <label htmlFor="brand">Choose brand of the vehicle: </label>
                                    <select
                                        name="brand"
                                        id="brand"
                                        className="form-control form-control-lg mb-1"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        onChange={this.onChange}
                                        value={brand}>
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

                                    <input
                                        type="text"
                                        name="model"
                                        id="model"
                                        onChange={this.onChange}
                                        value={model}
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        placeholder="Model"
                                    />

                                    <label htmlFor="prizeMin">Minimum and maximum prize: </label>

                                    <input
                                        type="number"
                                        name="prizeMin"
                                        id="prizeMin"
                                        onChange={this.onChange}
                                        value={prizeMin}
                                        className="form-control form-control-lg mb-1"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        placeholder="Prize Min"
                                    />

                                    <input
                                        type="number"
                                        name="prizeMax"
                                        id="prizeMax"
                                        onChange={this.onChange}
                                        value={prizeMax}
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        placeholder="Prize Max"
                                    />

                                    <div className="row mb-3">
                                        <p className="ml-3">Minimum and maximum year: </p>
                                        <div className="col-md-6">
                                            <input
                                                type="number"
                                                name="yearMin"
                                                id="yearMin"
                                                onChange={this.onChange}
                                                value={yearMin}
                                                className="form-control mb-1"
                                                style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                                placeholder="Year Min"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="number"
                                                name="yearMax"
                                                id="yearMax"
                                                onChange={this.onChange}
                                                value={yearMax}
                                                className="form-control"
                                                style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                                placeholder="Year Max"
                                            />
                                        </div>
                                    </div>

                                    <label htmlFor="prizeMin">Minimum and maximum kilometrage: </label>

                                    <input
                                        type="number"
                                        name="kilometrageMin"
                                        id="kilometrageMin"
                                        onChange={this.onChange}
                                        value={kilometrageMin}
                                        className="form-control form-control-lg mb-1"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        placeholder="Kilometrage Min"
                                    />

                                    <input
                                        type="number"
                                        name="kilometrageMax"
                                        id="kilometrageMax"
                                        onChange={this.onChange}
                                        value={kilometrageMax}
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        placeholder="Kilometrage Max"
                                    />

                                    <label htmlFor="fuelType">Fuel type:</label>
                                    <select
                                        name="fuelType"
                                        value={fuelType}
                                        id="fuelType"
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        onChange={this.onChange}
                                    >
                                        <option value=""></option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Gasoline">Gasoline</option>
                                        <option value="Gas">Gas</option>

                                    </select>

                                    <label htmlFor="transmission">Transmission:</label>
                                    <select
                                        name="transmission"
                                        value={transmission}
                                        id="transmission"
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        onChange={this.onChange}
                                    >
                                        <option value=""></option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Semi-automatic">Semi-automatic</option>

                                    </select>

                                    <label htmlFor="condition">Condition:</label>
                                    <select
                                        name="condition"
                                        value={condition}
                                        id="condition"
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        onChange={this.onChange}
                                    >
                                        <option value=""></option>
                                        <option value="Used-car">Used-car</option>
                                        <option value="New-car">New-car</option>

                                    </select>

                                    <label htmlFor="doors">Doors:</label>
                                    <select
                                        name="doors"
                                        value={doors}
                                        id="doors"
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        onChange={this.onChange}
                                    >
                                        <option value=""></option>
                                        <option value="2/3">2/3</option>
                                        <option value="4/5">4/5</option>

                                    </select>

                                    <label htmlFor="colour">Colour:</label>
                                    <select
                                        name="colour"
                                        value={colour}
                                        id="colour"
                                        className="form-control form-control-lg mb-3"
                                        style={{ backgroundColor: '#505050', color: '#ffffff' }}
                                        onChange={this.onChange}
                                    >
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

                                    <button onSubmit={this.onSubmit} className="btn btn-primary btn-block">Search cars</button>

                                </form>
                            </div>
                            <div className="col-md-9">
                                {this.state.flag ? (
                                    filterItem
                                ) : (
                                        carItem
                                    )}
                                {(this.state.flag === true && this.state.filter.length === 0) ? (
                                    <h3 className="text-center mt-4">There isn't any car with that specification</h3>
                                ) : null}
                            </div>
                        </div>
                    ) : (
                            <div className="m-auto">
                                {this.state.flag ? (
                                    filterItem
                                ) : (
                                        carItem
                                    )}
                                {(this.state.flag === true && this.state.filter.length === 0) ? (
                                    <h3 className="text-center mt-4">There isn't any car with that specification</h3>
                                ) : null}
                            </div>
                        )}


                </div>
            </div>
        )
    }
}

Cars.propTypes = {
    cars: PropTypes.object.isRequired,
    getCars: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    cars: state.cars
});

export default connect(mapStateToProps, { getCars })(Cars);