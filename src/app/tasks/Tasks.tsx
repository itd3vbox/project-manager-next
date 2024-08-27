'use client';

import React from "react"
import {
    XMarkIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import Task from "./Task";
import DialogCreate from "./DialogCreate/DialogCreate";
import Pagination from "@/components/pagination/Pagination";
import DialogEdit from "./DialogEdit/DialogEdit";

interface TasksProps
{
    
}


interface TasksState
{
    data: any
}

export default class Tasks extends React.Component<any, TasksState>
{
    refDialogCreate: any
    refDialogEdit: any

    constructor(props: any)
    {
        super(props)
        this.state = {
            data: null,
        }
        this.refDialogCreate = React.createRef()
        this.refDialogEdit = React.createRef()
    }

    componentDidMount(): void {
        this.search()
    }

    async search()
    {
        const formData = {
            is_asc: false,
            max: 20,
            with_project: true,
        }
    
        const url: string = 'http://projectmanager.demo/api/tasks/search'

        const token = localStorage.getItem('access_token')
        
        if (!token) {
            console.error('No token found')
            return
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    //'Origin': 'http://localhost:3000',
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            this.setState({
                ...this.state,
                data: result.data,
            })
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    handleDialogCreateOnSelect()
    {
        this.refDialogCreate.current.select()
    }

    handleOnCreate()
    {
        this.search()
    }

    handleOnEdit(data: any)
    {
        this.refDialogEdit.current.select(data)
    }

    handleOnUpdate()
    {
        this.search()
    }

    handleOnDelete()
    {
        this.search()
    }

    renderTasks()
    {
        const tasks = this.state.data ? this.state.data.data : []
        let elements: any = []
        for (let index = 0; index < tasks.length; index++) 
        {
            elements.push(
                <Task key={ index } order={index + 1}
                    data={ tasks[index] }
                    onEdit={ (data) => this.handleOnEdit(data) }
                    onUpdate={ () => this.handleOnUpdate() }
                    onDelete={ () => this.handleOnDelete() } />
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
                        <button type="button" className="btn-create"
                            onClick={ () => this.handleDialogCreateOnSelect() }>
                           <PlusIcon />
                        </button>
                    </div>
                    <div className="dialogs"></div>
                </div>
                <div className="p-list">
                    { this.renderTasks() }
                </div>
                <Pagination />
                <DialogCreate ref={ this.refDialogCreate }
                    onCreate={ () => this.handleOnCreate() } />
                <DialogEdit ref={ this.refDialogEdit }
                    onEdit={ () => this.handleOnUpdate() } />
            </div>
        )
    }
}