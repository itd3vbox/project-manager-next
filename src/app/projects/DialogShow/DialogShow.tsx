'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";
import Task from "./Task";


interface DialogShowProps
{
    data: any
}


interface DialogShowState
{
    isSelected: boolean
    tabsMenuItemSelected: number
}

export default class DialogShow extends React.Component<DialogShowProps, DialogShowState>
{

    constructor(props: DialogShowProps)
    {
        super(props)
        this.state = {
            isSelected: false,
            tabsMenuItemSelected: 1,
        }
    }

    select()
    {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
        })
    }

    handleTabsMenuItemOnClick(index: number)
    {
        this.setState({
            ...this.state,
            tabsMenuItemSelected: index,
        })
    }

    renderTasks()
    {
        const elements: any = []
        for (let index = 0; index < 10; index++) 
        {
            elements.push(<Task key={ index } order={ index + 1 } />)
        }
        return (elements)
    }

    render()
    {
        return (
            <div className={ "dialog-show" + (this.state.isSelected ? ' selected' : '') }>
                <div className="dc-close">
                    <button type="button" className="btn-close"
                        onClick={ () => this.select() }>
                        <XMarkIcon />
                    </button>
                </div>
                <div className="dc-zero">
                    <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" alt="" />
                </div>
                <div className="dc-main">
                    <div className="m-tabs-menu">
                        <button type="button" className="tm-item"
                            onClick={ () => this.handleTabsMenuItemOnClick(1) }>Overview</button>
                        <button type="button" className="tm-item"
                            onClick={ () => this.handleTabsMenuItemOnClick(2) }>Tasks</button>
                    </div>
                    <div className="m-tabs-contents">
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 1 ? ' selected' : '')}>
                            <div className="c-overview">
                                <h4>{ this.props.data ? this.props.data.name : 'Project Unk.' }</h4>
                                <p className="description-short">{ this.props.data ? this.props.data.description_short : 'A good project to help me to build other projects.' }</p>
                            </div>
                        </div>
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 2 ? ' selected' : '')}>
                            <div className="c-tasks">
                                { this.renderTasks() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}