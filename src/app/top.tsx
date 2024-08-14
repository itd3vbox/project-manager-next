'use client';

import React from "react"
import Link from 'next/link';
import {
    XMarkIcon,
    MagnifyingGlassIcon,
    BellIcon,
    Cog8ToothIcon,
    ArrowUpTrayIcon,
    Bars3BottomLeftIcon,

} from '@heroicons/react/24/outline';


interface TopProps
{
    onMenuOnSelect: () => void
}


interface TopState
{
    userStyles: React.CSSProperties;
    isUserVisible: boolean;
}

export default class Top extends React.Component<TopProps, TopState>
{
    btnUserRef: React.RefObject<HTMLButtonElement>
    userDivRef: React.RefObject<HTMLDivElement>

    constructor(props: TopProps)
    {
        super(props)
        this.state = {
            userStyles: {},
            isUserVisible: false
        }
        this.btnUserRef = React.createRef()
        this.userDivRef = React.createRef()
    }

    handleUserOnClick()
    {
        if (this.btnUserRef.current && this.userDivRef.current) 
        {
            const btnUserRect = this.btnUserRef.current.getBoundingClientRect()
            const userDiv = this.userDivRef.current
            const windowWidth = window.innerWidth
            const windowHeight = window.innerHeight


            this.setState({ isUserVisible: true }, () => {
                // setTimeout(() => {
                    
                    if (this.userDivRef.current) {
                        const userDiv = this.userDivRef.current
                        let userStyles: React.CSSProperties = {
                            top: `${btnUserRect.bottom + 10}px`,
                            left: `${btnUserRect.right - userDiv.offsetWidth - 10}px`
                        }

                        console.log(btnUserRect.right, userDiv.offsetWidth)

                        // if (btnUserRect.left + userDiv.offsetWidth > windowWidth) {
                        //     userStyles.left = `${windowWidth - userDiv.offsetWidth}px`
                        // }
                        // if (btnUserRect.bottom + userDiv.offsetHeight > windowHeight) {
                        //     userStyles.top = `${btnUserRect.top - userDiv.offsetHeight}px`
                        // }

                        this.setState({ userStyles })
                    }
                // }, 0)
            })
        }
    }

    handleUserClearOnClick()
    {
        this.setState({ isUserVisible: false })
    }

    handleMenuButtonOnSelect = () => {
        this.props.onMenuOnSelect()
    }
    

    render()
    {
        return (
            <div id="page-top">
                <div className="icon">
                    <MagnifyingGlassIcon />
                </div>
                <input type="text" placeholder="search ..."/>
                <Link href="/settings" className="btn-alert">
                    <BellIcon />
                    <div className="indicator"></div>
                </Link>
                <button type="button" className="btn-user"
                    ref={this.btnUserRef}
                    onClick={ () => this.handleUserOnClick() }>
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" className="avatar" />
                </button>
                <button type="button" id='page-menu-button'
                    onClick={() => this.handleMenuButtonOnSelect()}>
                    <Bars3BottomLeftIcon />
                </button>
                <div className="user"
                    style={{
                        display: this.state.isUserVisible ? 'block' : 'none'
                    }}
                    onClick={ () => this.handleUserClearOnClick() }>
                    <div className="wrapper"
                        ref={this.userDivRef}
                        style={{
                            ...this.state.userStyles,
                        }}>
                        <div className="username">#joedoe</div>
                        <div className="options">
                            <button type="button" className="btn-sign-out">
                                <ArrowUpTrayIcon />
                            </button>
                            <Link href="/settings" className="btn-settings">
                                <Cog8ToothIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}