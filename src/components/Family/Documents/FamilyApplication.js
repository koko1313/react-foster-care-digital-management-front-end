import React, { useEffect, useState } from 'react';
import euFlagImege from '../../../assets/images/document-images/eu_flag.png';
import hrLogo from '../../../assets/images/document-images/hr_logo.png';
import { useDispatch } from 'react-redux';
import networkClient from '../../../network/network-client';
import { useParams, useHistory } from 'react-router-dom';
import actions from '../../../redux/actions';
import Loader from '../../base-components/Loader';

const FamilyApplication = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [family, setFamily] = useState();

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams(); // get parameter from url

    const processErrorMessages = (error) => {
        if(error.response) {
            switch(error.response.status) {
                case 401:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Сесията ви изтече!"}));
                    dispatch(actions.deleteLoggedUser());
                    break;
                case 404:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Не е намерено такова семейство!"}));
                    history.goBack();
                    break;
                default:
                    dispatch(actions.setAlert({title: "Грешка!", message: "Нещо се обърка!"}));
                    break;
            }
        } else {
            dispatch(actions.setAlert({title: "Грешка!", message: "Няма връзка със сървъра!"}));
        }
    }

    useEffect(() => {
        setIsLoading(true);
        
        networkClient.get(`/family/${id}`, null, 
            (family) => {
                setFamily(family)
            },
            (error) => {
                processErrorMessages(error);
            }
        ).finally(() => {
            setIsLoading(false);
        });

        // eslint-disable-next-line
    }, []);

    const print = () => {
        window.print();
    }

    const renderFamilyInformation = () => {
        if(!family) return;

        let titular;
        let anotherParent;

        if(family.titular === "woman") {
            titular = family.woman;
            anotherParent = family.man;
        }
        else if(family.title === "man") {
            titular = family.man;
            anotherParent = family.woman;
        }

        return (
            <>
                <table className="printable-document">
                    <thead>
                        <tr>
                            <th>
                                <img src={euFlagImege} alt="eu-logo" />
                                <img className="pull-right" src={hrLogo} alt="hr-logo" />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <div className="printable-document-content">
                            <div className="text-center"><strong>ЗАЯВЛЕНИЕ</strong></div>
                            <strong>1. Кандидат</strong> <br />
                            <strong>Име, презиме и  фамилия:</strong> {titular.first_name} {titular.second_name} {titular.last_name} <br />
                            <strong>ЕГН:</strong> {titular.egn} <br />
                            <strong>Образование:</strong> {titular.education} <br />
                            <strong>Месторабота:</strong> {titular.work} <br />
                            <strong>Гражданство:</strong> {titular.citizenship} <br />
                            <strong>Адрес:</strong> {family.city.name}, {family.sub_region.name}, {family.region.name}, {family.address} <br />
                            <strong>Адрес:</strong> {titular.phone} <br />
                            <strong>На какъв език се говори в семейството:</strong> {family.language} <br />
                            <strong>Владеете ли български език добре:</strong> {family.level_of_bulgarian_language} <br />
                            <strong>Религия:</strong> {family.religion} <br />

                            <strong>Съпруг/а</strong> <br />
                            <strong>Име, презиме и  фамилия:</strong> {anotherParent.first_name} {anotherParent.second_name} {anotherParent.last_name} <br />
                            <strong>ЕГН:</strong> {anotherParent.egn} <br />
                            <strong>Образование:</strong> {anotherParent.education} <br />
                            <strong>Месторабота:</strong> {anotherParent.work} <br />

                            <strong>2. Желая да предоставям приемна грижа като:</strong> {family.family_type} <br />

                            <strong>3. Финансово и икономическо състояние:</strong> <br />
                            <strong>а) среден месечен доход на член от семейството (в лв.):</strong> {family.average_monthly_income_per_family_member}<br />
                            <strong>б) жилище: собствено/под наем, брой стаи:</strong> {family.house_type}<br />
                            <strong>в) трудова заетост:</strong> {titular.employment_type}<br />
                            <strong>г) доходи от други източници:</strong> {family.another_income}<br />

                            <strong>4. За какво дете бихте искали да се грижите?</strong> <br />
                                <ul>
                                    <li>
                                        Възраст: 
                                            от {family.prefer_kid_min_age ? `${family.prefer_kid_min_age} ` : " без значение "}
                                            до {family.prefer_kid_max_age ? `${family.prefer_kid_max_age} ` : " без значение "}
                                    </li>
                                    <li>
                                        Пол: 
                                            {family.prefer_kid_min_gender ? family.prefer_kid_min_gender : " без значение"}
                                    </li>
                                </ul>
                        </div>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td>
                                <div className="printable-document-footer">
                                    Проект „Приеми ме 2015“ - BG05M9OP001-2.003-0001-C01, финансиран от Оперативна програма <br />
                                    „Развитие на човешките ресурси“, съфинансирана от Европейския съюз чрез Европейския <br />
                                    социален фонд.
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        );
    }

    return (
        <>
            <button className="btn btn-primary pull-right mb-4 d-print-none" onClick={print}>Разпечатай</button>
            {renderFamilyInformation()}
            <Loader loading={isLoading} fullScreen={true} />
        </>
    );

}

export default FamilyApplication;