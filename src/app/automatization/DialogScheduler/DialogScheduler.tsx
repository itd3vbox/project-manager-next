'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import MainForm from "./MainForm";
import Automates from "./Automates";



interface DialogSchedulerProps
{
    
}


interface DialogSchedulerState
{
    isSelected: boolean
    tabsMenuItemSelected: number
}

export default class DialogScheduler extends React.Component<DialogSchedulerProps, DialogSchedulerState>
{

    constructor(props: DialogSchedulerProps)
    {
        super(props)
        this.state = {
            isSelected: false,
            tabsMenuItemSelected: 2,
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

    render()
    {
        return (
            <div className={ "dialog-scheduler" + (this.state.isSelected ? ' selected' : '') }>
                <div className="ds-close">
                    <button type="button" className="btn-close"
                        onClick={ () => this.select() }>
                        <XMarkIcon />
                    </button>
                </div>
                <div className="ds-zero">
                    <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" alt="" />
                    <div className="text">
                        <h4>Scheduler</h4>
                        <p>Plan your next Automate.</p>
                    </div>
                </div>
                <div className="ds-main">
                    <div className="m-tabs-menu">
                        <button type="button" className="tm-item"
                            onClick={ () => this.handleTabsMenuItemOnClick(1) }>Overview</button>
                        <button type="button" className="tm-item"
                            onClick={ () => this.handleTabsMenuItemOnClick(2) }>Auomates</button>
                    </div>
                    <div className="m-tabs-contents">
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 1 ? ' selected' : '')}>
                            <MainForm />
                        </div>
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 2 ? ' selected' : '')}>
                           <Automates />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}