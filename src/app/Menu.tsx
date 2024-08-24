'use client';

import React from "react"
import Link from 'next/link';
import {
    XMarkIcon,
    SparklesIcon,
    ArrowDownIcon,
    ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { connect } from 'react-redux';
import { signIn, signOut } from '@/lib/actions/space/spaceActions';
import { RootState } from '@/lib/store'; 

interface MenuProps
{
    signOut: () => void
}

interface MenuState
{
    isSelected: boolean
}

class Menu extends React.Component<MenuProps, MenuState>
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

    async signOut() 
    {
        const url: string = 'http://projectmanager.demo/api/sign-out';

        const token = localStorage.getItem('access_token');
        
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
                },
            })

            if (!response.ok) 
            {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Network response was not ok')
            }

            const data = await response.json()
            console.log('Sign out successful:', data)

            localStorage.clear()

            this.props.signOut()
        } 
        catch (error: any) 
        {
            console.error('Sign out error:', error)
        }
    }

    handleOnSignOut()
    {
        this.signOut()
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
                <div className="content-top">
                    <button className="btn" type="button"
                        onClick={() => this.handleOnSignOut()}>
                        <ArrowLeftEndOnRectangleIcon />
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

const mapStateToProps = (state: RootState) => ({
    space: state.space,
})

const mapDispatchToProps = {  
    signOut: signOut,
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Menu)
