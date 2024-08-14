'use client';

import React from "react"
import {
    XMarkIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import Project from "./Project";
import DialogCreate from "./DialogCreate/DialogCreate";
import DialogShow from "./DialogShow/DialogShow";
import DialogDelete from "./DialogDelete/DialogDelete";
import Pagination from "@/components/pagination/Pagination";
import DialogEdit from "./DialogEdit/DialogEdit";


interface ProjectsProps
{
}


interface ProjectsState
{
    data: any
}

export default class Projects extends React.Component<ProjectsProps, ProjectsState>
{
    refDialogCreate: any
    refDialogShow: any
    refDialogEdit: any
    refDialogDelete: any

    constructor(props: ProjectsProps)
    {
        super(props)
        this.state = {
            data: [],
        }
        this.refDialogCreate = React.createRef()
        this.refDialogShow = React.createRef()
        this.refDialogEdit = React.createRef()
        this.refDialogDelete = React.createRef()
    }

    componentDidMount(): void 
    {
        this.fetch()
    }

    async fetch()
    {
   
        try {
            const response = await fetch('http://projectmanager.demo/projects', {
                method: 'GET',
                // headers: {
                //     'Accept': '*/*',
                //     'Content-Type': 'multipart/form-data', //'application/json'
                // },
                // body: multipartFormData, //JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            this.setState({
                ...this.state,
                data: result.projects,
            })
        } 
        catch (error) 
        {
            console.error('Erreur lors de la soumission du formulaire', error)
        }
    }

    handleDialogCreateOnSelect()
    {
        this.refDialogCreate.current.select()
    }

    handleDialogShowOnSelect(data: any)
    {
        this.refDialogShow.current.select(data)
    }

    handleDialogEditOnSelect(data: any)
    {
        this.refDialogEdit.current.select(data)
    }

    handleDialogDeleteOnSelect(data: any)
    {
        this.refDialogDelete.current.select(data)
    }

    renderProjects()
    {
        let elements: any = []
        for (let index = 0; index < this.state.data.length; index++) 
        {
            elements.push(
                <Project key={ index } 
                    data={this.state.data[index]}
                    onShow={ (data: any) => this.handleDialogShowOnSelect(data) }
                    onEdit={ (data: any) => this.handleDialogEditOnSelect(data) }
                    onDelete={ (data: any) => this.handleDialogDeleteOnSelect(data) } />
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
                <Pagination />
                <DialogCreate ref={ this.refDialogCreate } />
                <DialogShow ref={ this.refDialogShow } data={ {} } />
                <DialogEdit ref={ this.refDialogEdit } data={ {} } />
                <DialogDelete ref={ this.refDialogDelete } data={ {} } />
            </div>
        )
    }
}