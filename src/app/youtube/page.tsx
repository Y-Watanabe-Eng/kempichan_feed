"use client"

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import getYoutube from './api'

interface Props {

}


export default function Youtube() {

  const [youtubeData, setYoutubeData] = useState([])

  useEffect(() =>{

    const fetchData = async() => {
  
      try {
        const data = await getYoutube()
        setYoutubeData(videoData.items)
        console.log(data)
      } catch (error) {
        console.error("Error Youtube Data:", error)
      }

    }

    fetchData()

  }, [])
  

  return (
    <body>

      <header>
        <div className='h-28 bg-red-600 flex items-center justify-center'>
          <div className='w-9/12'>
            <h1 className='text-4xl text-white pt-4'>けんぴ。ちゃんテナ</h1>
            <p className='pt-2 pl-2'>from Youtube</p>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className='grid sm:grid-cols-2 my-8 mx-4 py-4 px-4 border-solid border-gray-400 border-2 rounded'>
          <div className='my-4 mx-4'>

          </div>
          <div className='flex items-center justify-center'>

          </div>
        </div>
      </main>

    </body>

  )
}
