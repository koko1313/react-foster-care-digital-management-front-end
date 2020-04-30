import React from 'react';
import ChildrenListComponent from '../../components/Children/ListComponent';

const ListPage = () => {

    return <>
        <div className="row">
            <div className="col">
                <h1>Деца</h1>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <ChildrenListComponent />
            </div>
        </div>
    </>;
}

export default ListPage;