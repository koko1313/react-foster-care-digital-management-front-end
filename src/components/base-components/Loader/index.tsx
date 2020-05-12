import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";

interface Props {
    loading: boolean;
    fullScreen?: boolean;
}

const Loader = (props: Props) => {

    const overrideCss = `
        text-align: center;
    `;

    const fullScreenCss = `
        background-color: rgba(225, 225, 225, 0.8);
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

    return <>
        <ScaleLoader 
            loading={props.loading} 
            css={override} 
            color={"#A2C614"} 
        />
    </>;

}

export default Loader;