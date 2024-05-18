'use client';

import React from "react"
import Link from 'next/link';
import {
    XMarkIcon,
    SparklesIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';


interface MenuProps
{
    
}


interface MenuState
{
    
}

export default class Menu extends React.Component<any, MenuState>
{

    constructor(props: any)
    {
        super(props)
        this.state = {

        }
    }

    render()
    {
        return (
            <div id="page-menu">
                <div className="content-close">
                    <button className="btn" type="submit">
                        <XMarkIcon />
                    </button>
                </div>
                <div className="content-main">
                    <a href="/" className="home-link">
                        <span className="icon">
                            <SparklesIcon />
                        </span>
                        <span className="name">Project Managment</span>
                    </a>
                    <div className="menu">

                        <Link href="projects" className="menu-item current">
                            <span className="icon">
                                <SparklesIcon />
                            </span>
                            <span className="name">Projects</span>
                        </Link>

                        <Link href="tasks" className="menu-item">
                            <span className="icon">
                                <SparklesIcon />
                            </span>
                            <span className="name">Tasks</span>
                        </Link>

                        <div className="menu-sub">

                            <div className="menu-sub-item current">
                                <Link href="automatization" className="menu-item">
                                    <span className="icon">
                                        <SparklesIcon />
                                    </span>
                                    <span className="name">Automatization</span>
                                </Link>
                                <button className="btn" type="button">
                                    <ArrowDownIcon />
                                </button>
                            </div>

                            <div className="menu-sub-menu">
                                <Link href="automatization/tests" className="menu-item">
                                    Tests    
                                </Link>
                                <Link href="automatization/alerts" className="menu-item">
                                    Notifications
                                </Link>
                            </div>
                        </div>  
                    
                        <Link href="settings" className="menu-item">
                            <span className="icon">
                                <SparklesIcon />
                            </span>
                            <span className="name">Settings</span>
                        </Link>

                    </div>
                </div>
            </div>
        )
    }
}