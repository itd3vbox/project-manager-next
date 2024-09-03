'use client';

import React from "react"
import {
    PlayIcon,
    CheckCircleIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';


interface TasksProps
{
    
}


interface TasksState
{
    data: any
}

export default class Tasks extends React.Component<any, TasksState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount(): void {
        this.search()
    }

    async search()
    {
        const formData = {
            is_asc: false,
            max: 2,
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
                    'Origin': 'http://localhost:3000',
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            this.setState({
                data: result.data,
            })
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    async updateStatus(data: any)
    {
        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('status', String(data.status === 1 ? 2 : 1))
    
        const url: string = 'http://projectmanager.demo/api/tasks/' + data.id + '/status'

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
                    'Origin': 'http://localhost:3000',
                },
                body: formData,
            })

            const result = await response.json()
            console.log(result)
            this.search()
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    handleStatusOnUpdate(data: any)
    {
        this.updateStatus(data)
    }

    renderTasks()
    {
        const tasks: any = []
        const tasksData: any = this.state.data ? this.state.data.data : []

        for (let index = 0; index < tasksData.length && index < 5; index++) 
        {
            const task = tasksData[index]
            console.log(task)
            tasks.push(
                <div className="task" key={ index }>
                    <div className="number">{ index + 1 }</div>
                    <div className="title">{ task.title }</div>
                    <button type="button" onClick={ () => this.handleStatusOnUpdate(task) }>
                    { task.status === 1 && (<CheckCircleIcon />) }
                    { task.status !== 1 && (<CheckIcon />) }                           
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