"use server"

export default async function getYoutube() {

  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = "UCUBvFfyuBrATTPxnAZ4OsCQ"

//チャンネル情報の取得
  async function getChannel() {

    const channelRes = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=" +
        "contentDetails" +
        "&id=" +
        channelId + 
        "&key=" +
        apiKey
      )
      
    const channelData = await channelRes.json()

    return channelData;

  }

  const channelData = await getChannel()

  const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads


//プレイリスト情報の取得
  async function getPlaylist() {

    const playlistRes = await fetch(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=" +
        "contentDetails" +
        "&playlistId=" +
        uploadsId +
        "&maxResults=50" +
        "&key=" +
        apiKey
      )
      
    const playlistData = await playlistRes.json()

    return playlistData;

  }

  const playlistData = await getPlaylist()

  const videoIdArray: string[] = []

  for (let i = 0; i < playlistData.items.length; i++) {
    videoIdArray.push(playlistData.items[i].contentDetails.videoId)
  }
  
  console.log(videoIdArray)

{/*
//プレイリスト情報の次ページを取得
  let pageToken = playlistData.nextPageToken

  async function getPlaylistNext() {

    while (pageToken !== undefined) {

      const nextPlaylistRes = await fetch(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=" +
          "contentDetails" +
          "&playlistId=" +
          uploadsId +
          "&maxResults=50" +
          "&pageToken=" +
          pageToken +
          "&key=" +
          apiKey
      )

      const nextPlaylistData = await nextPlaylistRes.json()

      for (let j = 0; j < nextPlaylistData.items.length; j++) {
        videoIdArray.push(nextPlaylistData.items[j].contentDetails.videoId)
      }

      if (nextPlaylistData.nextPageToken !== undefined) {
        pageToken = nextPlaylistData.nextPageToken
      } else {
        pageToken = undefined
      }

    }

    return videoIdArray

  }

  await getPlaylistNext()

  console.log(videoIdArray)
*/}

//動画データの取得
  async function getVideo() {

    const videoRes = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=" +
        "snippet" +
        "&id=" +
        videoIdArray +
        "&key=" +
        apiKey
      )
      
    const videoData = await videoRes.json()

    return videoData;

  }

  await getVideo()

  const videoData = await getVideo()

  return videoData.items

}