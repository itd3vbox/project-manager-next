'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    EllipsisVerticalIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';


interface ProjectProps
{
    
}


interface ProjectState
{
    
}

export default class Project extends React.Component<any, ProjectState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    render()
    {
        return (
            <div className="project">
                <div className="status-options">
                    <div className="status">
                        <div className="indicator"></div>
                        <div className="value">On Progess</div>
                    </div>
                    <button className="btn" type="button">
                        <EllipsisVerticalIcon />
                    </button>
                </div>
                <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" className="card-img-top" alt="..."/>
                <div className="content">
                    <h6>Project 1</h6>
                    <p className="description-short">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="date-updated">
                        <CalendarIcon />
                        <div className="value">2024-12-31</div>
                    </div>
                    <div className="progress">
                        <div className="progress-bar" style={{ width: '42%' }}></div>
                    </div>                  
                </div>
            </div>
        )
    }
}