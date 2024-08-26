'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";


interface DialogDeleteProps
{
    onDelete: () => void
}


interface DialogDeleteState
{
    isSelected: boolean
    data: any
}

export default class DialogDelete extends React.Component<DialogDeleteProps, DialogDeleteState>
{

    constructor(props: DialogDeleteProps)
    {
        super(props)
        this.state = {
            isSelected: false,
            data: null,
        }
    }

    select(data: any = null)
    {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
            data: data,
        })
    }

    async destroy()
    {
        if (!this.state.data)
            return 

        const multipartFormData = new FormData()
        multipartFormData.append('_method', 'DELETE')

        // for (const key in formData) 
        // {
        //     if (formData.hasOwnProperty(key))
        //         multipartFormData.append(key, formData[key])
        // }

        const url: string = 'http://projectmanager.demo/api/projects/' + this.state.data.id 

        const token = localStorage.getItem('access_token')
        
        if (!token) {
            console.error('No token found')
            return
        }
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    //'Origin': 'http://localhost:3000',
                },
                body: multipartFormData, //JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            
            this.setState({
                isSelected: false,
                data: null,
            }, () => this.props.onDelete())            
        } 
        catch (error) 
        {
            console.error('Error', error)
        }
    }

    handleOnDelete()
    {
        this.destroy()
    }

    render()
    {
        return (
            <div className={ "dialog-delete" + (this.state.isSelected ? ' selected' : '') }>
                <div className="dc-close">
                    <button type="button" className="btn-close"
                        onClick={ () => this.select() }>
                        <XMarkIcon />
                    </button>
                </div>
                <div className="dc-zero">
                    <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" alt="" />
                    <div className="text">
                        <h4>Delete Project</h4>
                        <p>Be careful, you are going to delete the project.</p>
                    </div>
                </div>
                <div className="dc-main">
                    <div className="confirmation">
                        <h6>{ this.state.data ? this.state.data.name: '' }</h6>
                        <p className="description-short">{ this.state.data ? this.state.data.description_short: '' }</p>
                        <button type="button"
                            onClick={ () => this.handleOnDelete() }>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}