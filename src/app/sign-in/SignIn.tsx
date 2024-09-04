'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    AtSymbolIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';

import { connect } from 'react-redux';
import { signIn, signOut } from '@/lib/actions/space/spaceActions';
import { RootState } from '@/lib/store'; 

import './sass/main.sass'

interface SignInProps
{
    space: any
    signIn: (user: any) => void
}

interface SignInState
{
    errors: string[]
    data: any
    error?: string
}

class SignIn extends React.Component<SignInProps, SignInState>
{

    constructor(props: SignInProps)
    {
        super(props)
        this.state = {
            errors: [],
            data: {
                email: '',
                password: '',
            },
            error: '',
        }
    }

    async signIn()
    {
        const url = 'http://projectmanager.demo/api/sign-in'
        try {

            const formData = new FormData()
            //formData.append('_method', 'PUT')
            formData.append('email', this.state.data.email) 
            formData.append('password', this.state.data.password) 
    
            // const email = this.state.data.email
            // const password = this.state.data.password

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    //'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    //'Origin': 'http://localhost:3000',
                },
                body:  formData,
                credentials: 'include',
            })
        
            if (!response.ok) {
                const errorData = await response.json()
                this.setState({
                    error: errorData.error || 'An unknown error occurred.'
                });
                throw new Error(errorData.message || 'Network response was not ok')
            }
    
            const data = await response.json()
            console.log('Sign in successful:', data)
        
            localStorage.setItem('access_token', data.token)
        
            this.props.signIn(data.user)

            this.setState({
                ...this.state,
                data: {
                    email: '',
                    password: '',
                },
                error: '' ,
            })
        } 
        catch (error: any) {
            console.error('Sign in error:', error)
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        let data = this.state.data
        data[event.target.name] = event.target.value 
        this.setState({
            ...this.state,
            data: data,
        })
    }

    handleOnSignIn()
    {
        this.signIn()
    }

    render()
    {
        return (
            <div id="sign-in">
                <div className="si-block-left"></div>
                <div className="si-block-right">
                    <div className="wrapper">
                        <h1>Project Manager - Space</h1>
                        <p>Ready for a new adventure.</p>
                        <h4>Sign In</h4>
                        <form onSubmit={ (event: React.FormEvent<HTMLFormElement>) => event.preventDefault() }>
                            <div className="form-row">
                                <label htmlFor="email">Email</label>
                                <div className="input-icon">
                                    <input type="email" name="email" id="email" 
                                        placeholder="admin@projectmanager.demo"
                                        defaultValue={this.state.data.name_first}
                                        onChange={this.handleInputChange} />
                                    <div className="icon">
                                        <AtSymbolIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="password">Password</label>
                                <div className="input-icon">
                                    <input type="password" name="password" id="password"
                                        defaultValue={this.state.data.name_first}
                                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                        onChange={this.handleInputChange} />
                                    <div className="icon">
                                        <KeyIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <button type="button" className="button-text"
                                    onClick={ () => this.handleOnSignIn() }>Sign In</button>
                            </div>
                            <div className="form-errors">
                                {this.state.error && <p>{this.state.error}</p>}
                            </div>
                        </form>
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
    signIn: signIn,
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SignIn)
