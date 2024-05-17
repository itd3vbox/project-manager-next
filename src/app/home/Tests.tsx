'use client';

import React from "react"
import {
    PlayIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';


interface TestsProps
{
    
}


interface TestsState
{
    
}

export default class Tests extends React.Component<any, TestsState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    renderTests()
    {
        const tests: any = []

        for (let index = 0; index < 5; index++) 
        {
            tests.push(
                <div className={ "test" + (index === 0 ? ' on-progress' : '') } key={ index }>
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
            <div className="h-tests">
                <div className="label">
                    <h6>Tests <span className="total">(5)</span></h6>
                </div>
                <div className="list">
                    { this.renderTests() }
                </div>
            </div>
        )
    }
}