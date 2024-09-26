'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    MagnifyingGlassIcon,
    SparklesIcon,
    ArrowDownIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Calendar from "@/components/calendar/Calendar";
import PickerTime from "@/components/picker-time/PickerTime";
import Project from "./Project";
import Pagination from "@/components/pagination/Pagination";

interface MainFormProps
{
    onProjectSelect: (data: any) => void
}


interface MainFormState
{
    data: any
    dataProjects: any
    projectSelected: any
}

export default class MainForm extends React.Component<MainFormProps, MainFormState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {
            data: {
                date: null,
                time: null,
                project: '',
                description: '',
            },
            dataProjects: null,
            projectSelected: null,
        }
    }

    async searchProjects(url: string = 'http://projectmanager.demo/api/projects/search')
    {
        const formData = {
            is_asc: false,
            max: 20,
            keywords: this.state.data.project,
        }
    
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
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Origin': 'http://localhost:3000',
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()
            console.log(result)
            this.setState({
                ...this.state,
                dataProjects: result.data,
            })
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    handleOnDate(date: any)
    {
        console.log('date ...', date)
    }

    handleOnTime(time: any)
    {
        console.log('time ...', time)
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) 
    {
        const { name, value } = event.target
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }))
    }

    handleProjectsOnSearch()
    {
        this.searchProjects()
    }

    handleOnSelect(data: any, isSelected: boolean)
    {
        this.setState({
            projectSelected: isSelected ? data : null,
        }, () => {
            this.props.onProjectSelect(this.state.projectSelected)
        })
    }
    
    handleOnPrev()
    {
        if (this.state.dataProjects && this.state.dataProjects.next_page_url)
            this.searchProjects(this.state.dataProjects.prev_page_url)
    }

    handleOnNext()
    {
        if (this.state.dataProjects && this.state.dataProjects.next_page_url)
            this.searchProjects(this.state.dataProjects.next_page_url)
    }

    // --- RENDER

    renderProjects()
    {
        const data = this.state.dataProjects && this.state.dataProjects.data.length ? this.state.dataProjects.data : null
        if (!data)
            return (<></>)
        
        const elements: any = []

        for (let index = 0; index < data.length; index++)
        {
            const project = data[index]
            elements.push(
                <Project key={ index }
                    data={ project }
                    isSelected={ this.state.projectSelected && this.state.projectSelected.id === project.id }
                    onSelect={ (data: any, isSelected: boolean) => this.handleOnSelect(data, isSelected) } />
            ) 
        }

        return (
            <div className="list">
                <div className="projects">
                    { elements }
                </div>
                <Pagination 
                    onPrev={ () => this.handleOnPrev() }
                    onNext={ () => this.handleOnNext() } />
            </div>
        )
    }

    render()
    {
        return (
            <div className="c-main-form">
                <form>
                    <div className="form-row">
                        <label>Date</label>
                        <Calendar onDate={ (date: any) => this.handleOnDate(date) }/>
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row">
                        <label>Time</label>
                        <PickerTime onTime={ (time: any) => this.handleOnTime(time) } />
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row fr-project">
                        <label>Project</label>
                        <input type="text" 
                            name="project" 
                            placeholder="Ex.: Project Manager ..."
                            onChange={(e) => this.handleInputChange(e)} 
                            value={ this.state.data.project }
                            id="dc-project" />
                        <button type="button"
                            className="button-icon"
                            onClick={ () => this.handleProjectsOnSearch() }>
                            <MagnifyingGlassIcon />
                        </button>
                        <p className="error">Message error.</p>
                        { this.renderProjects() }
                    </div>
                    <div className="form-row">
                        <label htmlFor="dc-description">Description</label>
                        <textarea name="description" 
                            id="dc-description"
                            onChange={(e) => this.handleInputChange(e)}
                            value={ this.state.data.description } 
                            placeholder="Ex.: ..."></textarea>
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row">
                        <label htmlFor="dc-description">Automates</label>
                        <p>Choose your Automates (curr.: <span className="value">0</span> ).</p>
                        <p className="error">Message error.</p>
                    </div>
                    <div className="form-row fr-submit">
                        <button type="button">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}