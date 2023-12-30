"use client"

import { useEffect, useState } from 'react'
import getYoutube from './getYoutube'
import Image from 'next/image'

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
    
    <body>

      <header>
        <div className='h-28 bg-red-600 flex items-center justify-center'>
          <div className='w-9/12'>
            <h1 className='text-4xl text-white pt-4'>けんぴ。ちゃんテナ</h1>
            <p className='pt-2 pl-2 text-gray-800'>from Youtube</p>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center py-10 px-20">
        
        <div className='sm:w-5/6 px-4'>
          <h2 className='text-lg'>@けんぴ。ちゃんねる</h2>
        </div>

        {videoData.map((video) => (
          <div key={video.id} className='flex items-center justify-center sm:w-5/6'>
            <div className='grid sm:grid-cols-2 my-8 mx-4 p-4 border-solid border-gray-600 border-2 rounded'>

              <div className='flex items-center justify-center'>
                <a className='flex items-center justify-center' 
                href={`https://m.youtube.com/watch?v=${video.id}`} 
                target="_blank" 
                rel="noopener noreferrer">
                  <Image src={video.snippet.thumbnails.high.url} 
                  alt="サムネイル"
                  width={360}
                  height={270} />
                </a>
              </div>

              <div className='my-4 mx-4'>
                <p className='text-sm text-blue-400'>{video.snippet.publishedAt.replace(/[T]|[Z]/g,' ')}</p>
                <a className='sm:text-lg text-gray-800' 
                href={`https://m.youtube.com/watch?v=${video.id}`} 
                target="_blank" rel="noopener noreferrer">
                  {video.snippet.title}
                </a>
              </div>

            </div>
            <br/>

          </div>
        ))}

      </main>
          
    </body>

  )
}
