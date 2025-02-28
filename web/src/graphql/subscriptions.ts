/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

//onUpdateGameSession

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      title
      description
      cluster
      domain
      grade
      standard
      phaseOneTime
      phaseTwoTime
      imageUrl
      questions {
        id
        text
        answer
        imageUrl
        instructions
        updatedAt
        createdAt
        cluster
        domain
        grade
        standard
        wrongAnswers
      }
      updatedAt
      createdAt
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
      id
      text
      answer
      imageUrl
      instructions
      updatedAt
      createdAt
      cluster
      domain
      grade
      standard
      wrongAnswers
    }
  }
`;
export const subscribeToGameStatusUpdates = /* GraphQL */ `
  subscription SubscribeToGameStatusUpdates($gameID: Int!) {
    subscribeToGameStatusUpdates(gameID: $gameID) {
      gameID
      screenID
      title
      text
      ... on QuestionScreen {
        answers
      }
      ... on ScorecardScreen {
        scores {
          teamName
          teamScore
        }
      }
    }
  }
`;
