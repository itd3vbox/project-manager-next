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
    isSelected: boolean
}

export default class Menu extends React.Component<MenuProps, MenuState>
{

    constructor(props: MenuProps)
    {
        super(props)
        this.state = {
            isSelected: false,
        }
    }

    select() {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
        });
    }

    render()
    {
        return (
            <div id="page-menu"  className={this.state.isSelected ? 'selected' : ''}>
                <div className="content-close">
                    <button className="btn" type="button"
                        onClick={() => this.select()}>
                        <XMarkIcon />
                    </button>
                </div>
                <div className="content-main">

                    <Link href="/" className="home-link">
                        <span className="icon">
                            <SparklesIcon />
                        </span>
                        <span className="name">Project Managment</span>
                    </Link>
                    
                    <div className="menu">

                        <Link href="/projects" className="menu-item current">
                            <span className="icon">
                                <SparklesIcon />
                            </span>
                            <span className="name">Projects</span>
                        </Link>

                        <Link href="/tasks" className="menu-item">
                            <span className="icon">
                                <SparklesIcon />
                            </span>
                            <span className="name">Tasks</span>
                        </Link>

                        <div className="menu-sub">

                            <div className="menu-sub-item current">
                                <Link href="/automatization" className="menu-item">
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
                                <Link href="/automatization/notifications" className="menu-item">
                                    Notifications
                                </Link>
                            </div>
                        </div>  
                    
                        <Link href="/settings" className="menu-item">
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