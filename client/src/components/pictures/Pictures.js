import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Pictures extends Component {

    constructor() {
        super();
        this.state = {
            part: 'front'
        }
    }

    onClick() {
        const { part } = this.state;

        if (part === 'front') {
            this.setState({
                part: 'back'
            })
        }

        if (part === 'back') {
            this.setState({
                part: 'left'
            })
        }

        if (part === 'left') {
            this.setState({
                part: 'right'
            })
        }

        if (part === 'right') {
            this.setState({
                part: 'inside'
            })
        }
    }

    onClick2() {
        const { part } = this.state;

        if (part === 'inside') {
            this.setState({
                part: 'right'
            })
        }

        if (part === 'right') {
            this.setState({
                part: 'left'
            })
        }

        if (part === 'left') {
            this.setState({
                part: 'back'
            })
        }

        if (part === 'back') {
            this.setState({
                part: 'front'
            })
        }

        if (part === 'front') {
            this.props.history.push(`/car/${this.props.pictures.pictures.car}`);
        }
    }

    render() {

        const { pictures } = this.props.pictures;

        const navbar = (
            <nav className="navbar navbar-expand-sm navbar-dark mb-3" style={{ backgroundColor: '#373737' }}>


                <button onClick={this.onClick2.bind(this)} className="nav-link btn-secondary">Back</button>


                {this.state.part !== 'inside' ? (
                    <button onClick={this.onClick.bind(this)} className="nav-link btn-secondary ml-auto" style={{ float: 'right' }}>Next</button>
                ) : null}


            </nav>
        )

        const content = (
            <div className="container">
                {navbar}

                {this.state.part === 'front' ? (
                    <img style={{ maxWidth: '1000px' }} src={pictures.front.imageData1} alt="" />
                ) : null}

                {this.state.part === 'back' ? (
                    <img style={{ maxWidth: '1000px' }} src={pictures.back.imageData2} alt="" />

                ) : null}

                {this.state.part === 'left' ? (
                    <img style={{ maxWidth: '1000px' }} src={pictures.left.imageData3} alt="" />
                ) : null}

                {this.state.part === 'right' ? (
                    <img style={{ maxWidth: '1000px' }} src={pictures.right.imageData4} alt="" />
                ) : null}

                {this.state.part === 'inside' ? (
                    <img style={{ maxWidth: '1000px' }} src={pictures.inside.imageData5} alt="" />
                ) : null}

            </div>
        )

        return (
            <div className="container">
                {content}
            </div>
        )
    }
}

Pictures.propTypes = {
    pictures: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    pictures: state.pictures
})

export default connect(mapStateToProps, {})(Pictures);
