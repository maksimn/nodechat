import React from 'react';
import {connect} from 'react-redux';

class ValidationErrors extends React.Component {
    render() {
        const {source, validationErrorData} = this.props;

        if (source === validationErrorData.source && validationErrorData.errors.length > 0) {
            return <ul className="validation-errors">
                {validationErrorData.errors.map((error, ind) => 
                    <li className="validation-errors__error" key={ind}>{error}</li>)}
            </ul>;
        }

        return null;
    }
}

export default connect(state => {
    return {
        validationErrorData: state.validationErrorData
    };
})(ValidationErrors);