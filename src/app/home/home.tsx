'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import Calendar from '@/components/calendar/Calendar';
import Project from "@/components/projects/Project";

import './sass/main.sass';

interface HomeProps
{
    
}


interface HomeState
{
    
}

export default class Home extends React.Component<any, HomeState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    renderProjects()
    {
        const projects: any = []

        for (let index = 0; index < 2; index++) 
        {
            projects.push(
                <Project />
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
                                <div className="value">100</div>
                            </div>
                        </div>
                        <div className="indicator">
                            <div className="label">Tasks</div>
                            <div className="icon-value">
                                <div className="icon">
                                    <SparklesIcon />
                                </div>
                                <div className="value">100</div>
                            </div>
                        </div>
                        <div className="indicator">
                            <div className="label">Tests</div>
                            <div className="icon-value">
                                <div className="icon">
                                    <SparklesIcon />
                                </div>
                                <div className="value">100</div>
                            </div>
                        </div>
                        <div className="indicator">
                            <div className="label">Alerts</div>
                            <div className="icon-value">
                                <div className="icon">
                                    <SparklesIcon />
                                </div>
                                <div className="value">100</div>
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
                <div className="h-tasks-tests-alerts">
                    
                </div>
            </div>
        )
    }
}