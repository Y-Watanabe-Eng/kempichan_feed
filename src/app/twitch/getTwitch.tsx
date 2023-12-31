'use server'

export default async function getTwitch() {

  const clientId = process.env.TWITCH_CLIENT_ID
  const secretId = process.env.TWITCH_AUSORIZATION
  const username = 'kempichan'
  const userId = ''
  const id = ''

//検索用URL
  const URL = 'https://api.twitch.tv/helix/videos?' +
              'user_id=' + userId
              'id'

//リクエストヘッダ
  const headers =
    'Client-ID: ' + clientId
    'Authorization: Bearer ' + secretId
  

//チャンネル情報の取得
  async function getChannel() {

{/*
    const channelRes = await fetch(

    )


    const channelData = await channelRes.json()

    return channelData;
*/}

  }

  const channelData = await getChannel()

}

const twitchData = getTwitch()

console.log(twitchData)