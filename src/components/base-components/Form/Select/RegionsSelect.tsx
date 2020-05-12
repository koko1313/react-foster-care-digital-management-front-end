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
}

const RegionsSelect = (props: Props) => {

    const regions: Array<Object> = useSelector((state: any) => state.regions);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(regions.length > 0) return; // if regions are already loaded from server

        setIsLoading(true);

        dispatch(actions.loadRegions(regions))
            .finally(() => setIsLoading(false));

    }, [regions, dispatch]);

    const renderRegions = () => {
        return regions.map((region: any) => {
            return <option key={region.id} value={region.id}>{region.name}</option>
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
            {renderRegions()}
        </Select>
    </>;

}

export default RegionsSelect;