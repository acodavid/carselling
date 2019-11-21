import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postPictures } from '../../actions/pictureActions';
import FileBase from 'react-file-base64';
import front from '../../img/front.png';
import back from '../../img/back.png';
import left from '../../img/left.png';
import inside from '../../img/inside.png';
import fidgetspinner from '../../img/fidgetspinner.gif';

class AddPictures extends Component {

    constructor() {
        super();
        this.state = {
            part: 'front',
            imageName1: '',
            imageData1: '',
            imageName2: '',
            imageData2: '',
            imageName3: '',
            imageData3: '',
            imageName4: '',
            imageData4: '',
            imageName5: '',
            imageData5: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }


    getFiles1(files) {
        this.setState({
            imageName1: "base-image-" + Date.now()
        })
        this.setState({
            imageData1: files.base64.toString()
        })

    }

    getFiles2(files) {
        this.setState({
            imageName2: "base-image-" + Date.now()
        })
        this.setState({
            imageData2: files.base64.toString()
        })

    }

    getFiles3(files) {
        this.setState({
            imageName3: "base-image-" + Date.now()
        })
        this.setState({
            imageData3: files.base64.toString()
        })

    }

    getFiles4(files) {
        this.setState({
            imageName4: "base-image-" + Date.now()
        })
        this.setState({
            imageData4: files.base64.toString()
        })

    }

    getFiles5(files) {
        this.setState({
            imageName5: "base-image-" + Date.now()
        })
        this.setState({
            imageData5: files.base64.toString()
        })

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
            this.props.history.push(`/car/${this.props.cars.car._id}`);
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { imageData1, imageData2, imageData3, imageData4, imageData5, imageName1, imageName2, imageName3, imageName4, imageName5 } = this.state;

        const pictures = {
            user: this.props.auth.user.id,
            car: this.props.match.params.id,
            imageName1,
            imageData1,
            imageName2,
            imageData2,
            imageName3,
            imageData3,
            imageName4,
            imageData4,
            imageName5,
            imageData5
        }

        this.props.postPictures(pictures, this.props.history);

    }

    render() {

        const { loading } = this.props.pictures;
        const { pictures } = this.props.errors;

        let navbar;

        let content;

        if (loading) {
            content = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />

            navbar = null;
        } else {


            navbar = (
                <div>
                    <h3 style={{ textAlign: 'center' }}>Add photos</h3>
                    <nav className="navbar navbar-expand-sm navbar-dark mb-3" style={{ backgroundColor: '#373737' }}>

                        <button onClick={this.onClick2.bind(this)} className="nav-link btn-secondary">Back</button>


                        {this.state.part !== 'inside' ? (
                            <button onClick={this.onClick.bind(this)} className="nav-link btn-secondary ml-auto" style={{ float: 'right' }}>Next</button>
                        ) : null}


                    </nav>
                </div>

            )

            content = (
                <form onSubmit={this.onSubmit}>

                    {this.state.part === 'front' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={front} alt="Front" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of front of your car as you can see at the example.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles1.bind(this)}></FileBase>
                                {this.state.imageData1 ? (
                                    <img src={this.state.imageData1} alt="" style={{ maxWidth: '500px', marginTop: '15px' }} />
                                ) : null}
                            </div>
                        </div>
                    ) : null}

                    {this.state.part === 'back' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={back} alt="Back" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of back of your car as you can see at the example.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles2.bind(this)}></FileBase>
                                {this.state.imageData2 ? (
                                    <img src={this.state.imageData2} alt="" style={{ maxWidth: '500px', marginTop: '15px' }} />
                                ) : null}
                            </div>
                        </div>

                    ) : null}

                    {this.state.part === 'left' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={left} alt="Left" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of left side of your car as you can see at the example.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles3.bind(this)}></FileBase>
                                {this.state.imageData3 ? (
                                    <img src={this.state.imageData3} alt="" style={{ maxWidth: '500px', marginTop: '15px' }} />
                                ) : null}
                            </div>
                        </div>
                    ) : null}

                    {this.state.part === 'right' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={left} alt="Right" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of right side of your car as you can see at the example.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles4.bind(this)}></FileBase>
                                {this.state.imageData4 ? (
                                    <img src={this.state.imageData4} alt="" style={{ maxWidth: '500px', marginTop: '15px' }} />
                                ) : null}
                            </div>
                        </div>
                    ) : null}

                    {this.state.part === 'inside' ? (
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={inside} alt="Inside" />
                                </div>
                                <div className="col-md-6">
                                    <p>Upload photo of inside of your car as you can see at the example.</p>
                                    <FileBase type="file" multiple={false} onDone={this.getFiles5.bind(this)}></FileBase>
                                    {this.state.imageData5 ? (
                                        <img src={this.state.imageData5} alt="" style={{ maxWidth: '500px', marginTop: '15px' }} />
                                    ) : null}
                                    {pictures ? (
                                        <p style={{ color: 'red', marginTop: '20px' }}>{pictures}</p>
                                    ) : null}
                                    {}
                                </div>
                            </div>
                            <button onSubmit={this.onSubmit} className="btn btn-primary btn-block mt-4 mb-4">Add Photos</button>
                        </div>

                    ) : null}



                </form>
            )

        }

        return (
            <div className="addphotos">
                <div className="container">
                    {navbar}
                    {content}
                </div>

            </div>
        )
    }
}

AddPictures.propTypes = {
    auth: PropTypes.object.isRequired,
    pictures: PropTypes.object.isRequired,
    cars: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postPictures: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    pictures: state.pictures,
    cars: state.cars,
    errors: state.errors
})

export default connect(mapStateToProps, { postPictures })(withRouter(AddPictures));
