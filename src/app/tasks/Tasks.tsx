'use client';

import React from "react"
import {
    XMarkIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import Task from "./Task";


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
        let elements: any = []
        for (let index = 0; index < 10; index++) 
        {
            elements.push(
                <Task key={ index } order={index + 1} />
            )
        }

        return elements
    }

    render()
    {
        return (
            <div id="tasks">
                <div className="p-options">
                    <div className="options">
                        <button type="button" className="btn-add">
                           <PlusIcon />
                        </button>
                    </div>
                    <div className="dialogs"></div>
                </div>
                <div className="p-list">
                    { this.renderTasks() }
                </div>
            </div>
        )
    }
}