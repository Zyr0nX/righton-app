import React, {useEffect, useState} from 'react'
import StartGame from '../pages/StartGame'
import { loadGameSession, removeTeam } from '../../lib/hostAPI'
import { ApiClient, Environment, GameSessionState } from '@righton/networking'
import { IGameSession } from '@righton/networking'

const StartGameContainer = () => {
  const [gameSession, setGameSession] = useState<IGameSession | null>()
  const [updatedGameSession, setUpdatedGameSession] = useState<IGameSession | null>()
  
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

  let apiClient = new ApiClient(Environment.Staging)

  useEffect(() => {
    
    const subscription = apiClient.subscribeUpdateGameSession(gameSession => {
      console.log(gameSession.currentState)
    })
  
    // @ts-ignore
    return () => subscription.unsubscribe()
}, []);


  if(!gameSession) {
    return null
  }
  return (
    <StartGame {...gameSession} />
  )
}

export default StartGameContainer