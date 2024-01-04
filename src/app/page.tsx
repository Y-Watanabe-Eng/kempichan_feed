"use client"

import './globals.css'
import { useEffect, useState } from 'react'
import getYoutube from './youtube/getYoutube'
import Image from 'next/image'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'


interface items {
  id: string
  snippet: {
    title: string
    publishedAt: string
    description: string
    thumbnails: {
      high: {
        url: string
      }
    }
  }
  statistics: {
    viewCount: string
    likeCount: string
    commentCount: string 
  }
}


export default function Youtube() {

  const [videoData, setVideoData] = useState<items[]>([])

  useEffect(() =>{
    (async() => {
      try{
        const fetchData = await getYoutube()
        setVideoData(fetchData)
        console.log(fetchData)
      } catch (error) {
        console.error("Error Fetching Data:", error)
      }
    })()
  }, [])

  console.log("client:" + new Date())


  return (
    <>

      <header>
        <div className='h-28 bg-red-600 flex items-center justify-center'>
          <div className='sm:w-8/12 w-10/12'>
            <h1 className='sm:text-4xl text-3xl text-white'>けんぴ。ちゃんテナ</h1>
            <p className='pt-2 pl-2 text-gray-800'>from Youtube</p>
          </div>
        </div>
      </header>


      <Stack spacing={2}>

      <main className="flex min-h-screen flex-col items-center justify-center py-10">
        
        <div className='sm:w-8/12 w-10/12'>
          <h2 className='text-lg'>@けんぴ。ちゃんねる</h2>
        </div>

        <div className='flex flex-col items-center justify-center'>
          {videoData.map((video) => (

            <div key={video.id} className='grid sm:grid-cols-2 sm:w-8/12 w-10/12 my-8 p-4 border-solid border-gray-600 border-2 rounded'>

              <div className='flex items-center justify-center'>
                <a 
                href={`https://m.youtube.com/watch?v=${video.id}`} 
                target="_blank" 
                rel="noopener noreferrer">
                  <Image
                  src={video.snippet.thumbnails.high.url} 
                  alt="サムネイル"
                  width={360}
                  height={270}
                  />
                </a>
              </div>

              <div className='my-4 mx-4'>
                <p className='text-sm text-blue-400'>{video.snippet.publishedAt.replace(/[T]|[Z]/g,' ')}</p>
                <a className='sm:text-lg text-gray-600' 
                href={`https://m.youtube.com/watch?v=${video.id}`} 
                target="_blank" rel="noopener noreferrer">
                  {video.snippet.title}
                </a>
              </div>

            </div>

          ))}
        </div>

      <Pagination count={10} variant="outlined" color="secondary" />

      </main>

      </Stack>
          
    </>
  )
}
