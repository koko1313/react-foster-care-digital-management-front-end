import React from 'react';
import { useSelector } from 'react-redux';

const DetailsComponent = () => {

    const family = useSelector(state => state.currentFamily);

    const renderFamilyInformation = () => {
        return <>
            {/* Жена */}
            {family.woman &&
                <div className="info-section">
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">Жена</div>
                        <div className="col info-body"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Име</div>
                        <div className="col info-body">
                            {family.woman.first_name} {family.woman.second_name} {family.woman.last_name}
                            {family.titular === "woman" && " (титуляр)"}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">ЕГН</div>
                        <div className="col info-body">{family.woman.egn}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Телефон</div>
                        <div className="col info-body">{family.woman.phone}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Образование</div>
                        <div className="col info-body">{family.woman.education}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Месторабота</div>
                        <div className="col info-body">{family.woman.work ? family.woman.work : "-"}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Трудова заетост</div>
                        <div className="col info-body">{family.woman.employment_type ? family.woman.employment_type : "-"}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Гражданство</div>
                        <div className="col info-body">{family.woman.citizenship ? family.woman.citizenship : "-"}</div>
                    </div>
                </div>
            }

            {/* Мъж */}
            {family.man &&
                <div className="info-section">
                    <div className="row">
                        <div className="col-md-3 info-header info-heading">Мъж</div>
                        <div className="col info-body"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header info-header">Име</div>
                        <div className="col info-body">
                            {family.man.first_name} {family.man.second_name} {family.man.last_name}
                            {family.titular === "man" && " (титуляр)"}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">ЕГН</div>
                        <div className="col info-body">{family.man.egn}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Телефон</div>
                        <div className="col info-body">{family.man.phone}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Образование</div>
                        <div className="col info-body">{family.man.education}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Месторабота</div>
                        <div className="col info-body">{family.man.work ? family.man.work : "-"}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Трудова заетост</div>
                        <div className="col info-body">{family.man.employment_type ? family.man.employment_type : "-"}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 info-header">Гражданство</div>
                        <div className="col info-body">{family.man.citizenship ? family.man.citizenship : "-"}</div>
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
                        {!family.prefer_kid_gender && "-"}
                        {family.prefer_kid_gender === "Момче" && "Момче"}
                        {family.prefer_kid_gender === "Момиче" && "Момиче"}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">Предпочитана възраст</div>
                    <div className="col info-body">
                        Минимална: {family.prefer_kid_min_age ? family.prefer_kid_min_age : "-"} <br />
                        Максимална: {family.prefer_kid_max_age ? family.prefer_kid_max_age : "-"}
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
                        {family.region && family.region.name + ", "}
                        {family.sub_region && family.sub_region.name + ", "}
                        {family.city && family.city.name + ", "} 
                        {family.address}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">На какъв език се говори в семейството?</div>
                    <div className="col info-body">{family.language ? family.language : "-"}</div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">Владеете ли български език добре?</div>
                    <div className="col info-body">{family.level_of_bulgarian_language ? family.level_of_bulgarian_language : "-"}</div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">Религия</div>
                    <div className="col info-body">{family.religion ? family.religion : "-"}</div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">Среден месечен доход на член от семейството</div>
                    <div className="col info-body">{family.average_monthly_income_per_family_member ? family.average_monthly_income_per_family_member : "-"} лв</div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">Доходи от други източници</div>
                    <div className="col info-body">{family.another_income ? family.another_income : "-"} лв</div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">Тип на приемното семейство</div>
                    <div className="col info-body">{family.family_type ? family.family_type : "-"}</div>
                </div>

                <div className="row">
                    <div className="col-md-3 info-header">Жилище</div>
                    <div className="col info-body">{family.house_type ? family.house_type : "-"}</div>
                </div>
            </div>
        </>;
    }

    return <>
        <div className="details">
            {renderFamilyInformation()}
        </div>
    </>;

}

export default DetailsComponent;