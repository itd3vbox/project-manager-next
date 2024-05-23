'use client';

import React from "react"
import {
    XMarkIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import Project from "./Project";


interface ProjectsProps
{
    
}


interface ProjectsState
{
    
}

export default class Projects extends React.Component<any, ProjectsState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    renderProjects()
    {
        let elements: any = []
        for (let index = 0; index < 10; index++) 
        {
            elements.push(
                <Project key={ index } />
            )
        }

        return elements
    }

    render()
    {
        return (
            <div id="projects">
                <div className="p-options">
                    <div className="options">
                        <button type="button" className="btn-add">
                           <PlusIcon />
                        </button>
                    </div>
                    <div className="dialogs"></div>
                </div>
                <div className="p-list">
                    { this.renderProjects() }
                </div>
            </div>
        )
    }
}