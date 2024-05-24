'use client';

import React from "react"
import {
    XMarkIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';


interface PaginationProps
{
    
}


interface PaginationState
{
    
}

export default class Pagination extends React.Component<any, PaginationState>
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
            <div className="pagination">
                <button type="button">
                    <ArrowLeftIcon />
                </button>
                <button type="button">
                    <ArrowRightIcon />
                </button>
            </div>
        )
    }
}