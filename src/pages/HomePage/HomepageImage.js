import React from 'react';
import image from '../../assets/images/image.jpg';

const HomepageImage = () => {

    return <>
        <div className="homepage-image content-container-p0">
            <img className="img-fluid" src={image} alt="family-front-house" />
            <a className="img-credit" href="http://www.freepik.com" target="_blank" rel="noopener noreferrer">Designed by brgfx / Freepik</a>
        </div>
    </>;

}

export default HomepageImage;