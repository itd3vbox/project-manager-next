'use client';

import React from "react"
import {
    PlayIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';


interface AutomatesProps
{
    
}


interface AutomatesState
{
    data: any
}

export default class Automates extends React.Component<any, AutomatesState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {
            data: null,
        }
    }

    
    componentDidMount(): void 
    {
        this.search()
    }

    async search()
    {
        const formData = {
            is_asc: false,
            max: 2,
        }
    
        const url: string = 'http://projectmanager.demo/api/automates/search'

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

    async execute(data: any)
    {
        const formData = new FormData()
        //formData.append('_method', 'PATCH')
        formData.append('status', String(data.status === 1 ? 2 : 1))
    
        const url: string = 'http://projectmanager.demo/api/automates/' + data.id + '/execute'

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

    handleOnExecute(data: any)
    {
        this.execute(data)
    }

    renderAutomates()
    {
        const automates: any = []
        const automatesData: any = this.state.data ? this.state.data.data : []

        for (let index = 0; index < automatesData.length && index < 5; index++) 
        {
            const automate = automatesData[index]
            automates.push(
                <div className={ "automate" + (index === 0 ? ' on-progress' : '') } key={ index }>
                    <div className="icon">
                        <ClockIcon />
                    </div>
                    <div className="name">{ automate.name }</div>
                    <div className="duration">{ automate.duration_info.value_text }</div>
                    <button type="button"
                        onClick={ () => this.handleOnExecute(automate) }>
                        <PlayIcon />
                    </button>
                </div>
            )
        }
        return automates
    }

    render()
    {
        return (
            <div className="h-automates">
                <div className="label">
                    <h6>Automates <span className="total">(5)</span></h6>
                </div>
                <div className="list">
                    { this.renderAutomates() }
                </div>
            </div>
        )
    }
}