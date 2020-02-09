import React, { useState, useEffect } from 'react';
import { Button, Modal as ReactstrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../../redux/actions';

const Alert = () => {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const alert = useSelector(state => state.alert);

    useEffect(() => {
        if(alert.title || alert.message) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [alert]);

    const toggle = () => {
        if(isOpen) {
            dispatch(actions.removeAlert());
            setIsOpen(false);
        } else {
            dispatch(actions.setAlert({title: alert.title, message: alert.message}));
            setIsOpen(true);
        }
    }

    return (
        <div>
            <ReactstrapModal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{alert.title}</ModalHeader>

                <ModalBody>
                    {alert.message}
                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Затвори</Button>
                </ModalFooter>
            </ReactstrapModal>
        </div>
    );
}

export default Alert;