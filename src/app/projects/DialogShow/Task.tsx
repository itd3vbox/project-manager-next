'use client';

import React from "react"
import {
    XMarkIcon,
    ArrowDownIcon,
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
                <div className="t-top">
                    <div className="number">{ this.props.order }</div>
                    <div className="title">Debug Project 1</div>
                    <div className="options">
                        <button type="button" className="btn-status">
                            <CheckCircleIcon />                       
                        </button>
                        <button type="button">
                            <ArrowDownIcon />                       
                        </button>
                    </div>
                </div>
                <div className="t-main">
                    <div className="status">
                        <div className="label">Status</div>
                        <div className="shape-value">
                            <div className="shape"></div>
                            <div className="value">Done</div>
                        </div>
                    </div>
                    <h6>Description - Short</h6>
                    <p className="description-short">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloribus a sequi magnam ex repellat illo beatae minus, eveniet commodi.
                    </p>
                    <h6>Description</h6>
                    <p className="description-short">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloribus a sequi magnam ex repellat illo beatae minus, eveniet commodi.
                    </p>
                </div>
            </div>
        )
    }
}