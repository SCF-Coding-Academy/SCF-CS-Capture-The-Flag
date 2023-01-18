import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import QuestionButtonResponse from './model/questionButtonResponse';
import QuestionTextResponse from './model/questionTextResponse';
import Questions from './model/questions';
import Team from './model/team';

test('Creates a Question with Button Response', () => {
  var theQuestion:QuestionButtonResponse = new QuestionButtonResponse("What is 2 + 2?", "3", "1", "4", "2", 0, 0, 1, 0);
  theQuestion.scoreAnswer(0);
  expect(theQuestion.pointsScored).toBe(0);
  theQuestion.scoreAnswer(1);
  expect(theQuestion.pointsScored).toBe(0);
  theQuestion.scoreAnswer(2);
  expect(theQuestion.pointsScored).toBe(1);
});

test('Creates a Question with Text Response and answer IS NOT case sensitive', () => {
  var theQuestion:QuestionTextResponse = new QuestionTextResponse("What is the password?", "Pass", 30, 2, false);
  theQuestion.responseGiven = "pass";
  theQuestion.scoreAnswer();
  expect(theQuestion.pointsScored).toBe(2);
});

test('Creates a Question with Text Response and answer IS case sensitive', () => {
  var theQuestion:QuestionTextResponse = new QuestionTextResponse("What is the password?", "Pass");
  theQuestion.responseGiven = "Pass";
  theQuestion.scoreAnswer();
  expect(theQuestion.pointsScored).toBe(2);
});

/** This test is based upon JSON data that will be changed with normal use. It's likely safe to comment this test out is it fails */
test('Creates a collection of Questions with a total score possible of 6', () => {
  var theQuestions:Questions = new Questions();
  expect(theQuestions.totalScorePossible).toBe(8);
});

test('Creates a Team that answers Questions to score points', () => {
  var theTeam:Team = new Team("Team A");
  expect(theTeam.questions.totalScoreRecieved).toBe(0);
  theTeam.questions.theQuestions[2].responseGiven = "Pass";
  theTeam.questions.theQuestions[2].scoreAnswer();
  theTeam.questions.setTotalScoreRecieved();
  expect(theTeam.questions.totalScoreRecieved).toBe(2);
});
