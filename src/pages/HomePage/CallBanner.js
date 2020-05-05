import React from 'react';
import CallBannerImage from '../../assets/images/call-banner.jpg';

const CallBanner = () => {

    return <>
        <div className="call-banner content-container-p0">
            <img className="img-fluid" src={CallBannerImage} alt="Call Banner" />
        </div>
    </>;

}

export default CallBanner;