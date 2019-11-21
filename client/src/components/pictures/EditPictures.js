import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePictures, getPictures, clearPictures } from '../../actions/pictureActions';
import FileBase from 'react-file-base64';
import fidgetspinner from '../../img/fidgetspinner.gif';

class EditPictures extends Component {

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

    }

    componentDidMount() {
        this.props.clearPictures();
        this.props.getPictures(this.props.match.params.car_id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.pictures.pictures) {
            const pictures = nextProps.pictures.pictures;

            this.setState({
                imageName1: pictures.front.imageName1,
                imageData1: pictures.front.imageData1,
                imageName2: pictures.back.imageName2,
                imageData2: pictures.back.imageData2,
                imageName3: pictures.left.imageName3,
                imageData3: pictures.left.imageData3,
                imageName4: pictures.right.imageName4,
                imageData4: pictures.right.imageData4,
                imageName5: pictures.inside.imageName5,
                imageData5: pictures.inside.imageData5
            })
        }

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
            this.props.history.push(`/car/${this.props.pictures.pictures.car}`);
        }
    }

    onSubmit(id, car_id, e) {
        e.preventDefault();

        const { imageData1, imageData2, imageData3, imageData4, imageData5, imageName1, imageName2, imageName3, imageName4, imageName5 } = this.state;

        const pictures = {
            _id: id,
            car: car_id,
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

        this.props.updatePictures(pictures, this.props.history);

    }

    render() {

        const { pictures, loading } = this.props.pictures;

        const { imageData1, imageData2, imageData3, imageData4, imageData5 } = this.state;

        let navbar;

        let content;

        if (loading || pictures === null) {
            content = <img className="m-auto" style={{ width: '300px', display: 'block' }} src={fidgetspinner} alt="Loading" />

            navbar = null;
        } else {

            navbar = (
                <div>
                    <h3 style={{ textAlign: 'center' }}>Update photos</h3>
                    <nav className="navbar navbar-expand-sm navbar-dark mb-3" style={{ backgroundColor: '#373737' }}>

                        <button onClick={this.onClick2.bind(this)} className="nav-link btn-secondary">Back</button>

                        {this.state.part !== 'inside' ? (
                            <button onClick={this.onClick.bind(this)} className="nav-link btn-secondary ml-auto" style={{ float: 'right' }}>Next</button>
                        ) : null}


                    </nav>
                </div>

            )

            content = (
                <form onSubmit={this.onSubmit.bind(this, this.props.match.params.id, this.props.match.params.car_id)}>

                    {this.state.part === 'front' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={imageData1} alt="Front" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of front of your car if you want to change it.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles1.bind(this)}></FileBase>
                            </div>
                        </div>
                    ) : null}

                    {this.state.part === 'back' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={imageData2} alt="Back" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of back of your car if you want to change it.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles2.bind(this)}></FileBase>
                            </div>
                        </div>

                    ) : null}

                    {this.state.part === 'left' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={imageData3} alt="Left" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of left side of your car if you want to change it.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles3.bind(this)}></FileBase>
                            </div>
                        </div>
                    ) : null}

                    {this.state.part === 'right' ? (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={imageData4} alt="Right" />
                            </div>
                            <div className="col-md-6">
                                <p>Upload photo of right side of your car if you want to change it.</p>
                                <FileBase type="file" multiple={false} onDone={this.getFiles4.bind(this)}></FileBase>
                            </div>
                        </div>
                    ) : null}

                    {this.state.part === 'inside' ? (
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={imageData5} alt="Inside" />
                                </div>
                                <div className="col-md-6">
                                    <p>Upload photo of inside of your car if you want to change it.</p>
                                    <FileBase type="file" multiple={false} onDone={this.getFiles5.bind(this)}></FileBase>
                                </div>
                            </div>
                            <button onSubmit={this.onSubmit} className="btn btn-primary btn-block mt-4 mb-4">Update Photos</button>
                        </div>
                    ) : null}

                </form>
            )

        }

        return (
            <div className="edtphotos">
                <div className="container">
                    {navbar}
                    {content}
                </div>

            </div>
        )
    }
}

EditPictures.propTypes = {
    auth: PropTypes.object.isRequired,
    pictures: PropTypes.object.isRequired,
    updatePictures: PropTypes.func.isRequired,
    getPictures: PropTypes.func.isRequired,
    clearPictures: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    pictures: state.pictures
})

export default connect(mapStateToProps, { updatePictures, getPictures, clearPictures })(withRouter(EditPictures));
