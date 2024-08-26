'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";


interface DialogCreateProps
{
    onCreate: () => void
}


interface DialogCreateState
{
    isSelected: boolean
    formData: {
        [key: string]: any
    }
}

export default class DialogCreate extends React.Component<DialogCreateProps, DialogCreateState>
{

    constructor(props: DialogCreateProps)
    {
        super(props)
        this.state = {
            isSelected: false,
            formData: {},
        }
    }

    select()
    {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
        })
    }

    handleImageUpload = (data: { file: File | null, url: string | null }) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                image: data.file 
            }
        }))
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) 
    {
        const { name, value } = event.target
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }))
    }

    handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) 
    {
        event.preventDefault()
        this.store()
    }

    async store()
    {
        const { formData } = this.state

        const multipartFormData = new FormData()
        //multipartFormData.append('_method', 'POST')
        multipartFormData.append('name', this.state.formData.name)
        multipartFormData.append('description_short', this.state.formData.description_short)
        multipartFormData.append('image', this.state.formData.image)
        console.log('image', this.state.formData.image)

        // for (const key in formData) 
        // {
        //     if (formData.hasOwnProperty(key))
        //         multipartFormData.append(key, formData[key])
        // }

        const url: string = 'http://projectmanager.demo/api/projects'

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
            this.props.onCreate()
        } 
        catch (error) 
        {
            console.error('Error', error)
        }
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
                        <h4>Create Project</h4>
                        <p>It is time to create a wonderful project.</p>
                    </div>
                </div>
                <div className="dc-main">
                    <form>
                        <div className="form-row">
                            <label>Image</label>
                            <ImageUploader 
                                onUpload={this.handleImageUpload}/>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-name">Name</label>
                            <input type="text" name="name" 
                                id="dc-name"
                                placeholder="Ex.: Project Manager"
                                onChange={(e) => this.handleInputChange(e)} />
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-description-short">Description Short</label>
                            <textarea name="description_short" 
                                id="dc-description-short"
                                placeholder="Ex.: ..."
                                onChange={(e) => this.handleInputChange(e)}></textarea>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <button type="button" onClick={(e) => this.handleSubmit(e)}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}