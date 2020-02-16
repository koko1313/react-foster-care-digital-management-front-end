import React from 'react';
import RegionsSelect from './Select/RegionsSelect';
import SubRegionsSelect from './Select/SubRegionsSelect';
import CitiesSelect from './Select/CitiesSelect';
import Input from './Input';

/**
 * @param {string} id 
 * @param {string} region
 * @param {string} subRegion
 * @param {string} city
 * @param {string} address
 * @param {function} regionOnChange
 * @param {function} subRegionOnChange
 * @param {function} cityOnChange
 * @param {function} addressOnChange
 * @param {bool} required
 * @param {bool} fullAddress include address field
 * 
 * @param {bool} isRegionInvalid
 * @param {bool} isSubRegionInvalid
 * @param {bool} isCityInvalid
 * @param {bool} isAddressInvalid
 */
const AddressInput = (props) => {

    return (
        <>
            <div className="form-row">
                <div className="col-md">
                    <RegionsSelect 
                        id = {`region_${props.id}`} 
                        label = "Област" 
                        placeholder = "Избери област ..." 
                        onChange = {props.regionOnChange} 
                        value = {props.region} 
                        required = {props.required} 
                        isInvalid = {props.isRegionInvalid}
                    />
                </div>

                <div className="col-md">
                    <SubRegionsSelect 
                        id = {`subRegion_${props.id}`} 
                        label = "Община" 
                        placeholder = "Избери община ..." 
                        onChange = {props.subRegionOnChange} 
                        value = {props.subRegion} 
                        required = {props.required} 
                        isInvalid = {props.isSubRegionInvalid}
                    />
                </div>

                <div className="col-md">
                    <CitiesSelect 
                        id = {`city_${props.id}`} 
                        label = "Град" 
                        placeholder = "Избери град ..." 
                        onChange = {props.cityOnChange} 
                        value = {props.city} 
                        required = {props.required} 
                        isInvalid = {props.isCityInvalid}
                    />
                </div>
            </div>
            
            {props.fullAddress &&
                <Input 
                    id = {`address_${props.id}`} 
                    label = "Адрес" 
                    type = "text" 
                    placeholder = "Адрес ..." 
                    onChange = {props.addressOnChange} 
                    value = {props.address} 
                    required = {props.required} 
                    isInvalid = {props.isAddressInvalid}
                />
            }
        </>
    );

}

export default AddressInput;