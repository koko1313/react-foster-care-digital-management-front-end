import React, { useState, useEffect, ChangeEventHandler } from 'react';
import Select from './Select';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';

interface Props {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    onChange: ChangeEventHandler;
    required: boolean;
    isInvalid: boolean;
    loading?: boolean;
    selectedRegionId: number;
}

const SubRegionsSelect = (props: Props) => {

    const subRegions: Array<object> = useSelector((state: any) => state.subRegions);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(subRegions.length > 0) return; // if sub regions are already loaded from the server

        setIsLoading(true);

        dispatch(actions.loadSubRegions())
            .finally(() => setIsLoading(false));

    }, [subRegions, dispatch]);

    const renderSubRegions = () => {
        return subRegions.map((subRegion: any) => {
            if(Number(subRegion.region.id) === Number(props.selectedRegionId)) {
                return <option key={subRegion.id} value={subRegion.id}>{subRegion.name}</option>;
            }
            return null;
        });
    }

    return <>
        <Select 
            id = {props.id} 
            label = {props.label} 
            placeholder = {props.placeholder} 
            required = {props.required} 
            onChange = {props.onChange} 
            loading = {isLoading} 
            value = {props.value}
            isInvalid = {props.isInvalid}
        >
            {renderSubRegions()}
        </Select>
    </>;

}

export default SubRegionsSelect;