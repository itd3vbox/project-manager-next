'use client';

import React from "react"
import {
    XMarkIcon,
    CheckCircleIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';


interface TaskProps
{
    
}


interface TaskState
{
    
}

export default class Task extends React.Component<any, TaskState>
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
            <div className="task">
                <div className="number">{ this.props.order }</div>
                <div className="title">Debug Project 1</div>
                <div className="options">
                    <button type="button" className="btn-status">
                        <CheckCircleIcon />                       
                    </button>
                    <button type="button">
                        <EllipsisVerticalIcon />                       
                    </button>
                </div>
            </div>
        )
    }
}