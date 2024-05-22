'use client';

import React from "react"
import {
    XMarkIcon,
    StarIcon,
    PlayIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';


interface AutomatizationProps
{
    
}


interface AutomatizationState
{
    
}

export default class Automatization extends React.Component<any, AutomatizationState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    renderAutomates()
    {
        let elements: any = []
        for (let index = 0; index < 10; index++) 
        {
            elements.push(
                <div className="automate" key={index}>
                    <div className="block-top">
                        <div className="icon">
                            <StarIcon />
                        </div>
                        <div className="options">
                            <button type="button">
                                <PlayIcon />
                            </button>
                            <button type="button">
                                <EllipsisVerticalIcon />
                            </button>
                        </div>
                    </div>
                    <div className="block-main">
                        <div className="name">Test Unit</div>
                        <div className="project">
                            <div className="label">Pr.:</div> 
                            <div className="value">Project Manger</div>
                        </div>
                        <div className="date-latest">
                            <div className="label">Done:</div>
                            <div className="date">2024-12-31</div>
                        </div>
                    </div>
                    <div className="block-bottom">
                        <div className="type">Test</div>
                    </div>
                </div>
            )
        }
        return elements
    }

    render()
    {
        return (
            <div id="automatization">
                {/* Reusable Component ... copy this model */}
                <div className="a-block-top">
                    <div className="block-zero"></div>
                    <div className="block-metrics"></div>
                </div>
                <div className="a-block-main">
                    <div className="list">
                        { this.renderAutomates() }
                    </div>
                </div>
            </div>
        )
    }
}