import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";

const Loader = (props) => {

    const overrideCss = `
        text-align: center;
    `;

    const fullScreenCss = `
        background-color: rgba(150, 150, 150, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 50vh 0;
    `;

    const override = css`
        ${overrideCss}
        ${props.fullScreen ? fullScreenCss : null}
    `;

    return (
        <ScaleLoader 
            loading={props.loading} 
            css={override} 
            color={"#A2C614"} 
        />
    );

}

export default Loader;