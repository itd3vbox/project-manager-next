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
    canBeforeNow?: boolean
    onDate?: (data: any) => void
}


interface CalendarState
{
    dates: Array<{ date: number, className: string }>
    year: number
    month: number
}

export default class Calendar extends React.Component<CalendarProps, CalendarState>
{
    constructor(props: CalendarProps)
    {
        super(props)
        const now = new Date()
        this.state = {
            dates: [],
            year: now.getFullYear(),
            month: now.getMonth(),
            
        }
    }

    componentDidMount() 
    {
        this.computeMonthDays()
    }

    computeMonthDays()
    {
        const { year, month } = this.state;

        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay()

        const dates = []

        // Fill in dates from the previous month
        if (firstDayOfMonth !== 0) 
        {
            const lastDateOfPrevMonth = new Date(year, month, 0).getDate()
            for (let i = firstDayOfMonth - 1; i >= 0; i--) 
            {
                dates.push({
                    date: lastDateOfPrevMonth - i,
                    className: 'date month-prev'
                })
            }
        }

        // Fill in dates of the current month
        for (let i = 1; i <= lastDateOfMonth; i++) 
        {
            dates.push({
                date: i,
                className: 'date'
            })
        }

        // Fill in dates from the next month
        if (lastDayOfMonth !== 6) 
        {
            for (let i = 1; i <= 6 - lastDayOfMonth; i++) 
            {
                dates.push({
                    date: i,
                    className: 'date month-next'
                })
            }
        }

        this.setState({
            ...this.state,
            dates,
        })
    }

    handleMonthOnPrev()
    {
        if (!this.props.canBeforeNow)
        {
            const now = new Date()
            if (this.state.year === now.getFullYear() && this.state.month <= now.getMonth())
                return
        }

        this.setState((prevState) => {
            const newMonth = prevState.month - 1
            const newYear = newMonth < 0 ? prevState.year - 1 : prevState.year
            return {
                month: (newMonth + 12) % 12,
                year: newYear,
            }
        }, () => this.computeMonthDays())
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
        }, () => this.computeMonthDays())
    }

    handleOnDate(date: number)
    {
        const { year, month } = this.state;
        const data: any = {
            date: date,
            month: month + 1,
            year: year,
            toText: `${year}-${month + 1}-${date}`,
        }

        if (this.props.onDate)
            this.props.onDate(data)
    }

    // --- RENDER ---

    renderDates()
    {
        return this.state.dates.map((dateInfo, index) => (
            <div key={ index } className={ dateInfo.className }>
                <button type="button" className="btn"
                    onClick={ () => this.handleOnDate(dateInfo.date) }>{ dateInfo.date }</button>
            </div>
        ))
    }

    render()
    {
        const { year, month } = this.state
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        return (
            <div className="calendar">
                <div className="block-top">
                    <div className="date">
                        <div className="month">{ monthNames[month] }</div>
                        <div className="year">{ this.state.year }</div>
                    </div>
                    <div className="options">
                        <button type="button" className="btn"
                            onClick={ () =>this.handleMonthOnPrev() }>
                            <ArrowLeftIcon />
                        </button>
                        <button type="button" className="btn"
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
                        { this.renderDates() }
                    </div>
                </div>
            </div>
        )
    }
}