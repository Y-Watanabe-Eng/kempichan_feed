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

  console.log(playlistData)

  const videoIdArray: string[] = []

  for (let i = 0; i < 50; i++) {
    videoIdArray.push(playlistData.items[i].contentDetails.videoId)
  }
  


//プレイリスト情報の次ページを取得
  const pageToken = playlistData.nextPageToken

  while (pageToken === undefined) {

    async function getPlaylistNext() {

      const playlistRes = await fetch(
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

      const playlistData = await playlistRes.json()

      return playlistData;

    }

    const playlistData = await getPlaylistNext()

    for (let i = 0; i < 50; i++) {
      videoIdArray.push(playlistData.items[i].contentDetails.videoId)
    }

    return videoIdArray

  }


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

  const videoData = await getVideo()

  return videoData

}