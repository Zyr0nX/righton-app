import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import { ApiClient, Environment, GameSessionState } from '@righton/networking'
import { IGameSession } from '@righton/networking'

function App() {
  const [gameSession, setGameSession] = useState<IGameSession | null>()
  const [updatedGameSession, setUpdatedGameSession] = useState<IGameSession | null>()
  const [error, setError] = useState<string | null>(null)
  
  let apiClient = new ApiClient(Environment.Staging)

  useEffect(() => {
    
    const subscription = apiClient.subscribeUpdateGameSession(gameSession => {
      console.log(gameSession.currentState)
    })
  
    // @ts-ignore
    return () => subscription.unsubscribe()
}, []);

  return (
    <div>
      <span>
        {
          (gameSession == null ? "" : gameSession.id) +
          (error == null ? "" : error)
        }
      </span>
      <span>
        {
          (updatedGameSession != null) ?
            `Updated game session state to ${updatedGameSession?.currentState} for ${updatedGameSession?.id}` :
            ""
        }
      </span>
      <Button
        variant="contained"
        onClick={() => {
          apiClient.createGameSession(926, false)
            .then(gameSession => {
              setGameSession(gameSession)
              setError(null)
              setUpdatedGameSession(null)
            }).catch(error => {
              console.error(error.message)
              setGameSession(null)
              setError(error.message)
              setUpdatedGameSession(null)
            })
        }}
      >
        Create game session
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          // if (gameSession == null) {
          //   return
          // }
          // let gameSessionId = gameSession!.id

          let gameSessionId = "a32a65bb-dd1f-4d06-a5ad-76d4f9db7074"
          apiClient.updateGameSession(gameSessionId, GameSessionState.INITIAL_INTRO)
            .then(gameSession => {
              setUpdatedGameSession(gameSession)
              setError(null)
          }).catch(error => {
              console.error(error.message)
              setError(error.message)
              setUpdatedGameSession(null)
            })
        }}
      >
        Update game session
      </Button>
    </div>
  );
}

export default App;
