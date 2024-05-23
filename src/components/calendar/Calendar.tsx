'use client';

import React from "react"
import {
    XMarkIcon,
    CreditCardIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';


interface CalendarProps
{
    
}


interface CalendarState
{
    days: Array<{ day: number, className: string }>
    year: number
    month: number
}

export default class Calendar extends React.Component<any, CalendarState>
{

    constructor(props: any)
    {
        super(props)
        const now = new Date()
        this.state = {
            days: [],
            year: now.getFullYear(),
            month: now.getMonth(),
        }
    }

    componentDidMount() 
    {
        this.computeMonthDays()
    }

    handleMonthOnPrev()
    {
        this.setState((prevState) => {
            const newMonth = prevState.month - 1
            const newYear = newMonth < 0 ? prevState.year - 1 : prevState.year
            return {
                month: (newMonth + 12) % 12,
                year: newYear,
            }
        }, this.computeMonthDays)
    }

    handleMonthOnNext()
    {
        this.setState((prevState) => {
            const newMonth = prevState.month + 1
            const newYear = newMonth > 11 ? prevState.year + 1 : prevState.year
            return {
                month: newMonth % 12,
                year: newYear,
            };
        }, this.computeMonthDays)
    }

    computeMonthDays()
    {
        const { year, month } = this.state;

        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay()

        const days = []

        // Fill in days from the previous month
        if (firstDayOfMonth !== 0) 
        {
            const lastDateOfPrevMonth = new Date(year, month, 0).getDate()
            for (let i = firstDayOfMonth - 1; i >= 0; i--) 
            {
                days.push({
                    day: lastDateOfPrevMonth - i,
                    className: 'date month-prev'
                })
            }
        }

        // Fill in days of the current month
        for (let i = 1; i <= lastDateOfMonth; i++) 
        {
            days.push({
                day: i,
                className: 'date'
            })
        }

        // Fill in days from the next month
        if (lastDayOfMonth !== 6) 
        {
            for (let i = 1; i <= 6 - lastDayOfMonth; i++) 
            {
                days.push({
                    day: i,
                    className: 'date month-next'
                })
            }
        }

        this.setState({
            ...this.state,
            days,
        })
    }

    renderDays()
    {
        return this.state.days.map((dayInfo, index) => (
            <div key={ index } className={ dayInfo.className }>
                <button className="btn">{ dayInfo.day }</button>
            </div>
        ))
    }

    render()
    {
        const { year, month } = this.state
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        return (
            <div className="calendar" onClick={ this.props.onDateClick }>
                <div className="block-top">
                    <div className="date">
                        <div className="month">{ monthNames[month] }</div>
                        <div className="year">{ this.state.year }</div>
                    </div>
                    <div className="options">
                        <button className="btn"
                            onClick={ () =>this.handleMonthOnPrev() }>
                            <ArrowLeftIcon />
                        </button>
                        <button className="btn"
                            onClick={ () =>this.handleMonthOnNext() }>
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
                <div className="block-main">
                    <div className="days">
                        <div className="day">SUN</div>
                        <div className="day">MON</div>
                        <div className="day">TUE</div>
                        <div className="day">WED</div>
                        <div className="day">THU</div>
                        <div className="day">FRI</div>
                        <div className="day">SAT</div>
                    </div>
                    <div className="dates">
                        { this.renderDays() }
                    </div>
                </div>
            </div>
        )
    }
}