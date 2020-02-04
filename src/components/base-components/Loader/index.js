import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import './style.scss';

const Loader = (props) => {

    return (
        <div className="loader">
            <ScaleLoader loading={props.loading} />
        </div>
    );

}

export default Loader;