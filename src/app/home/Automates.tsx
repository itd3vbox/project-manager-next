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
    
}

export default class Automates extends React.Component<any, AutomatesState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    renderAutomates()
    {
        const tests: any = []

        for (let index = 0; index < 5; index++) 
        {
            tests.push(
                <div className={ "automate" + (index === 0 ? ' on-progress' : '') } key={ index }>
                    <div className="icon">
                        <ClockIcon />
                    </div>
                    <div className="title">Debug Project 1</div>
                    <div className="duration">25m 20s</div>
                    <button type="button">
                        <PlayIcon />
                    </button>
                </div>
            )
        }
        return tests
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