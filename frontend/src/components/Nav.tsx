'use client'
import React from 'react'
import {redirect, usePathname} from 'next/navigation'
import Link from 'next/link'


const links = [
    {name:'Home',path:'/'},
    {name:'Resturant',path:'/'},
    {name:'Pool',path:'/'},
    {name:'Best Deals',path:'/'},
    {name:'Contact',path:'/'},
]

const Nav = ({isUserAuthenticated}:{isUserAuthenticated:boolean}) => {
    const pathname = usePathname();

    return (
    <nav>
        {/* redirection to home if not logged in */}
        {!isUserAuthenticated && pathname === '/dashboard' && redirect('/')}
        <ul className='flex flex-row gap-6 '>
            {links.map((link,index)=>{return(
                <ul key={index}>
                    <li key={index}>
                        <Link className='font-bold text-[13px] uppercase tracking-[3px] hover:text-accent-hover transition-all' href={link.path} key={index}>{link.name}</Link>
                    </li>
                </ul>
            )})}
        </ul>
    </nav>
  )
}

export default Nav;