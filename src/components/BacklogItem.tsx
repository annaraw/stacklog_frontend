import * as React from 'react';

import './ProjectCard.css'
import { FunctionComponent } from 'react';


const BacklogItem: FunctionComponent<{ name: String, category: String, priority: number }> = props => {

    const { name, category, priority } = props;

    return (
        <div className="card">
            <div className="header">
                <div className="header-title">{name} ({category}) - Prio: {priority}</div>
                <div className="header-menu"></div>
            </div>
        </div>
    );
};

export default BacklogItem;