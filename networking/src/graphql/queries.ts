/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGameSession = /* GraphQL */ `
  query GetGameSession($id: ID!, $updatedAt: AWSDateTime!) {
    getGameSession(id: $id, updatedAt: $updatedAt) {
      id
      game {
        id
        title
        description
        imageUrl
        isAdvanced
        grade
        questions {
          nextToken
        }
      }
      startTime
      phaseOneTime
      phaseTwoTime
      teams {
        items {
          id
          name
          trickiestAnswerIDs
          score
          createdAt
          updatedAt
          gameSessionTeamsId
          teamQuestionId
        }
        nextToken
      }
      currentQuestion
      currentState
      gameCode
      updatedAt
      createdAt
      gameSessionGameId
    }
  }
`;
export const listGameSessions = /* GraphQL */ `
  query ListGameSessions(
    $id: ID
    $updatedAt: ModelStringKeyConditionInput
    $filter: ModelGameSessionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGameSessions(
      id: $id
      updatedAt: $updatedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        game {
          id
          title
          description
          imageUrl
          isAdvanced
          grade
        }
        startTime
        phaseOneTime
        phaseTwoTime
        teams {
          nextToken
        }
        currentQuestion
        currentState
        gameCode
        updatedAt
        createdAt
        gameSessionGameId
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      title
      description
      imageUrl
      isAdvanced
      grade
      questions {
        items {
          id
          question
          answer
          trickAnswers
          imageUrl
          instructions
          grade
          gameQuestionsId
        }
        nextToken
      }
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        imageUrl
        isAdvanced
        grade
        questions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      question
      answer
      trickAnswers
      imageUrl
      instructions
      grade
      gameQuestionsId
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        answer
        trickAnswers
        imageUrl
        instructions
        grade
        gameQuestionsId
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      question {
        id
        question
        answer
        trickAnswers
        imageUrl
        instructions
        grade
        gameQuestionsId
      }
      trickiestAnswerIDs
      teamMembers {
        items {
          id
          isFacilitator
          deviceId
          createdAt
          updatedAt
          teamTeamMembersId
        }
        nextToken
      }
      score
      createdAt
      updatedAt
      gameSessionTeamsId
      teamQuestionId
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        question {
          id
          question
          answer
          trickAnswers
          imageUrl
          instructions
          grade
          gameQuestionsId
        }
        trickiestAnswerIDs
        teamMembers {
          nextToken
        }
        score
        createdAt
        updatedAt
        gameSessionTeamsId
        teamQuestionId
      }
      nextToken
    }
  }
`;
export const getTeamMember = /* GraphQL */ `
  query GetTeamMember($id: ID!) {
    getTeamMember(id: $id) {
      id
      team {
        id
        name
        question {
          id
          question
          answer
          trickAnswers
          imageUrl
          instructions
          grade
          gameQuestionsId
        }
        trickiestAnswerIDs
        teamMembers {
          nextToken
        }
        score
        createdAt
        updatedAt
        gameSessionTeamsId
        teamQuestionId
      }
      isFacilitator
      memberAnswers {
        items {
          id
          isChosen
          text
          createdAt
          updatedAt
          teamMemberMemberAnswersId
        }
        nextToken
      }
      deviceId
      createdAt
      updatedAt
      teamTeamMembersId
    }
  }
`;
export const listTeamMembers = /* GraphQL */ `
  query ListTeamMembers(
    $filter: ModelTeamMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        team {
          id
          name
          trickiestAnswerIDs
          score
          createdAt
          updatedAt
          gameSessionTeamsId
          teamQuestionId
        }
        isFacilitator
        memberAnswers {
          nextToken
        }
        deviceId
        createdAt
        updatedAt
        teamTeamMembersId
      }
      nextToken
    }
  }
`;
export const getTeamAnswer = /* GraphQL */ `
  query GetTeamAnswer($id: ID!) {
    getTeamAnswer(id: $id) {
      id
      isChosen
      text
      createdAt
      updatedAt
      teamMemberMemberAnswersId
    }
  }
`;
export const listTeamAnswers = /* GraphQL */ `
  query ListTeamAnswers(
    $filter: ModelTeamAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isChosen
        text
        createdAt
        updatedAt
        teamMemberMemberAnswersId
      }
      nextToken
    }
  }
`;
export const gameSessionByState = /* GraphQL */ `
  query GameSessionByState(
    $currentState: GameSessionState!
    $sortDirection: ModelSortDirection
    $filter: ModelGameSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameSessionByState(
      currentState: $currentState
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        game {
          id
          title
          description
          imageUrl
          isAdvanced
          grade
        }
        startTime
        phaseOneTime
        phaseTwoTime
        teams {
          nextToken
        }
        currentQuestion
        currentState
        gameCode
        updatedAt
        createdAt
        gameSessionGameId
      }
      nextToken
    }
  }
`;
