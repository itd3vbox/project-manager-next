'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";


interface DialogEditProps
{
    
}


interface DialogEditState
{
    isSelected: boolean
    formData: {
        [key: string]: any
    }
}

export default class DialogEdit extends React.Component<any, DialogEditState>
{

    constructor(props: any)
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
            formData['edit_url'] = 'http://projectmanager.demo/projects/' + data.id
            formData['name'] = data.name
            formData['description_short'] = data.description_short
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

    async update() {
        const { formData } = this.state;
    
        const multipartFormData = new FormData();
        console.log('formData:', formData);
    
        Object.keys(formData).forEach(key => {
            multipartFormData.append(key, formData[key]);
        });

        multipartFormData.append('_method', 'PUT')
    
        
        const entriesIterator = multipartFormData.entries();
        let pair = entriesIterator.next();
        while (!pair.done) {
            console.log(pair.value[0] + ', ' + pair.value[1]);
            pair = entriesIterator.next();
        }
    
        console.log(multipartFormData, formData);
    
        try {
            const response = await fetch(this.state.formData['edit_url'], {
                method: 'POST',
                body: multipartFormData,
                // headers: {
                //     'Accept': '*/*',
                //     'Content-Type': 'multipart/form-data',
                // },
            });
    
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire', error);
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
                        <h4>Edit Project</h4>
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
                                defaultValue={ this.state.formData.name }
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
                            <button type="button" onClick={(e) => this.handleSubmit(e)}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}