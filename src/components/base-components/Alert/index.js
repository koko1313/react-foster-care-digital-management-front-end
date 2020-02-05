import React, { useState, useEffect } from 'react';
import {Alert as ReactstrapAlert} from 'reactstrap';

const Alert = (props) => {

    const [message, setMassage] = useState(null);

    const onDismiss = () => {
        setMassage(null);
    }

    useEffect(() => {
        setMassage(props.message);
    }, [props]);

    return (
        <ReactstrapAlert color={props.color} isOpen={message ? true : false} toggle={onDismiss}>
            {props.message}
        </ReactstrapAlert>
    );

}

export default Alert;