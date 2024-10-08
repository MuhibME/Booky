import React from 'react'
import { Button } from '@/components/ui/button'
import {format} from 'date-fns'
import Link from 'next/link'

const getUserReservations = async (userEmail: any)=>{
  const res= await fetch(`http://127.0.0.1:1337/api/reservations?[filters][email][$eq]=${userEmail}&populate=*`,{
    next:{
      revalidate:0,
    },
  });
 
  return await res.json();
}

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import CancelReservation from '@/components/CancelReservation'



const Dashboard = async () => {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  
  const userReservations = await getUserReservations(user?.email);
  
  return (
    <section className='min-h-[80vh]'>
    <div className="container mx-auto py-8 h-full">
      <h3 className='h3 font-bold mb-12 border-b pb-4 text-center lg:text-left'>My Bookings</h3>
      <div className='flex flex-col gap-8 h-full'>
      {userReservations.data.length < 1 ? (
        <div className='flex flex-col items-center justify-center h-[50vh]'>
          <p className='text-xl text-center text-secondary/70 mb-4'>
            You don't have any bookings
          </p>
          {/* back to home */}
          <Link href={'/'}>
            <Button size={'md'}>Go to Home</Button>
          </Link>
          </div>
      ) : (
        <div>
          {userReservations.data.map((reservation: any) => (
            <div key={reservation.id} className='bg-tertiary py-8 px-12 '>
              <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
                <h3 className='text-4xl font-medium  text-center lg:text-left'> 
                  {reservation.attributes.room.data.attributes.title}
                </h3>
                {/* check-in and check-out */}
                <div className='flex flex-col lg:flex-row gap-4 lg:w-auto'>
                  <div className='flex items-center gap-1 flex-1'>
                    <span className='text-accent font-bold uppercase tracking-[2px]'>from: </span>
                    <span className='text-secondary font-semibold '>{format(reservation.attributes.checkIn,'PPP')}</span>
                  </div>
                  <div className='flex lg:flex-row items-center gap-1 flex-1'>
                    <span className='text-accent font-bold uppercase tracking-[2px]'>to: </span>
                    <span className='text-secondary font-semibold'>{format(reservation.attributes.checkOut,'PPP')}</span>
                  </div>
                </div>
                <CancelReservation reservation={reservation}/>
              </div>
            </div>
          )
          )}
        </div>
      )}
    </div>
    </div>
  </section>
)
}

export default Dashboard