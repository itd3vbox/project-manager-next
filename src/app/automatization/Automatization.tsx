'use client';

import React from "react"
import {
    XMarkIcon,
    PlusIcon,
    StarIcon,
    PlayIcon,
    EllipsisVerticalIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';
import Pagination from "@/components/pagination/Pagination";
import DialogCreate from "./DialogCreate/DialogCreate";
import DialogShow from "./DialogShow/DialogShow";
import DialogDelete from "./DialogDelete/DialogDelete";
import DialogScheduler from "./DialogScheduler/DialogScheduler";


interface AutomatizationProps
{
    
}


interface AutomatizationState
{
    data: any
}

export default class Automatization extends React.Component<AutomatizationProps, AutomatizationState>
{
    refDialogCreate: any
    refDialogShow: any
    refDialogDelete: any
    refDialogScheduler: any

    constructor(props: AutomatizationProps)
    {
        super(props)
        this.state = {
            data: [],
        }
        this.refDialogCreate = React.createRef()
        this.refDialogShow = React.createRef()
        this.refDialogDelete = React.createRef()
        this.refDialogScheduler = React.createRef()
    }

    componentDidMount(): void 
    {
        this.search()
    }

    async search()
    {
        const formData = {
            is_asc: false,
            max: 20,
            with_project: true,
        }
    
        const url: string = 'http://projectmanager.demo/api/automates/search'

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
                data: result,
            })
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }
    
   
     handleDialogCreateOnSelect()
    {
        this.refDialogCreate.current.select()
    }

    handleDialogShowOnSelect()
    {
        this.refDialogShow.current.select()
    }

    handleDialogSchedulerOnSelect()
    {
        this.refDialogScheduler.current.select()
    }

    handleOnCreate()
    {
        this.search()
    }

    renderAutomates()
    {
        const automates = this.state.data.data ? this.state.data.data.data : []
        let elements: any = []
        for (let index = 0; index < automates.length; index++) 
        {
            const automate = automates[index]

            elements.push(
                <div className="automate" key={index}>
                    <div className="block-top">
                        <div className="icon">
                            <StarIcon />
                        </div>
                        <div className="options">
                            <button type="button">
                                <PlayIcon />
                            </button>
                            <button type="button"
                                onClick={ () => this.handleDialogShowOnSelect() }>
                                <EllipsisVerticalIcon />
                            </button>
                        </div>
                    </div>
                    <div className="block-main">
                        <div className="name">{ automate.name }</div>
                        <div className="project">
                            <div className="label">Pr.:</div> 
                            <div className="value">{ automate.project.name }</div>
                        </div>
                        <div className="date-latest">
                            <div className="label">Done:</div>
                            <div className="date">2024-12-31</div>
                        </div>
                    </div>
                    <div className="block-bottom">
                        <div className="type">{ automate.type }</div>
                    </div>
                </div>
            )
        }
        return elements
    }

    render()
    {
        return (
            <div id="automatization">
                {/* Reusable Component ... copy this model */}
                <div className="a-block-top">
                    <div className="block-zero">
                        <button type="button" className="btn-create"
                            onClick={ () => this.handleDialogCreateOnSelect() }>
                            <PlusIcon />
                        </button>
                        <button type="button" className="btn-scheduler"
                            onClick={ () => this.handleDialogSchedulerOnSelect() }>
                            <CalendarIcon />
                        </button>
                    </div>
                    <div className="block-metrics"></div>
                </div>
                <div className="a-block-main">
                    <div className="list">
                        { this.renderAutomates() }
                    </div>
                    <Pagination />
                </div>
                <DialogCreate ref={ this.refDialogCreate }
                    onCreate={ () => this.handleOnCreate() } />
                <DialogShow ref={ this.refDialogShow } data={ {} } />
                <DialogDelete ref={ this.refDialogDelete } />
                <DialogScheduler ref={ this.refDialogScheduler } />
            </div>
        )
    }
}