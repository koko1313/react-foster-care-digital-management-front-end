import React, { useEffect } from "react";
import Select from "../../base-components/Form/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import actions from '../../../redux/actions';

/**
 * @param {string} value
 * @param {function} onChange
 */
const FamilySelect = (props) => {

    const dispatch = useDispatch();

    const familiesAreLoading = useSelector(state => state.familiesAreLoading);
    const families = useSelector(state => state.families);

    useEffect(() => {
        dispatch(actions.loadFamilies());
    }, [dispatch]);

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

    return <>
        <Select 
            label = "Семейство"
            placeholder = "Избери семейство ..."
            value = {props.value}
            onChange = {props.onChange}
            loading = {familiesAreLoading}
            >
            {renderFamiliesOptions()}
        </Select>
    </>;

}

export default FamilySelect;