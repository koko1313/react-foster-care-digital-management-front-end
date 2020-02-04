import React, { useEffect, useState } from 'react';
import networkClient from '../../../network/network-client';
import Select from './Select';

const CitiesSelect = (props) => {

    const [citiesFromServer, setCitiesFromServer] = useState();

    useEffect(() => {
        networkClient.get("/city/all", null, (cities) => {
            setCitiesFromServer(cities);
        });
    }, []);

    const renderCities = () => {
        if(!citiesFromServer) return null;

        return citiesFromServer.map((city) => {
            return <option key={city.id} value={city.name}>{city.name}</option>
        });
    }

    return (
        <Select label={props.label} placeholder={props.placeholder} onChange={props.onChange}>
            {renderCities()}
        </Select>
    );

}

export default CitiesSelect;