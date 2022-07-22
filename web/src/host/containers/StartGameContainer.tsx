import React, {useEffect, useState} from 'react'
import StartGame from '../pages/StartGame'
import { ApiClient, Environment } from '@righton/networking'
import { IGameSession } from '@righton/networking'

const StartGameContainer = ({gameId} : {gameId: any} ) => {
  const [gameSession, setGameSession] = useState<IGameSession | null>()
  const [updatedGameSession, setUpdatedGameSession] = useState<IGameSession | null>()
 
  console.log("response:", gameSession)
  let apiClient = new ApiClient(Environment.Staging)
  console.log(apiClient)

  useEffect(() => {
    apiClient.getGameSession(gameId).then((response) => {
      setGameSession(response)
    })
    
    
//     apiClient.updateGameSession("926", GameSessionState.CHOOSING_TRICK_ANSWER).then((response) => {
//       setGameSession(response)
//       console.log("res:", response)
//     })

//     const subscription = apiClient.subscribeUpdateGameSession(gameSession => {
//       console.log(gameSession.currentState)
//     })
  
//     // @ts-ignore
//     return () => subscription.unsubscribe()
   }, []);

    // const handleRemoveTeam = (player: { id: number }) => {
  //   removeTeam(player.id, gameSession).then((response) => {
  //     setGameSession(response);      
  //   })
  // }

  // useEffect(() => {
  //   loadGameSession(gameSessionId).then((response) => {
  //     setGameSession(response)
  //   })
  // }, [])

  if(!gameSession) {
    return null
  }
  return (
    <StartGame {...gameSession} />
  )
}

export default StartGameContainer


