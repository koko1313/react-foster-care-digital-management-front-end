import React, { useEffect, useState } from 'react';
import networkClient from '../../../../network/network-client';
import Select from './Select';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/actions';

const CitiesSelect = (props) => {

    const cities = useSelector(state => state.cities);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(cities.length > 0) return; // if cities are already loaded from the server

        setIsLoading(true);

        networkClient.get("/city/all", null, 
            (cities) => {
                dispatch(actions.setCities(cities));
                setIsLoading(false);
            },
            () => {
                setIsLoading(false);
            }
        );
        // eslint-disable-next-line
    }, []);

    const renderCities = () => {
        if(!cities) return null;

        return cities.map((city) => {
            return <option key={city.id} value={city.id}>{city.name}</option>
        });
    }

    return (
        <Select id={props.id} label={props.label} placeholder={props.placeholder} required={props.required} onChange={props.onChange} loading={isLoading} value={props.value}>
            {renderCities()}
        </Select>
    );

}

export default CitiesSelect;