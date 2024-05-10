'use client';

import React from "react"
import Link from 'next/link';
import {
    XMarkIcon,
    MagnifyingGlassIcon,
    BellIcon,
} from '@heroicons/react/24/outline';


interface TopProps
{
    
}


interface TopState
{
    
}

export default class Top extends React.Component<any, TopState>
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
            <div id="page-top">
                <div className="icon">
                    <MagnifyingGlassIcon />
                </div>
                <input type="text" placeholder="search ..."/>
                <button type="button" className="btn-alert">
                    <BellIcon />
                    <div className="indicator"></div>
                </button>
                <button type="button" className="btn-user">
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" className="avatar" />
                </button>
            </div>
        )
    }
}