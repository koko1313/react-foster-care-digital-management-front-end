import React from 'react';
import './style.scss';

/**
 * @param {Object} child 
 */
const DetailsComponent = (props) => {

    const renderChildInformation = () => {
        if(!props.child) return;

        const child = props.child;

        return (
            <>
                <h2>Детайли</h2>

                <div className="info-section">
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">Имена</div>
                        <div className="col info-body">{`${child.first_name} ${child.second_name} ${child.last_name}`}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">ЕГН</div>
                        <div className="col info-body">{child.egn}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">Пол</div>
                        <div className="col info-body">{child.gender}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">Адрес</div>
                        <div className="col info-body">{`${child.region.name}, ${child.sub_region.name}, ${child.city.name}, ${child.address}`}</div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {renderChildInformation()}
        </>
    );

}

export default DetailsComponent;