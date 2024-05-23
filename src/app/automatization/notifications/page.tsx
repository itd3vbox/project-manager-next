import Link from 'next/link';
import {
    PlayIcon,
} from '@heroicons/react/24/outline';

import './sass/main.sass';
import Notifications from './Notifications';

export default function Page() 
{
    return (
        <>
            <Notifications />       
        </>
    );
}