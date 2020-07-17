import React, { useEffect, useState, ChangeEventHandler } from 'react';
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
    selectedSubRegionId: number;
}

const CitiesSelect = (props: Props) => {

    const cities: Array<object> = useSelector((state: any) => state.cities);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(cities.length > 0) return; // if cities are already loaded from the server

        setIsLoading(true);

        dispatch(actions.loadCities())
            .finally(() => setIsLoading(false));

    }, [cities, dispatch]);

    const renderCities = () => {
        return cities.map((city: any) => {
            if(Number(city.sub_region.id) === Number(props.selectedSubRegionId)) {
                return <option key={city.id} value={city.id}>{city.name}</option>
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
            {renderCities()}
        </Select>
    </>;

}

export default CitiesSelect;