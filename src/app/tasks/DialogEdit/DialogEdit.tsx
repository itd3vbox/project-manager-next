'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";


interface DialogEditProps
{
    onEdit: () => void
}


interface DialogEditState
{
    isSelected: boolean
    formData: {
        [key: string]: any
    }
}

export default class DialogEdit extends React.Component<DialogEditProps, DialogEditState>
{

    constructor(props: DialogEditProps)
    {
        super(props)
        this.state = {
            isSelected: false,
            formData: {},
        }
    }

    select(data: any = null)
    {
        const formData: any = {}
        if (data)
        {
            formData['edit_url'] = 'http://projectmanager.demo/api/tasks/' + data.id
            formData['title'] = data.title
            formData['description_short'] = data.description_short
            formData['description'] = data.description
            formData['image_url'] = data.image_main_path
        }
        
        console.log(formData)

        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
            formData: formData,
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
        this.update()
    }

    async update() 
    {
        const { formData } = this.state

        const multipartFormData = new FormData()
        multipartFormData.append('_method', 'PUT')
        for (const key in formData) 
        {
            if (key === 'description')
                multipartFormData.append(key, JSON.stringify({ content: formData[key] }))
            else
                multipartFormData.append(key, formData[key])
        }

        const url: string = formData['edit_url']

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
                    'Origin': 'http://localhost:3000',
                },
                body: multipartFormData, //JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            this.props.onEdit()
        } 
        catch (error) 
        {
            console.error('Error', error)
        }
    }
    
    render()
    {
        return (
            <div className={ "dialog-edit" + (this.state.isSelected ? ' selected' : '') }>
                <div className="dc-close">
                    <button type="button" className="btn-close"
                        onClick={ () => this.select() }>
                        <XMarkIcon />
                    </button>
                </div>
                <div className="dc-zero">
                    <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" alt="" />
                    <div className="text">
                        <h4>Edit Tasks</h4>
                        <p>It is time to create a wonderful project.</p>
                    </div>
                </div>
                <div className="dc-main">
                    <form onSubmit={ (event) => event.stopPropagation() }>
                        <div className="form-row">
                            <label>Image</label>
                            <ImageUploader 
                                onUpload={this.handleImageUpload}/>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-title">Title</label>
                            <input type="text" name="title" 
                                id="dc-title"
                                defaultValue={ this.state.formData.title }
                                onChange={(e) => this.handleInputChange(e)} />
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-description-short">Description Short</label>
                            <textarea name="description_short" 
                                id="dc-description-short"
                                defaultValue={ this.state.formData.description_short }
                                placeholder="Ex.: ..."
                                onChange={(e) => this.handleInputChange(e)}></textarea>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="dc-description">Description</label>
                            <textarea name="description" 
                                id="dc-description"
                                defaultValue={ this.state.formData.description }
                                placeholder="Ex.: ..."
                                onChange={(e) => this.handleInputChange(e)}></textarea>
                            <p className="error">Message error.</p>
                        </div>
                        <div className="form-row">
                            <button type="button" 
                                onClick={(e) => this.handleSubmit(e)}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}