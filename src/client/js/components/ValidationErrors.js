import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ValidationErrors extends React.Component {
    render() {
        const {validationResult} = this.props;

        if (validationResult.length > 0) {
            return <ul className="validation-errors">
                {
                    validationResult.map((error, ind) => 
                        <li className="validation-errors__error" key={ind}>{error}</li>
                    )
                }
            </ul>;
        }

        return null;
    }
}

ValidationErrors.propTypes = {
    validationResult: PropTypes.array
};

export default connect(state => {
    return {
        validationResult: state.validationResult
    };
})(ValidationErrors);