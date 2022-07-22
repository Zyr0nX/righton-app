import { GameSessionState, Team, Question } from "./AWSMobileApi"

export interface IGameSession {
    id: String
    gameId: number
    startTime?: string | null
    phaseOneTime: number
    phaseTwoTime: number
    teams: [Team | null] 
    currentQuestionId?: number | null
    currentState: GameSessionState
    gameCode: number
    questions: [Question]
    updatedAt: string
    createdAt: string
}