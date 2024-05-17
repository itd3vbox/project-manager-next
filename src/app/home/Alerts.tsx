'use client';

import React from "react"
import {
    ExclamationTriangleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';


interface AlertsProps
{
    
}


interface AlertsState
{
    
}

export default class Alerts extends React.Component<any, AlertsState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    renderAlerts()
    {
        const alerts: any = []

        for (let index = 0; index < 5; index++) 
        {
            alerts.push(
                <div className={ "alert" + (index === 0 ? ' read' : '') } key={ index }>
                    <div className="icon">
                        <ExclamationTriangleIcon />
                    </div>
                    <div className="title-message">
                        <h6 className="title">Debug Project 1</h6>
                        <p className="message">Somme compilation error occured.</p>
                    </div>                    
                    <button type="button">
                        <XMarkIcon />                       
                    </button>
                </div>
            )
        }
        return alerts
    }

    render()
    {
        return (
            <div className="h-alerts">
            {/* Reusable Component ... copy this model */}
                <div className="label">
                    <h6>Alerts <span className="total">(5)</span></h6>
                </div>
                <div className="list">
                    { this.renderAlerts() }
                </div>
            </div>
        )
    }
}