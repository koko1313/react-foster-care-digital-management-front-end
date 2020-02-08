import React, { useEffect, useState } from 'react';
import networkClient from '../../../../network/network-client';
import Select from './Select';

const CitiesSelect = (props) => {

    const [citiesFromServer, setCitiesFromServer] = useState();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        networkClient.get("/city/all", null, (cities) => {
            setCitiesFromServer(cities);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }, []);

    const renderCities = () => {
        if(!citiesFromServer) return null;

        return citiesFromServer.map((city) => {
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