'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import Menu from "./Menu";
import Top from "./Top";
import SignIn from "./sign-in/SignIn";

import { connect } from 'react-redux';
import { signIn, signOut } from '@/lib/actions/space/spaceActions';
import { RootState } from '@/lib/store'; 

interface AppProps
{
    children: React.ReactNode
    space: any
    signIn: (user: any) => void
    signOut: () => void
}


interface AppState
{
    isSigned: boolean
}

class App extends React.Component<AppProps, AppState>
{
    refMenu: any

    constructor(props: AppProps)
    {
        super(props)
        this.state = {
            isSigned: false,
        }
        this.refMenu = React.createRef()
    }

    componentDidMount(): void {
        this.checkAuth()
        console.log('Fetching CSRF token...');
        this.getCsrfToken();
        console.log('CSRF token fetched.');
    }

    async checkAuth()
    {
        try {
            const token = localStorage.getItem('access_token');
    
            if (!token)
                return
    
            const response = await fetch('http://projectmanager.demo/api/check-auth', {
                method: 'GET',
                credentials: 'include', 
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
    
            if (response.ok) 
            {
                const data = await response.json()
                console.log('User logged:', data)
                this.props.signIn(data.user)
            } 
            else 
            {
                localStorage.clear();   
                throw new Error('Error Auth')
            }
        } 
        catch (error) 
        {
            console.error('Error:', error)
            localStorage.clear()
            this.props.signOut()
        }
    }

    async getCsrfToken() 
    {
        const csrfUrl = 'http://projectmanager.demo/sanctum/csrf-cookie'
        try {
            const response = await fetch(csrfUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    //'Origin': 'http://localhost:3000',
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch CSRF token')
            }
        } 
        catch (error) {
            console.error('CSRF token error:', error)
        }
    }

    handleMenuButtonOnSelect = () => {
        if (this.refMenu.current) {
            this.refMenu.current.select()
        }
    }

    renderSignIn()
    {
        if (this.props.space.isSigned)
            return (<></>)

        return (<SignIn />)
    }

    renderDashboard()
    {
        if (!this.props.space.isSigned)
            return (<></>)
        
        return (
            <div id="page">
                <Menu ref={this.refMenu} />
                <div id="page-main">
                    <Top onMenuOnSelect={ this.handleMenuButtonOnSelect } />
                    <div id="page-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

    render()
    {
        return (
            <html lang="en">
                <body>
                    { this.renderSignIn() }
                    { this.renderDashboard() }
                </body>
            </html>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    space: state.space,
})

const mapDispatchToProps = {  
    signIn: signIn,
    signOut: signOut,
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App)
