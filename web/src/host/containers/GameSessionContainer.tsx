import React, {useEffect, useState} from 'react'
import {
 BrowserRouter as Router, Route, useParams, useRouteMatch, Redirect
} from "react-router-dom";
import StartGame from '../pages/StartGame'
import { ApiClient, Environment, GameSessionState, IGameSession } from '@righton/networking'
import GameInProgress from '../pages/GameInProgress'
import Ranking from '../pages/Ranking';


const GameSessionContainer = () => {  
  const [gameSession, setGameSession] = useState<IGameSession | null>()


  let apiClient = new ApiClient(Environment.Staging)
  
  // paste this game session id into the url path 833503b7-0c6c-41f4-95b1-70549e6d6590

   let { gameSessionId } = useParams<{gameSessionId: string}>()
   let { path } = useRouteMatch();


  useEffect(() => {
    apiClient.loadGameSession(gameSessionId).then(response => {
      setGameSession(response)
      console.log(response)
    })

    const subscription = apiClient.subscribeUpdateGameSession(response => {
      console.log(response)
    })
  
    // @ts-ignore
    return () => subscription.unsubscribe()
  }, [])
  
  if(!gameSession) {
    return null
  }

  switch (gameSession.currentState) {
    
    case GameSessionState.TEAMS_JOINING:
      return (
      <Route path={`${path}/join`}>
        <StartGame {...gameSession} gameSessionId={gameSessionId} />
      </Route>
      )
      
    case GameSessionState.CHOOSE_CORRECT_ANSWER: 
    case GameSessionState.CHOOSE_TRICKIEST_ANSWER: 
    case GameSessionState.PHASE_1_RESULTS: 
    case GameSessionState.PHASE_2_RESULTS:
      return(
      <Route path={`${path}/play`}>
        <GameInProgress {...gameSession} />
      </Route>
      )
      
    case GameSessionState.FINAL_RESULTS:
      return(
      <Route path={`${path}/results`}>
        <Ranking {...gameSession}/>
      </Route>
      )

      default: 
      return(
      <Redirect to="/" />
      )
  }
}

export default GameSessionContainer


