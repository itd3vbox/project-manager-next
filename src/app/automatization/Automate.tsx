'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    StarIcon,
    PlayIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';


interface AutomateProps
{
    data: any
    onShow: () => void
    onExecute: () => void
}


interface AutomateState
{
    
}

export default class Automate extends React.Component<AutomateProps, AutomateState>
{

    constructor(props: AutomateProps)
    {
        super(props)
        this.state = {
            
        }
    }

    async execute()
    {
        const formData = new FormData()
        //formData.append('_method', 'PATCH')
        //formData.append('status', String(this.props.data.status === 1 ? 2 : 1))
    
        const url: string = 'http://projectmanager.demo/api/automates/' + this.props.data.id + '/execute'

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
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    handleOnExecute()
    {
        this.execute()
    }

    handleDialogShowOnSelect()
    {
        this.props.onShow()
    }

    render()
    {
        const automate = this.props.data
        
        return (
            <div className="automate">
                <div className="block-top">
                    <div className="icon">
                        <StarIcon />
                    </div>
                    <div className="options">
                        <button type="button"
                            onClick={ () => this.handleOnExecute() }>
                            <PlayIcon />
                        </button>
                        <button type="button"
                            onClick={ () => this.handleDialogShowOnSelect() }>
                            <EllipsisVerticalIcon />
                        </button>
                    </div>
                </div>
                <div className="block-main">
                    <div className="name">{ automate.name }</div>
                    <div className="project">
                        <div className="label">Pr.:</div> 
                        <div className="value">{ automate.project.name }</div>
                    </div>
                    <div className="date-latest">
                        <div className="label">Done:</div>
                        <div className="date">{ automate.exec_info.date }</div>
                    </div>
                </div>
                <div className="block-bottom">
                    <div className="type">{ automate.type }</div>
                </div>
            </div>
        )
    }
}