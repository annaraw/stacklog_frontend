import * as React from 'react';

import './BacklogItem.css'
import { FunctionComponent } from 'react';
import { Category } from '../models/models';


const BacklogItem: FunctionComponent<{ title: String, description: string, category: Category, priority: number }> = props => {

    const { title, description, category, priority } = props;

    const colorStyle = {
        backgroundColor: category.color
    }

    return (
        <div className="backlogItem">
            <div className="header" style={colorStyle}>
                <div className="header-title" >{title} ({category.text})<span style={{float:"right"}}>Prio: {priority}</span></div>
                <div className="description">{description}</div>
            </div>
        </div>
    );
};

export default BacklogItem;