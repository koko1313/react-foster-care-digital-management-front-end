import React from 'react';
import image from '../../assets/images/image.jpg';
import './style.scss';

const HomePage = () => {
    return <>
        <div className="row">
            <div className="col-md order-2">
                <div className="image">
                    <img className="img-fluid" src={image} alt="family-front-house" />
                    <a className="img-credit" href="http://www.freepik.com" target="_blank" rel="noopener noreferrer">Designed by brgfx / Freepik</a>
                </div>
            </div>
            <div className="col-md order-1 order-md-2 mb-2 text-justify">
                <strong>Приемната грижа</strong> цели да осигури временна грижа за деца в риск, като целта е децата да бъдат отглеждани в условията на сигурна, 
                подкрепяща и стимулираща  семейна среда. Приемният родител не е носител на родителски права по отношение на настаненото в семейството му дете, 
                но има задължението и ангажиментите да осигури на настаненото в семейството му дете добри грижи, спокойна среда, внимание, 
                които да благоприятстват за неговото правилно развитие и личностно формиране. В периода на настаняването, приемното семейство и детето 
                получават съдействие и подкрепа от страна на социалните работници от отдел „Закрила на детето“ и от доставчици на социални услуги. 
                Целите на приемната грижа като социална услуга и мярка за закрила са: да осигури за определен период от време сигурна и безопасна семейна среда 
                за дете в риск, която да допринесе за неговото пълноценно развитие; превенция на институционализацията и осигуряване на подкрепа за биологичните 
                родители в кризисни ситуации; подготовка на деца, настанени в специализирани институции за реинтеграция в биологичното им семейство или осиновяване. 
                Доставчик на услугата приемна грижа може да бъде ДСП, общината или друг лицензиран доставчик на социална услуга за деца.
            </div>
            
        </div>
    </>;
}

export default HomePage;