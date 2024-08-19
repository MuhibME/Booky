import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import MoblieNav from './MoblieNav';

import {FaYoutube, FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import { Button } from './ui/button';
import Dropdown from './Dropdown';
import Nav from './Nav';
const socials =[
    {icon: <FaYoutube/>, href: '#'},
    {icon: <FaFacebook/>, href: '#'},
    {icon: <FaInstagram/>, href: '#'},
    {icon: <FaTwitter/>, href: '#'},
];  

const Header = async () => {
    const {isAuthenticated, getUser} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated(); 
    
    const user = await getUser();
  
    return (
    <header className='py-6 shadow-md'>
        <div className="container mx-auto">
            <div className='flex flex-col md:flex-row md: justify-between gap-6'>
            {/* logo and socials */}
            <div className='flex items-center gap-5 justify-center xl:w-max'>
                {/* logo */}
                <Link href='/'>
                    <Image alt='' src={'/assets/logo.svg'} height={160} width={160}/>
                </Link>
                {/* seperator */}
                <div className='w-[1px] h-[40px] bg-gray-300'></div>
                {/* socials */}
                <div className='flex gap-2'
                >{socials.map((item,index)=>{
                    return (
                        <Link href={item.href} key={index} className='text-white hover:bg-accent-hover bg-accent text-sm w-[28px] h-[28px] rounded-full flex items-center justify-center transition-all'>{item.icon}</Link>
                    )
                })}</div>
            </div>
            {/* sign in and sign up buttons */}
            <div className='flex items-center justify-center gap-8 xl:w-max'>
                <div className='flex items-center gap-2 xl:order-2'>
                {isUserAuthenticated? <div><Dropdown user={user}/></div>: 
                <div className='flex gap-2'>
                <LoginLink><Button variant='primary'>Sign in</Button></LoginLink>
                <RegisterLink><Button>Register</Button></RegisterLink>
                </div>}
                </div>
            {/* mobile nav */}
            <div className='xl:hidden'><MoblieNav/></div>
            {/* desktop nav */}
            <div className='xl:flex hidden'><Nav isUserAuthenticated={isUserAuthenticated}/></div>
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header