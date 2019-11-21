import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addQuestion } from '../../actions/carActions'

class QuestionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { profile } = this.props.profile;
        const { carId } = this.props;

        const newQuestion = {
            text: this.state.text,
            name: profile.username,
        };

        this.props.addQuestion(carId, newQuestion);
        this.setState({ text: '' });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {

        const { errors, text } = this.state;

        return (
            <div className="question-form">
                <div className="container">
                    <div className="card card-primary">
                        <div className="card-header bg-secondary text-white">
                            Questions and answers:
                </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <textarea className={classnames('form-control form-control-lg mb-1', { 'is-invalid': errors.text })} name="text" id="text" cols="30" rows="2" onChange={this.onChange} value={text} placeholder="Unesite text"></textarea>
                                    {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

QuestionForm.propTypes = {
    addQuestion: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    carId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addQuestion })(QuestionForm); 
