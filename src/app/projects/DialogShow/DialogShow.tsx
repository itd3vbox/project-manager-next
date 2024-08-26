'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";
import Task from "./Task";


interface DialogShowProps
{

}


interface DialogShowState
{
    isSelected: boolean
    tabsMenuItemSelected: number
    data: any
    dataTasks: any
}

export default class DialogShow extends React.Component<DialogShowProps, DialogShowState>
{

    constructor(props: DialogShowProps)
    {
        super(props)
        this.state = {
            isSelected: false,
            tabsMenuItemSelected: 1,
            data: null,
            dataTasks: [],
        }
    }

    select(data: any = null)
    {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
            data: data,
            dataTasks: [],
        }, () => {
            if (this.state.isSelected)
                this.searchTasks()
        })
    }

    async searchTasks()
    {
        if (!this.state.data)
            return 

        const multipartFormData = new FormData()
        //multipartFormData.append('_method', 'DELETE')

        // for (const key in formData) 
        // {
        //     if (formData.hasOwnProperty(key))
        //         multipartFormData.append(key, formData[key])
        // }

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
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    //'Origin': 'http://localhost:3000',
                },
                body: JSON.stringify({
                    is_asc: false,
                    max: 20,
                    project_id: this.state.data.id,
                })
            })

            const result = await response.json()
            console.log(result)
            
            this.setState({
                dataTasks: result.data.data,
            })            
        } 
        catch (error) 
        {
            console.error('Error', error)
        }
    }

    handleTabsMenuItemOnClick(index: number)
    {
        this.setState({
            ...this.state,
            tabsMenuItemSelected: index,
        })
    }

    renderTasks()
    {
        const elements: any = []
        for (let index = 0; index < this.state.dataTasks.length; index++) 
        {
            const data = this.state.dataTasks[index]
            elements.push(<Task key={ index } order={ index + 1 }
                data={ data } />)
        }
        return (elements)
    }

    render()
    {
        return (
            <div className={ "dialog-show" + (this.state.isSelected ? ' selected' : '') }>
                <div className="dc-close">
                    <button type="button" className="btn-close"
                        onClick={ () => this.select() }>
                        <XMarkIcon />
                    </button>
                </div>
                <div className="dc-zero">
                    <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" alt="" />
                </div>
                <div className="dc-main">
                    <div className="m-tabs-menu">
                        <button type="button" className="tm-item"
                            onClick={ () => this.handleTabsMenuItemOnClick(1) }>Overview</button>
                        <button type="button" className="tm-item"
                            onClick={ () => this.handleTabsMenuItemOnClick(2) }>Tasks</button>
                    </div>
                    <div className="m-tabs-contents">
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 1 ? ' selected' : '')}>
                            <div className="c-overview">
                                <h4>{ this.state.data ? this.state.data.name : 'Project Unk.' }</h4>
                                <div className="id">#{this.state.data ? this.state.data.id : 0}</div>
                                <p className="description-short">{ this.state.data ? this.state.data.description_short : 'A good project to help me to build other projects.' }</p>
                            </div>
                        </div>
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 2 ? ' selected' : '')}>
                            <div className="c-tasks">
                                { this.renderTasks() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}