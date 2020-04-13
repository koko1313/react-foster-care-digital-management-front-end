import React, { useEffect, useState } from "react";
import Select from "../../base-components/Form/Select/Select";
import networkClient from "../../../network/network-client";

/**
 * @param {string} value
 * @param {function} onChange
 */
const FamilySelect = (props) => {

    const [isLoading, setIsLoading] = useState();
    const [families, setFamilies] = useState();

    useEffect(() => {
        setIsLoading(true);
        
        networkClient.get('/family/all', null, 
            (families) => {
                setFamilies(families);
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
            }
        );
    
        // eslint-disable-next-line
    }, []);

    const renderFamiliesOptions = () => {
        if(!families) return;

        return families.map((family) => {
            return (
                <option 
                    key = {family.id} 
                    value = {family.id}
                    onChange = {props.onChange}>
                        {family.woman.first_name} {family.woman.last_name} и {family.man.first_name} {family.man.last_name}
                </option>
            );
        });
    }

    return (
        <Select 
            label = "Семейство"
            placeholder = "Избери семейство ..."
            value = {props.value}
            onChange = {props.onChange}
            loading = {isLoading}
            >
            {renderFamiliesOptions()}
        </Select>
    );

}

export default FamilySelect;