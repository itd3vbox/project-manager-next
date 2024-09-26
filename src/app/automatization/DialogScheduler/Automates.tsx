'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    StarIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Pagination from "@/components/pagination/Pagination";
import Automate from "./Automate";


interface AutomatesProps
{
    project: any
}


interface AutomatesState
{
    data: any
}

export default class Automates extends React.Component<AutomatesProps, AutomatesState>
{

    constructor(props: AutomatesProps)
    {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount(): void {
        this.search()
    }

    componentDidUpdate(prevProps: Readonly<AutomatesProps>, prevState: Readonly<AutomatesState>, snapshot?: any): void 
    {
        if (this.props.project && prevProps.project?.id !== this.props.project.id) 
        {
            this.search()
        }
    }
    

    async search(url: string = 'http://projectmanager.demo/api/automates/search')
    {
        if (!this.props.project)
        {
            this.setState({
                data: null,
            })
            return 
        }

        const formData = {
            is_asc: false,
            max: 20,
            project_id: this.props.project.id,
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
                data: result.data,
            })
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    handleOnPrev()
    {
        if (this.state.data && this.state.data.next_page_url)
            this.search(this.state.data.prev_page_url)
    }

    handleOnNext()
    {
        if (this.state.data && this.state.data.next_page_url)
            this.search(this.state.data.next_page_url)
    }

    // --- RENDER

    renderAutomates()
    {
        const data = this.state.data && this.state.data.data.length ? this.state.data.data : null
        if (!data)
            return (<></>)

        const elements: any = []
        for (let index = 0; index < data.length; index++) 
        {
            const automate = data[index]

            elements.push(
                <Automate key={index} data={ automate } />
            )
        }
        return (
            <div className="list">
                <div className="automates">
                    { elements }
                </div>
                <Pagination 
                    onPrev={ () => this.handleOnPrev() }
                    onNext={ () => this.handleOnNext() } />
            </div>
        )
    }

    renderEmptyMessage()
    {
        const data = this.state.data && this.state.data.data.length ? this.state.data.data : null
        if (data)
            return (<></>)

        return (
            <div className="empty-message">
                <div className="block-left">
                    <img src="" alt="" />
                </div>
                <div className="block-right">
                    <p></p>
                </div>
            </div>
        )
    }

    render()
    {
        return (
            <div className="c-automates">
                { this.renderAutomates() }
                { this.renderEmptyMessage() }
            </div>
        )
    }
}