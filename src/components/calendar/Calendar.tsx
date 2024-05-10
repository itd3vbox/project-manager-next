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
    
}

export default class Calendar extends React.Component<any, CalendarState>
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
            <div className="calendar" onClick={ this.props.onDateClick }>
                <div className="block-top">
                    <div className="date">
                        <div className="month">Dec</div>
                        <div className="year">2022</div>
                    </div>
                    <div className="options">
                        <button className="btn">
                            <ArrowLeftIcon />
                        </button>
                        <button className="btn">
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
                        {/* Week 1 */}
                        <div className="date">
                            <button className="btn">1</button>
                        </div>
                        <div className="date">
                            <button className="btn">2</button>
                        </div>
                        <div className="date">
                            <button className="btn">3</button>
                        </div>
                        <div className="date">
                            <button className="btn">4</button>
                        </div>
                        <div className="date">
                            <button className="btn">5</button>
                        </div>
                        <div className="date">
                            <button className="btn">6</button>
                        </div>
                        <div className="date">
                            <button className="btn">7</button>
                        </div>
                        {/* Week 2 */}
                        <div className="date">
                            <button className="btn">8</button>
                        </div>
                        <div className="date">
                            <button className="btn">9</button>
                        </div>
                        <div className="date">
                            <button className="btn">10</button>
                        </div>
                        <div className="date">
                            <button className="btn">11</button>
                        </div>
                        <div className="date">
                            <button className="btn">12</button>
                        </div>
                        <div className="date">
                            <button className="btn">13</button>
                        </div>
                        <div className="date">
                            <button className="btn">14</button>
                        </div>
                        {/* Week 3 */}
                        <div className="date">
                            <button className="btn">15</button>
                        </div>
                        <div className="date">
                            <button className="btn">16</button>
                        </div>
                        <div className="date">
                            <button className="btn">17</button>
                        </div>
                        <div className="date">
                            <button className="btn">18</button>
                        </div>
                        <div className="date">
                            <button className="btn">19</button>
                        </div>
                        <div className="date">
                            <button className="btn">20</button>
                        </div>
                        <div className="date">
                            <button className="btn">21</button>
                        </div>
                        {/* Week 4 */}
                        <div className="date events">
                            <button className="btn">22</button>
                        </div>
                        <div className="date">
                            <button className="btn">23</button>
                        </div>
                        <div className="date">
                            <button className="btn">24</button>
                        </div>
                        <div className="date">
                            <button className="btn">25</button>
                        </div>
                        <div className="date">
                            <button className="btn">26</button>
                        </div>
                        <div className="date">
                            <button className="btn">27</button>
                        </div>
                        <div className="date">
                            <button className="btn">28</button>
                        </div>
                        {/* Week 4 */}
                        <div className="date">
                            <button className="btn">29</button>
                        </div>
                        <div className="date">
                            <button className="btn">30</button>
                        </div>
                        <div className="date">
                            <button className="btn">31</button>
                        </div>
                        <div className="date month-next">
                            <button className="btn">1</button>
                        </div>
                        <div className="date month-next">
                            <button className="btn">2</button>
                        </div>
                        <div className="date month-next">
                            <button className="btn">3</button>
                        </div>
                        <div className="date month-next">
                            <button className="btn">4</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}