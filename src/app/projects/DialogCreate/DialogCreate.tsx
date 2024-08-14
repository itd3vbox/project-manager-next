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
    formData: {
        [key: string]: any
    }
}

export default class DialogCreate extends React.Component<any, DialogCreateState>
{

    constructor(props: any)
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

        for (const key in formData) 
        {
            if (formData.hasOwnProperty(key))
                multipartFormData.append(key, formData[key])
        }
    

        try {
            const response = await fetch('http://projectmanager.demo/projects', {
                method: 'POST',
                // headers: {
                //     'Accept': '*/*',
                //     'Content-Type': 'multipart/form-data', //'application/json'
                // },
                body: multipartFormData, //JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
        } 
        catch (error) 
        {
            console.error('Erreur lors de la soumission du formulaire', error)
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