import { IGameSession } from './Models/IGameSession'
import { IApiClient } from './IApiClient'
import {
    GameSessionState,
    OnUpdateGameSessionSubscription,
    UpdateGameSessionInput,
    UpdateGameSessionMutation,
    UpdateGameSessionMutationVariables
} from './AWSMobileApi'
import { updateGameSession } from './graphql/mutations'
import { Amplify, API, graphqlOperation } from "aws-amplify"
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { onUpdateGameSession, getGameSession, gameSessionByCode } from './graphql'
import awsconfig from "./aws-exports"
import { ITeam } from './Models/ITeam'
import { IQuestion } from './Models/IQuestion'

Amplify.configure(awsconfig)

export enum Environment {
    Staging = "staging"
}

enum HTTPMethod {
    Post = "POST"
}

interface GraphQLOptions {
    input?: object
    variables?: object
    authMode?: GRAPHQL_AUTH_MODE
}

interface SubscriptionValue<T> {
    value: {
        data: T,
        errors: Array<any> | null
    }
}

export class ApiClient implements IApiClient {
    private endpoint: string

    constructor(env: Environment) {
        this.endpoint = `https://1y2kkd6x3e.execute-api.us-east-1.amazonaws.com/${env}/createGameSession`
    }

    createGameSession(
        gameId: number,
        isAdvancedMode: Boolean): Promise<IGameSession> {

        return fetch(
            this.endpoint, {
            'method': HTTPMethod.Post,
            headers: {
                'content-type': 'application/json',
                'connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                gameId: gameId,
                isAdvancedMode: isAdvancedMode,
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        }).then(response => {
            return GameSessionParser.gameSessionFromAWSGameSession(response)
        })
    }

    async getGameSession(id: string): Promise<IGameSession> {
        let result = await API.graphql(graphqlOperation(getGameSession, { id })) as { data: any }
        return GameSessionParser.gameSessionFromAWSGameSession(result.data.getGameSession)
    }

    async updateGameSession(awsGameSessionInput: AWSUpdateGameSessionInput): Promise<IGameSession> {
        let updateGameSessionInput: UpdateGameSessionInput = awsGameSessionInput
        let variables: UpdateGameSessionMutationVariables = { input: updateGameSessionInput }
        let result = await this.callGraphQL<UpdateGameSessionMutation>(updateGameSession, variables)
        if (result.errors != null) {
            throw new Error(`failed to update game session: ${result.errors}`)
        }

        if (result.data == null) {
            throw new Error("Failed to update the game session")
        }

        return this.mapUpdateGameSessionMutation(result.data)
    }

    // TODO: Remove this method and instead use `updateGameSession`
    async updateGameSessionFooter(id: string, gameState: GameSessionState, nextQuestion: number, phaseOneTimeReset: number, phaseTwoTimeReset: number): Promise<IGameSession> {
        let updateGameSessionInput: UpdateGameSessionInput = { id, currentState: gameState, currentQuestionId: nextQuestion, phaseOneTime: phaseOneTimeReset, phaseTwoTime: phaseTwoTimeReset }
        let variables: UpdateGameSessionMutationVariables = { input: updateGameSessionInput }
        let result = await this.callGraphQL<UpdateGameSessionMutation>(updateGameSession, variables)
        if (result.errors != null) {
            throw new Error(`failed to update game session: ${result.errors}`)
        }

        if (result.data == null) {
            throw new Error("Failed to update the game session")
        }

        return GameSessionParser.gameSessionFromMutation(result.data)
    }


    subscribeUpdateGameSession(id: string, callback: (result: IGameSession) => void) {
        return this.subscribeGraphQL<OnUpdateGameSessionSubscription>(
            {
                query: onUpdateGameSession,
                variables: {
                    filter: {
                        id: {
                            eq: id
                        }
                    }
                }
            }
            , (value: OnUpdateGameSessionSubscription) => {
                let gameSession = this.mapOnUpdateGameSessionSubscription(value)
                callback(gameSession)
            })
    }

    async getGameSessionByCode(gameCode: number): Promise<IGameSession | null> {
        let result = await API.graphql(graphqlOperation(gameSessionByCode, { gameCode })) as { data: any }
        if (isNullOrUndefined(result.data) ||
            isNullOrUndefined(result.data.gameSessionByCode) ||
            isNullOrUndefined(result.data.gameSessionByCode.items) ||
            result.data.gameSessionByCode.items.length == 0) {
            return null
        }
        if (result.data.gameSessionByCode.items.length > 1) {
            throw new Error(`Multiple game sessions exist for ${gameCode}`)
        }
        return GameSessionParser.gameSessionFromAWSGameSession(result.data.gameSessionByCode.items[0])
    }

    private subscribeGraphQL<T>(subscription: any, callback: (value: T) => void) {
        //@ts-ignore
        return API.graphql(subscription).subscribe({
            next: (response: SubscriptionValue<T>) => {
                if (!isNullOrUndefined(response.value.errors)) {
                    console.error(response.value.errors)
                }
                callback(response.value.data)
            },
            error: (error: any) => console.warn(error)
        })
    }

    private async callGraphQL<T>(query: any, options?: GraphQLOptions): Promise<GraphQLResult<T>> {
        return (await API.graphql(graphqlOperation(query, options))) as GraphQLResult<T>
    }

    private mapUpdateGameSessionMutation(updateGameSession: UpdateGameSessionMutation): IGameSession {
        return GameSessionParser.gameSessionFromMutation(updateGameSession)
    }

    private mapOnUpdateGameSessionSubscription(subscription: OnUpdateGameSessionSubscription): IGameSession {
        return GameSessionParser.gameSessionFromSubscription(subscription)
    }
}

export type AWSUpdateGameSessionInput = UpdateGameSessionInput

type AWSGameSession = {
    id: string
    gameId: number
    startTime?: string | null
    phaseOneTime: number
    phaseTwoTime: number
    teams?: {
        items: Array<AWSTeam | null>
    } | null
    currentQuestionId?: number | null
    currentState: GameSessionState
    gameCode: number
    isAdvanced: boolean
    imageUrl?: string | null
    description?: string | null
    title?: string | null
    currentTimer?: number | null
    questions?: {
        items: Array<AWSQuestion | null>
    } | null
    createdAt: string
    updatedAt: string
}

type AWSTeam = {
    id: string,
    name: string,
    trickiestAnswerIDs?: Array<string | null> | null,
    score: number,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    teamQuestionId: string,
    teamQuestionGameSessionId: string,
}

type AWSQuestion = {
    id: number,
    text: string,
    answer?: string | null,
    wrongAnswers?: string | null,
    imageUrl?: string | null,
    instructions?: string | null,
    standard?: string | null,
    cluster?: string | null,
    domain?: string | null,
    grade?: string | null,
    gameSessionId: string,
}

class GameSessionParser {

