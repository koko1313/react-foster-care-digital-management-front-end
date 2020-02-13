import React from 'react';
import './style.scss';

/**
 * @param {Object} family 
 */
const DetailsComponent = (props) => {

    const renderFamilyInformation = () => {
        if(!props.family) return;

        return (
            <>
                <h2>Детайли</h2>

                {/* Жена */}
                {props.family.woman &&
                    <div className="info-section">
                        <div className="row">
                            <div className="col-md-3 info-header info-heading">Жена</div>
                            <div className="col info-body"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Име</div>
                            <div className="col info-body">
                                {props.family.woman.first_name} {props.family.woman.second_name} {props.family.woman.last_name}
                                {props.family.titular === "woman" && " (титуляр)"}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">ЕГН</div>
                            <div className="col info-body">{props.family.woman.egn}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Телефон</div>
                            <div className="col info-body">{props.family.woman.phone}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Образование</div>
                            <div className="col info-body">{props.family.woman.education}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Месторабота</div>
                            <div className="col info-body">{props.family.woman.work}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Трудова заетост</div>
                            <div className="col info-body">{props.family.woman.employment_type}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Гражданство</div>
                            <div className="col info-body">{props.family.woman.citizenship}</div>
                        </div>
                    </div>
                }

                {/* Мъж */}
                {props.family.man &&
                    <div className="info-section">
                        <div className="row">
                            <div className="col-md-3 info-header info-heading">Мъж</div>
                            <div className="col info-body"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header info-header">Име</div>
                            <div className="col info-body">
                                {props.family.man.first_name} {props.family.man.second_name} {props.family.man.last_name}
                                {props.family.titular === "man" && " (титуляр)"}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">ЕГН</div>
                            <div className="col info-body">{props.family.man.egn}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Телефон</div>
                            <div className="col info-body">{props.family.man.phone}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Образование</div>
                            <div className="col info-body">{props.family.man.education}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Месторабота</div>
                            <div className="col info-body">{props.family.man.work}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Трудова заетост</div>
                            <div className="col info-body">{props.family.man.employment_type}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 info-header">Гражданство</div>
                            <div className="col info-body">{props.family.man.citizenship}</div>
                        </div>
                    </div>
                }

                {/* Предпочитания към децата */}
                <div className="info-section">
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">Предпочитания към деца</div>
                        <div className="col info-body"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Предпочитан пол</div>
                        <div className="col info-body">
                            {props.family.prefer_kid_gender === "Момче" && "Момче"}
                            {props.family.prefer_kid_gender === "Момиче" && "Момиче"}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Предпочитана възраст</div>
                        <div className="col info-body">
                            Минимална: {props.family.prefer_kid_min_age} <br />
                            Максимална: {props.family.prefer_kid_max_age}
                        </div>
                    </div>
                </div>

                {/* За семейството */}
                <div className="info-section">
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">За семейството</div>
                        <div className="col info-body"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Адрес</div>
                        <div className="col info-body">
                            {props.family.region && props.family.region.name + ", "}
                            {props.family.sub_region && props.family.sub_region.name + ", "}
                            {props.family.city && props.family.city.name + ", "} 
                            {props.family.address}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">На какъв език се говори в семейството?</div>
                        <div className="col info-body">{props.family.language}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Владеете ли български език добре?</div>
                        <div className="col info-body">{props.family.level_of_bulgarian_language}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Религия</div>
                        <div className="col info-body">{props.family.religion}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Среден месечен доход на член от семейството</div>
                        <div className="col info-body">{props.family.average_monthly_income_per_family_member} лв</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Доходи от други източници</div>
                        <div className="col info-body">{props.family.another_income} лв</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Тип на приемното семейство</div>
                        <div className="col info-body">{props.family.family_type}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Жилище</div>
                        <div className="col info-body">{props.family.house_type}</div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {renderFamilyInformation()}
        </>
    );

}

export default DetailsComponent;