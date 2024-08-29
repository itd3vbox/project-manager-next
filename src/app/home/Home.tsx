'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import Calendar from '@/components/calendar/Calendar';
import Project from "./Project";

import Tasks from "./Tasks";
import Automates from "./Automates";
import Notifications from "./Notifications";

import './sass/main.sass';

interface HomeProps
{
    
}


interface HomeState
{
    dataMain: any
    dataProjects: any
}

export default class Home extends React.Component<HomeProps, HomeState>
{

    constructor(props: HomeProps)
    {
        super(props)
        this.state = {
            dataMain: {
                total_users: 0,
                total_projects: 0,
                total_tasks: 0,
                total_automates: 0,
            },
            dataProjects: null,
        }
    }

    componentDidMount(): void 
    {
        this.searchMainData()
        this.searchProjects()
    }

    async searchMainData()
    {
        const url: string = 'http://projectmanager.demo/api/app/main-data'

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
            })

            const result = await response.json()
            console.log(result)
            this.setState({
                dataMain: result,
            })
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    async searchProjects()
    {
        const formData = {
            is_asc: false,
            max: 2,
        }
    
        const url: string = 'http://projectmanager.demo/api/projects/search'

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
                dataProjects: result.data,
            })
        } 
        catch (error) 
        {
            console.error('Error fetch', error)
        }
    }

    renderProjects()
    {
        const projects: any = []
        const projectsData: any = this.state.dataProjects ? this.state.dataProjects.data : []

        console.log(projectsData)
        for (let index = 0; index < projectsData.length && index < 2; index++) 
        {
            const project = projectsData[index]
            projects.push(
                <Project key={index}
                    data={ project } />
            )
        }

        return projects
    }

    render()
    {
        return (
            <div id="home">
                <div className="h-zero">
                    <div className="block-zero">

                    </div>
                    <div className="block-indicators">
                        <div className="indicator">
                            <div className="label">Projects</div>
                            <div className="icon-value">
                                <div className="icon">
                                    <SparklesIcon />
                                </div>
                                <div className="value">{ this.state.dataMain.total_projects }</div>
                            </div>
                        </div>
                        <div className="indicator">
                            <div className="label">Tasks</div>
                            <div className="icon-value">
                                <div className="icon">
                                    <SparklesIcon />
                                </div>
                                <div className="value">{ this.state.dataMain.total_tasks }</div>
                            </div>
                        </div>
                        <div className="indicator">
                            <div className="label">Automates</div>
                            <div className="icon-value">
                                <div className="icon">
                                    <SparklesIcon />
                                </div>
                                <div className="value">{ this.state.dataMain.total_automates }</div>
                            </div>
                        </div>
                        <div className="indicator">
                            <div className="label">Users</div>
                            <div className="icon-value">
                                <div className="icon">
                                    <SparklesIcon />
                                </div>
                                <div className="value">{ this.state.dataMain.total_users }</div>
                            </div>
                        </div>
                    </div>
                    <Calendar />
                </div>
                <div className="h-projects">
                    <div className="block-zero">

                    </div>
                    <div className="block-projects">                    
                        { this.renderProjects() }
                    </div>
                </div>
                <div className="h-tasks-automates-notifications">
                   <Tasks />
                   <Automates />
                   <Notifications />
                </div>
            </div>
        )
    }
}