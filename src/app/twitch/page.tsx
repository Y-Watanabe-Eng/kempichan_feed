"use client"

import '../globals.css'
import { useEffect, useState } from 'react'
import getYoutube from './getTwitch'
import Image from 'next/image'


interface Props {

}

export default function Twitch () {

  return (
    <>

      <header>
        <div className='h-28 bg-blue-500 flex items-center justify-center'>
          <div className='w-9/12'>
            <h1 className='text-4xl text-white pt-4'>けんぴ。ちゃんテナ</h1>
            <p className='pt-2 pl-2'>from Twitch</p>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">



      </main>
      
    </>
  )
}
