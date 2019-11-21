import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteQuestion } from '../../actions/carActions';

class Question extends Component {

    onDeleteClick(carId, questionId) {
        this.props.deleteQuestion(carId, questionId);
    }

    render() {


        const { questions, carId, auth, cars } = this.props;
        const { date } = this.props.questions;

        let hour = parseInt(date.slice(11, 13));
        if (hour < 22) {
            hour = hour + 2;
        } else if (hour === 22) {
            hour = 0;
        } else if (hour === 23) {
            hour = 1;
        }

        const minutes = date.slice(14, 16);



        return (
            <div className="container mt-3 mb-3">
                <div className="card card-secondary">

                    {cars.car.user === questions.user ? (
                        <div className="card-header bg-primary text-white">
                            <p className="lead" style={{ fontSize: '18px' }}> <Link to={`/profile/${questions.name}`} style={{ color: 'white' }}>{questions.name}</Link>
                                {questions.user === auth.user.id ? (
                                    <button
                                        onClick={this.onDeleteClick.bind(this, carId, questions._id)}
                                        type="button"
                                        className="btn btn-danger"
                                        style={{ float: 'right' }}
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                ) : null}</p>

                        </div>)
                        : (
                            <div className="card-header bg-secondary text-white">
                                <p className="lead m-auto" style={{ fontSize: '18px' }}><Link to={`/profile/${questions.name}`} style={{ color: 'white' }}>{questions.name}</Link> {questions.user === auth.user.id ? (
                                    <button
                                        onClick={this.onDeleteClick.bind(this, carId, questions._id)}
                                        type="button"
                                        className="btn btn-danger"
                                        style={{ float: 'right' }}
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                ) : null}</p>

                            </div>)}


                    <div className="card-body">
                        <p className="lead">{questions.text}</p>
                    </div>
                    <div className="card-footer">
                        <p className="text-muted m-auto" style={{ display: "inline-block" }}>{date.slice(8, 10) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4) + '.'}</p>
                        <p className="text-muted m-auto" style={{ float: "right" }}>{hour + ':' + minutes}</p>
                    </div>
                </div>
            </div>
        )
    }
}

Question.propTypes = {
    questions: PropTypes.object.isRequired,
    carId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    cars: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    cars: state.cars
});

export default connect(mapStateToProps, { deleteQuestion })(Question);