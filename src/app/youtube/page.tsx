"use client"

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import getYoutube from './api'

interface items {
  id: string
  title: string
  snippet: {
    publishedAt: date
    thumbnail: {
      url: string
    }
  }
}


export default function Youtube() {

  const [youtubeData, setYoutubeData] = useState<items[]>([])

  useEffect(() =>{

    const fetchData = async() => {
  
      try {
        const videoData: items[] = await getYoutube()
        setYoutubeData(videoData.items)
        console.log(videoData)
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
        <div>
          <ul>
          {youtubeData.map((video) => (


           const videoTitle = video.items.title
           const videoId = video.items.id
           const videoUploadDate = video.items.snippet.publishedAt
           const thumbnailUrl = video.items.snippet.thumbnail.url

            
            return(
            <div key={videoId} className='grid sm:grid-cols-2 my-8 mx-4 py-4 px-4 border-solid border-2 rounded'>
              <div className='my-4 mx-4'>
                <li>
                  <p className='text-sm text-blue-400'>{videoUploadDate}</p>
                  <a className='text-xl' href={`https://m.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                    {videoTitle}
                  </a>
                 </li>
               </div>
               <div className='flex items-center justify-center'>
                 <a className='flex items-center justify-center' href={`https://m.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                   <img className='my-4 w-4/5 h-4/5' src={thumbnailUrl} alt="サムネイル" />
                 </a>
               </div>
            </div>
          )})}
        </ul>
      </div>
    </main>
  </body>

  )
}
