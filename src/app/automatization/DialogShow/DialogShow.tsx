'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    PlayIcon,
} from '@heroicons/react/24/outline';
import ImageUploader from "@/components/image-uploader/ImageUploader";
import Task from "@/app/tasks/Task";


interface DialogShowProps
{

}


interface DialogShowState
{
    isSelected: boolean
    tabsMenuItemSelected: number
    data: any
    dataLog: any
}

export default class DialogShow extends React.Component<DialogShowProps, DialogShowState>
{

    constructor(props: DialogShowProps)
    {
        super(props)
        this.state = {
            isSelected: false,
            tabsMenuItemSelected: 1,
            data: null,
            dataLog: null,
        }
    }

    select(data: any = null)
    {
        this.setState({
            isSelected: !this.state.isSelected,
            data: data,
        }, () => {
            if (this.state.isSelected)
                this.log()
        })
    }

    async log()
    {
        const formData = new FormData()
        //formData.append('_method', 'PATCH')
    
        const url: string = 'http://projectmanager.demo/api/automates/' + this.state.data.id + '/log'

        const token = localStorage.getItem('access_token')
        
        if (!token) {
            console.error('No token found')
            return
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Origin': 'http://localhost:3000',
                },
                //body: formData,
            })

            const result = await response.json()
            console.log(result)
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    handleTabsMenuItemOnClick(index: number)
    {
        this.setState({
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
        const automate = this.state.data ? this.state.data : null
        if (!automate) 
            return <></> 

        let defaultLog = `
        [2024-05-24 10:00:00] INFO: Starting the automation process...
        [2024-05-24 10:01:00] DEBUG: Fetching data from API endpoint...
        [2024-05-24 10:02:00] INFO: Data fetch successful. Processing data...
        [2024-05-24 10:03:00] WARN: Data format is not as expected, attempting to reformat...
        [2024-05-24 10:04:00] INFO: Data reformatting successful. Continuing with processing...
        [2024-05-24 10:05:00] ERROR: Failed to connect to the database. Retrying...
        [2024-05-24 10:06:00] INFO: Retry successful. Connected to the database.
        [2024-05-24 10:07:00] DEBUG: Writing processed data to the database...
        [2024-05-24 10:08:00] INFO: Data write complete.
        [2024-05-24 10:09:00] INFO: Automation process completed successfully.
      
        [2024-05-24 10:10:00] INFO: Starting the automation process...
        [2024-05-24 10:11:00] DEBUG: Fetching data from API endpoint...
        [2024-05-24 10:12:00] INFO: Data fetch successful. Processing data...
        [2024-05-24 10:13:00] WARN: Data format is not as expected, attempting to reformat...
        [2024-05-24 10:14:00] INFO: Data reformatting successful. Continuing with processing...
        [2024-05-24 10:15:00] ERROR: Failed to connect to the database. Retrying...
        [2024-05-24 10:16:00] INFO: Retry successful. Connected to the database.
        [2024-05-24 10:17:00] DEBUG: Writing processed data to the database...
        [2024-05-24 10:18:00] INFO: Data write complete.
        [2024-05-24 10:19:00] INFO: Automation process completed successfully.
        `
        for (let index = 0; index < 2; index++) 
            defaultLog += defaultLog

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
                            onClick={ () => this.handleTabsMenuItemOnClick(2) }>Log</button>
                    </div>
                    <div className="m-tabs-contents">
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 1 ? ' selected' : '')}>
                            <div className="c-overview">
                                <div className="automate">
                                    <h4>{ automate.name ? automate.name : 'Automate 1' }</h4>
                                    <p className="description-short">{ automate.description_short ? automate.description_short : 'A good project to help me to build other projects.' }</p>
                                    <div className="type">Test</div>
                                    <div className="date">
                                        <div className="label">Exec. Done:</div>
                                        <div className="value">2024-12-31 23:00:15</div>
                                    </div>
                                    <div className="options">
                                        <button type="button" className="btn-play">
                                            <PlayIcon />
                                        </button>
                                    </div>
                                </div>
                                <div className="project">
                                    <div className="block-zero">
                                        <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&amp;resize=1600x1200&amp;vertical=top" alt=""/>
                                    </div>
                                    <div className="block-main">
                                        <h6>Project 1</h6>
                                        <p className="description-short">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ullam tempore accusamus similique repellat voluptate qui saepe molestias non odit.
                                        </p>
                                    </div>
                                </div>
                                <div className="description">
                                    <h3>Description</h3>
                                    <div className="d-content">
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quia dicta ea. Quia harum optio eos neque. At, eveniet reiciendis!
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quia dicta ea. Quia harum optio eos neque. At, eveniet reiciendis!
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quia dicta ea. Quia harum optio eos neque. At, eveniet reiciendis!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"tc-content" + (this.state.tabsMenuItemSelected === 2 ? ' selected' : '')}>
                           <div className="c-log">
                                <pre><code>{ '' }</code></pre>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}