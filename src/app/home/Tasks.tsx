'use client';

import React from "react"
import {
    PlayIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';


interface TasksProps
{
    
}


interface TasksState
{
    
}

export default class Tasks extends React.Component<any, TasksState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    renderTasks()
    {
        const tasks: any = []

        for (let index = 0; index < 5; index++) 
        {
            tasks.push(
                <div className="task" key={ index }>
                    <div className="number">{ index + 1 }</div>
                    <div className="title">Debug Project 1</div>
                    <button type="button">
                        <CheckCircleIcon />                       
                    </button>
                </div>
            )
        }
        return tasks
    }

    render()
    {
        return (
            <div className="h-tasks">
            {/* Reusable Component ... copy this model */}
                <div className="label">
                    <h6>Tasks <span className="total">(5)</span></h6>
                </div>
                <div className="list">
                    { this.renderTasks() }
                </div>
            </div>
        )
    }
}