'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    StarIcon,
    CheckCircleIcon,
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
        const elements: any = []
        for (let index = 0; index < 10; index++) 
        {
            elements.push(
                <div className={"automate" + (index % 3 === 0 ? ' selected' : '') } key={index}>
                    <div className="block-top">
                        <div className="icon">
                            <StarIcon />
                        </div>
                        <div className="type">Test</div>
                    </div>
                    <div className="block-main">
                        <h6>Test Unit</h6>
                        <p className="description-short">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae!
                        </p>
                        <div className="date">
                            <div className="label">Done:</div>
                            <div className="value">202-12-31 23:00:00</div>
                        </div>
                    </div>
                    <div className="block-check">
                        <button type="button" className="btn-check">
                            <CheckCircleIcon />
                        </button>
                    </div>
                </div>
            )
        }
        return elements
    }

    render()
    {
        return (
            <div className="c-automates">
                { this.renderAutomates() }
            </div>
        )
    }
}