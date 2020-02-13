import React from 'react';
import euFlagImege from '../../../assets/images/document-images/eu_flag.png';

const FamilyApplication = (props) => {

    const renderFamilyInformation = () => {
        return (
            <>
                <table>
                    <thead>
                        <img src={euFlagImege} />
                    </thead>

                    <tbody>

                        <h1>асдсадсда {props.family.id}</h1>

                    </tbody>

                    <tfoot>

                    </tfoot>
                </table>
            </>
        );
    }

    return (
        renderFamilyInformation()
    );

}

export default FamilyApplication;