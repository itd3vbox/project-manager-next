'use client';

import React from "react"
import {
    XMarkIcon,
    CheckCircleIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';


interface TaskProps
{
    order: number
}


interface TaskState
{
    isSelected: boolean
}

export default class Task extends React.Component<TaskProps, TaskState>
{

    constructor(props: TaskProps)
    {
        super(props)
        this.state = {
            isSelected: false,
        }
    }

    handleOnSelect()
    {
        this.setState({
            ...this.state,
            isSelected: !this.state.isSelected,
        })
    }


    render()
    {
        return (
            <div className={"task" + (this.state.isSelected ? ' selected' : '')}>
                <div className="t-top">
                    <div className="number">{ this.props.order }</div>
                    <div className="title">Debug Project 1</div>
                    <div className="options">
                        <button type="button" className="btn-status">
                            <CheckCircleIcon />                       
                        </button>
                        <button type="button" onClick={ () => this.handleOnSelect() }>
                            <ArrowDownIcon />                       
                        </button>
                    </div>
                </div>
                <div className="t-main">
                    <div className="block-project">
                        <div className="block-left">
                            <img src="https://cdn.dribbble.com/users/1392449/screenshots/17662830/media/0469c6e6dc9f96a2ac4266499f9723ee.png?compress=1&resize=1600x1200&vertical=top" className="card-img-top" alt="..."/>
                        </div>
                        <div className="block-right">
                            <h4>Project 1</h4>
                            <p className="description-short">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel maxime assumenda iste quibusdam iure sapiente. Eos ullam provident sint dolorum voluptatem a beatae rerum repellendus!
                            </p>
                        </div>
                    </div>
                    <div className="block-task">
                        <div className="status">
                            <div className="info"></div>
                            <div className="label">Status</div>
                            <div className="shape-value-options">
                                <div className="shape-value">
                                    <div className="shape"></div>
                                    <div className="value">Done</div>
                                </div>
                                <div className="options">
                                    <button type="button">RESET</button>
                                    <button type="button">START</button>
                                    <button type="button">DONE</button>
                                </div>
                            </div>
                        </div>
                        <h6>Description - Short</h6>
                        <p className="description-short">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloribus a sequi magnam ex repellat illo beatae minus, eveniet commodi.
                        </p>
                        <h6>Description</h6>
                        <p className="description-short">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloribus a sequi magnam ex repellat illo beatae minus, eveniet commodi.
                        </p>
                        <button type="button" className="btn-delete">DELETE</button>
                    </div>
                </div>
            </div>
        )
    }
}