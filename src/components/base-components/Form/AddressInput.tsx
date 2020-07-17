import React, { ChangeEventHandler } from 'react';
import RegionsSelect from './Select/RegionsSelect';
import SubRegionsSelect from './Select/SubRegionsSelect';
import CitiesSelect from './Select/CitiesSelect';
import Input from './Input';

interface Props {
    id: string;
    region: string;
    subRegion: string;
    city: string;
    address: string;
    regionOnChange: ChangeEventHandler;
    subRegionOnChange: ChangeEventHandler;
    cityOnChange: ChangeEventHandler;
    addressOnChange: ChangeEventHandler;
    required: boolean;
    fullAddress: boolean;
    isRegionInvalid: boolean;
    isSubRegionInvalid: boolean;
    isCityInvalid: boolean;
    isAddressInvalid: boolean;
    selectedRegionId: number;
    selectedSubRegionId: number;
}

const AddressInput = (props: Props) => {

    return <>
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
                    selectedRegionId = {props.selectedRegionId}
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
                    selectedSubRegionId = {props.selectedSubRegionId}
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
    </>;

}

export default AddressInput;