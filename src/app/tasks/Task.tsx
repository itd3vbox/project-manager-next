'use client';

import React from "react"
import {
    XMarkIcon,
    CheckCircleIcon,
    ArrowDownIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';


interface TaskProps
{
    data: any
    order: number
    onEdit: (data: any) => void
    onUpdate: () => void
    onDelete: () => void
}


interface TaskState
{
    isSelected: boolean
}

export default class Task extends React.Component<TaskProps, TaskState>
{

    constructor(props: TaskProps)
    {
        super(props)
        this.state = {
            isSelected: false,
        }
    }

    async updateStatus(status: number = 0)
    {
        const multipartFormData = new FormData()
        multipartFormData.append('_method', 'PATCH')
        multipartFormData.append('status', String(status))

        // for (const key in formData) 
        // {
        //     if (formData.hasOwnProperty(key))
        //         multipartFormData.append(key, formData[key])
        // }

        const url: string = 'http://projectmanager.demo/api/tasks/' + this.props.data.id + '/status'

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
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    //'Origin': 'http://localhost:3000',
                },
                body: multipartFormData, //JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            
            this.props.onUpdate()         
        } 
        catch (error) 
        {
            console.error('Error', error)
        }
    }

    async destroy()
    {
        const multipartFormData = new FormData()
        multipartFormData.append('_method', 'DELETE')

        // for (const key in formData) 
        // {
        //     if (formData.hasOwnProperty(key))
        //         multipartFormData.append(key, formData[key])
        // }

        const url: string = 'http://projectmanager.demo/api/tasks/' + this.props.data.id 

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
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    //'Origin': 'http://localhost:3000',
                },
                body: multipartFormData, //JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            
            this.props.onDelete()         
        } 
        catch (error) 
        {
            console.error('Error', error)
        }
    }

    handleOnSelect()
    {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
        })
    }

    handleOnEdit()
    {
        this.props.onEdit(this.props.data)
    }

    handleOnDelete()
    {
        this.destroy()
    }

    handleStatusOnUpdate(status: number = 0)
    {
        this.updateStatus(status)
    }

    render()
    {
        const description = this.props.data.description 
            ? JSON.parse(this.props.data.description).content
            : '...'

        return (
            <div className={"task" + (this.state.isSelected ? ' selected' : '')}>
                <div className="t-top">
                    <div className="number">{ this.props.order }</div>
                    <div className="title">{ this.props.data.title }</div>
                    <div className="options">
                        <button type="button" className="btn-status"
                            onClick={ () => this.handleStatusOnUpdate(this.props.data.status === 1 ? 2 : 1) }>
                            { this.props.data.status === 1 && (<CheckCircleIcon />) }
                            { this.props.data.status !== 1 && (<CheckIcon />) }                 
                        </button>
                        <button type="button"
                            onClick={ () => this.handleOnSelect() }>
                            <ArrowDownIcon />                       
                        </button>
                    </div>
                </div>
                <div className="t-main">
                    <div className="block-project">
                        <div className="block-left">
                            <img src={ this.props.data.project.image_info.path } className="card-img-top" alt="..."/>
                        </div>
                        <div className="block-right">
                            <h4>{ this.props.data.project.name }</h4>
                            <div className="id">#{ this.props.data.project.id }</div>
                            <p className="description-short">{ this.props.data.project.description_short }</p>
                        </div>
                    </div>
                    <div className="block-task">
                        <div className="id">#{ this.props.data.id }</div>
                        <div className="status">
                            <div className="info"></div>
                            <div className="label">Status</div>
                            <div className="shape-value-options">
                                <div className="shape-value">
                                    <div className="shape"></div>
                                    <div className="value">{ this.props.data.status_info.value_text }</div>
                                </div>
                                <div className="options">
                                    <button type="button"
                                        onClick={ () => this.handleStatusOnUpdate(0) }>RESET</button>
                                    <button type="button"
                                        onClick={ () => this.handleStatusOnUpdate(2) }>START</button>
                                    <button type="button"
                                        onClick={ () => this.handleStatusOnUpdate(1) }>DONE</button>
                                </div>
                            </div>
                        </div>
                        <h6>Description - Short</h6>
                        <p className="description-short">{ this.props.data.description_short }</p>
                        <h6>Description</h6>
                        <p className="description-short">{ description }</p>
                        <div className="options">
                            <button type="button" className="btn-delete"
                                onClick={ () => this.handleOnEdit() }>EDIT</button>
                            <button type="button" className="btn-delete"
                                onClick={ () => this.handleOnDelete() }>DELETE</button>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}