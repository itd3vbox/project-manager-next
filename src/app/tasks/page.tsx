import Link from 'next/link';
import {
    PlayIcon,
} from '@heroicons/react/24/outline';

import './sass/main.sass';
import Tasks from './Tasks';

export default function Page() 
{
    return (
        <>
            <Tasks />
        </>
    );
}