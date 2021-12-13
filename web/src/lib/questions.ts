import { API, graphqlOperation } from 'aws-amplify';
import { updateQuestion as UQ, createQuestion as CQ, createGameQuestion as CGQ } from '../graphql/mutations';

export const createQuestion = async(question: any, gameId: any) => {
  const createdQuestion = await API.graphql(graphqlOperation(CQ, { question })) as { data: any };
  const questionId = createdQuestion?.data?.createQuestion?.id;
  const result = await API.graphql(graphqlOperation(CGQ, {gameQuestion: { gameId, questionId }})) as { data: any };
  return result.data.createGameQuestion;
}

export const updateQuestion = async (question: any) => {
  delete question.updatedAt;
  delete question.createdAt;
  const result = await API.graphql(graphqlOperation(UQ, { question })) as { data: any };
  return result?.data?.updateQuestion || [];
};