    static gameSessionFromSubscription(subscription: OnUpdateGameSessionSubscription): IGameSession {
        const updateGameSession = subscription.onUpdateGameSession
        if (isNullOrUndefined(updateGameSession)) {
            throw new Error("subscription.onUpdateGameSession can't be null.")
        }
        return this.gameSessionFromAWSGameSession(updateGameSession)
    }

    static gameSessionFromMutation(mutation: UpdateGameSessionMutation) {
        const updateGameSession = mutation.updateGameSession
        if (isNullOrUndefined(updateGameSession)) {
            throw new Error("mutation.updateGameSession can't be null.")
        }
        return this.gameSessionFromAWSGameSession(updateGameSession)
    }

    static gameSessionFromAWSGameSession(awsGameSession: AWSGameSession): IGameSession {
        const {
            id,
            gameId,
            startTime,
            phaseOneTime,
            phaseTwoTime,
            teams,
            currentQuestionId,
            currentState,
            gameCode,
            questions,
            currentTimer,
            updatedAt,
            createdAt,
            title

        } = awsGameSession || {}

        if (
            isNullOrUndefined(id) ||
            isNullOrUndefined(currentState) ||
            isNullOrUndefined(gameCode) ||
            isNullOrUndefined(gameId) ||
            isNullOrUndefined(phaseOneTime) ||
            isNullOrUndefined(phaseTwoTime) ||
            isNullOrUndefined(questions) ||
            isNullOrUndefined(questions.items) ||
            isNullOrUndefined(updatedAt) ||
            isNullOrUndefined(createdAt)
        ) {
            throw new Error("GameSession has null field for the attributes that are not nullable")
        }

        const gameSession: IGameSession = {
            id,
            gameId,
            startTime,
            phaseOneTime,
            phaseTwoTime,
            teams: GameSessionParser.mapTeams(teams),
            currentQuestionId,
            currentState,
            gameCode,
            currentTimer,
            questions: GameSessionParser.mapQuestions(questions.items),
            updatedAt,
            createdAt,
            title
        }
        return gameSession
    }

    private static mapTeams(awsTeams: { items: (AWSTeam | null)[] } | null | undefined): Array<ITeam> {
        if (isNullOrUndefined(awsTeams) || isNullOrUndefined(awsTeams.items)) {
            return []
        }

        return awsTeams.items.map(awsTeam => {
            if (isNullOrUndefined(awsTeam)) {
                throw new Error("Team can't be null in the backend.")
            }

            return awsTeam as ITeam
        })
    }

    private static mapQuestions(awsQuestions: Array<AWSQuestion | null>): Map<number, IQuestion> {
        return new Map(
            awsQuestions.map(awsQuestion => {
                if (isNullOrUndefined(awsQuestion)) {
                    throw new Error("Question can't be null")
                }
                return [awsQuestion.id, awsQuestion as IQuestion]
            })
        )
    }
}

function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
    return value === null || value === undefined
}