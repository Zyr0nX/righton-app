/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: Int!) {
    getGame(id: $id) {
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
export const listGames = /* GraphQL */ `
  query ListGames {
    listGames {
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
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: Int!) {
    getQuestion(id: $id) {
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions {
    listQuestions {
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
