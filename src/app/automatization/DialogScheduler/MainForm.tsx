'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import Calendar from "@/components/calendar/Calendar";
import PickerTime from "@/components/picker-time/PickerTime";

interface MainFormProps
{
    
}


interface MainFormState
{
    
}

export default class MainForm extends React.Component<MainFormProps, MainFormState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    render()
    {
        return (
            <div className="c-main-form">
                <form>
                    <div className="form-row">
                        <label>Date</label>
                        <Calendar />
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row">
                        <label>Time</label>
                        <PickerTime />
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row">
                        <label>Project ID</label>
                        <input type="text" name="dc-project-id" id="dc-project-id" />
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row">
                        <label htmlFor="dc-description">Description</label>
                        <textarea name="dc-description" id="dc-description"
                            placeholder="Ex.: ..."></textarea>
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row">
                        <label htmlFor="dc-description">Automates</label>
                        <p>Choose your Automates (curr.: <span className="value">0</span> ).</p>
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row">
                        <button type="button">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}