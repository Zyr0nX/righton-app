import mockGameSession from'../mocks/gamesession.json'

export const loadGameSession = async (gameSessionId: string) => {
  const gameSession = await Promise.resolve(mockGameSession)
    return gameSession
}

export const removeTeam = async (teamId: number) => {
    const gameSession = await Promise.resolve(mockGameSession)
    const updatedGameSession = gameSession.teams.items.filter(team => team.id !== teamId)
    return updatedGameSession
  }

console.log(removeTeam(1))
  
 