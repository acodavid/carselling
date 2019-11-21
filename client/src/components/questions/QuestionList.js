import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

class QuestionList extends Component {
    render() {
        const { questions, carId } = this.props;

        return questions.map(item => (
            <Question key={item._id} questions={item} carId={carId} />
        ));
    }
}

QuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
    carId: PropTypes.string.isRequired
};

export default QuestionList;