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
    data: any
}


interface ProjectState
{
    
}

export default class Project extends React.Component<ProjectProps, ProjectState>
{

    constructor(props: ProjectProps)
    {
        super(props)
        this.state = {

        }
    }

    formatDate(dateString: string): string 
    {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    render()
    {
        const updated_at = this.formatDate(this.props.data.updated_at)

        return (
            <div className="project">
                <div className="status-options">
                    <div className="status">
                        <div className="indicator"></div>
                        <div className="value">{ this.props.data.status_info.value_text }</div>
                    </div>
                    <button className="btn" type="button">
                        <EllipsisVerticalIcon />
                    </button>
                </div>
                <img src={ this.props.data.image_info.path } alt="..." />
                <div className="content">
                    <h6>{ this.props.data.name }</h6>
                    <p className="description-short">{ this.props.data.description_short }</p>
                    <div className="date-updated">
                        <CalendarIcon />
                        <div className="value">{ updated_at }</div>
                    </div>
                    <div className="progress">
                        <div className="progress-bar" style={{ width: '42%' }}></div>
                    </div>                  
                </div>
            </div>
        )
    }
}