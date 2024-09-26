'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    StarIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';


interface AutomateProps
{
    data: any
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

    render()
    {
        return (
            <div className={ "automate" }>
                <div className="block-top">
                    <div className="icon">
                        <StarIcon />
                    </div>
                    <div className="type">{ this.props.data.type }</div>
                </div>
                <div className="block-main">
                    <h6>{ this.props.data.name }</h6>
                    <p className="description-short">
                        { this.props.data.description_short }
                    </p>
                    <div className="date">
                        <div className="label">Done:</div>
                        <div className="value">{ this.props.data.exec_info.date }</div>
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
}