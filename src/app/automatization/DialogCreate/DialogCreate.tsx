'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";


interface DialogCreateProps
{
    
}


interface DialogCreateState
{
    isSelected: boolean
}

export default class DialogCreate extends React.Component<any, DialogCreateState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {
            isSelected: false,
        }
    }

    select()
    {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
        })
    }

    render()
    {
        return (
            <div className={ "dialog-create" + (this.state.isSelected ? ' selected' : '') }>
                <div className="dc-close">
                    <button type="button" className="btn-close"
                        onClick={ () => this.select() }>
                        <XMarkIcon />
                    </button>
                </div>
                <div className="dc-zero">
                    <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" alt="" />
                    <div className="text">
                        <h4>Create Task</h4>
                        <p>It is time to create a new task for your project.</p>
                    </div>
                </div>
                <div className="dc-main">
                    <form>
                        <div className="form-row">
                            <label>Project ID</label>
                            <input type="text" name="dc-project-id" id="dc-project-id" />
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-name">Name</label>
                            <input type="text" name="dc-name" id="dc-name" />
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-description-short">Description Short</label>
                            <textarea name="dc-description-short" id="dc-description-short"
                                placeholder="Ex.: ..."></textarea>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-description">Description</label>
                            <textarea name="dc-description" id="dc-description"
                                placeholder="Ex.: ..."></textarea>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-command">Command</label>
                            <textarea name="dc-command" id="dc-command"
                                placeholder="Ex.: /user/machine/automate.sh"></textarea>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <button type="button">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}