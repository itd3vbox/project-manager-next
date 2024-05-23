'use client';

import React from "react"
import {
    XMarkIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import Project from "./Project";
import DialogCreate from "./DialogCreate/DialogCreate";
import DialogShow from "./DialogShow/DialogShow";


interface ProjectsProps
{
}


interface ProjectsState
{

}

export default class Projects extends React.Component<any, ProjectsState>
{
    refDialogCreate: any
    refDialogShow: any

    constructor(props: any)
    {
        super(props)
        this.state = {
            
        }
        this.refDialogCreate = React.createRef()
        this.refDialogShow = React.createRef()
    }

    handleDialogCreateOnSelect()
    {
        this.refDialogCreate.current.select()
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
                        <button type="button" className="btn-create"
                            onClick={ () => this.handleDialogCreateOnSelect() }>
                           <PlusIcon />
                        </button>
                    </div>
                    <div className="dialogs"></div>
                </div>
                <div className="p-list">
                    { this.renderProjects() }
                </div>
                <DialogCreate ref={ this.refDialogCreate } />
                <DialogShow ref={ this.refDialogCreate } />
            </div>
        )
    }
}