'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import AvatarUploader from "@/components/avatar-uploader/AvatarUploader";


interface SettingsProps
{
    
}


interface SettingsState
{
    
}

export default class Settings extends React.Component<any, SettingsState>
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
            <div id="settings">
                
                <form className="s-form">

                    <div className="block-avatar">
                        <label htmlFor="s-avatar">Avatar</label>
                        <AvatarUploader />
                        <p className="error">Avatar should not be empty.</p>
                    </div>

                    <div className="block-username">
                        <label htmlFor="s-username">Username</label>
                        <input type="username" id="s-username" 
                            placeholder="Ex.:johndoe"/>
                        <p className="error">Username should not be empty.</p>
                    </div>
                        
                    <div className="block-email">
                        <label htmlFor="s-email">Email address</label>
                        <input type="email" id="s-email" 
                           placeholder="Ex.: contact@projectmanager.org"/>
                        <p className="error">Email should not be empty.</p>
                    </div>

                    <div className="block-password">
                        <label htmlFor="s-password">Password</label>
                        <input type="password" id="s-password" 
                            placeholder="Ex.: &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"/>
                        <label htmlFor="s-password-confirmation">Password - Confirmation</label>
                        <input type="password" id="s-password-confirmation" 
                            placeholder="Ex.: &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"/>
                        <p className="error">Password should not be empty.</p>
                    </div>

                </form>

            </div>
        )
    }
}