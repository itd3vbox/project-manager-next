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

        }
        this.refDialogCreate = React.createRef()
        this.refDialogShow = React.createRef()
        this.refDialogDelete = React.createRef()
        this.refDialogScheduler = React.createRef()
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

    renderAutomates()
    {
        let elements: any = []
        for (let index = 0; index < 10; index++) 
        {
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
                        <div className="name">Test Unit</div>
                        <div className="project">
                            <div className="label">Pr.:</div> 
                            <div className="value">Project Manger</div>
                        </div>
                        <div className="date-latest">
                            <div className="label">Done:</div>
                            <div className="date">2024-12-31</div>
                        </div>
                    </div>
                    <div className="block-bottom">
                        <div className="type">Test</div>
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
                <DialogCreate ref={ this.refDialogCreate } />
                <DialogShow ref={ this.refDialogShow } data={ {} } />
                <DialogDelete ref={ this.refDialogDelete } />
                <DialogScheduler ref={ this.refDialogScheduler } />
            </div>
        )
    }
}