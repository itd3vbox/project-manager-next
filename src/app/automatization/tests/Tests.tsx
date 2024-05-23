'use client';

import React from "react"
import {
    XMarkIcon,
    PlusIcon,
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
        const elements: any = []
        for (let index = 0; index < 0; index++) 
        {
            elements.push()    
        }
        return elements
    }

    render()
    {
        return (
            <div id="tests">
                <div className="p-options">
                    <div className="options">
                        <button type="button" className="btn-add">
                           <PlusIcon />
                        </button>
                    </div>
                    <div className="dialogs"></div>
                </div>
                <div className="p-list">
                    { this.renderTests() }
                </div>
            </div>
        )
    }
}