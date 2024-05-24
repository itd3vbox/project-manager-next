'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';


interface PickerTimeProps
{
    
}


interface PickerTimeState
{
    pickerOption: number // 1 = Hours, 2 = Minutes =, 3 = Seconds
}

export default class PickerTime extends React.Component<PickerTimeProps, PickerTimeState>
{

    constructor(props: PickerTimeProps)
    {
        super(props)
        this.state = {
            pickerOption: 1, 
        }
    }

    renderPickerValues()
    {
        let elements: any = []
        let max: number = 24
        if (this.state.pickerOption === 1)
            max = 24
        else if (this.state.pickerOption === 2 || this.state.pickerOption === 3)
            max = 60
        for (let index = 0; index < 10; index++)
        {
            elements.push(<button type="button" className="btn-value" key={ index }>{ index }</button>)
        }
        return (elements)
    }

    render()
    {
        return (
            <div className="picker-time">
                <div className="values">
                    <input type="text" name="hours" maxLength={2} />
                    <span className="seperator">:</span>
                    <input type="text" name="minutes" maxLength={2} />
                    <span className="seperator">:</span>
                    <input type="text" name="seconds" maxLength={2} />
                </div>
                <div className="picker">
                    <div className="p-options">
                        <div className="time">
                            <button type="button" className="btn-hours">H</button>
                            <button type="button" className="btn-minutes">M</button>
                            <button type="button" className="btn-seconds">S</button>
                        </div>
                        <div className="others">
                            <button type="button" className="btn-reset">
                                <XMarkIcon />
                            </button>
                        </div>
                    </div>
                    <div className="p-values">
                        { this.renderPickerValues() }
                    </div>
                </div>
            </div>
        )
    }
}