import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import QuestionButtonResponse from './model/questionButtonResponse';
import QuestionTextResponse from './model/questionTextResponse';
import Questions from './model/questions';

test('Creates a Question with Button Response', () => {
  var theQuestion:QuestionButtonResponse = new QuestionButtonResponse("What is 2 + 2?", "3", "4", "1", "2", 0, 1, 0, 0);
  expect(theQuestion.getPointsForAnswer(0)).toBe(0);
  expect(theQuestion.getPointsForAnswer(1)).toBe(1);
  expect(theQuestion.getPointsForAnswer(2)).toBe(0);
  expect(theQuestion.getPointsForAnswer(3)).toBe(0);
});

test('Creates a Question with Text Response and answer IS NOT case sensitive', () => {
  var theQuestion:QuestionTextResponse = new QuestionTextResponse("What is the password?", "Pass", 30, 2, false);
  theQuestion.givenResponse = "pass";
  theQuestion.scoreAnswer();
  expect(theQuestion.pointsScored).toBe(2);
});

test('Creates a Question with Text Response and answer IS case sensitive', () => {
  var theQuestion:QuestionTextResponse = new QuestionTextResponse("What is the password?", "Pass");
  theQuestion.givenResponse = "Pass";
  theQuestion.scoreAnswer();
  expect(theQuestion.pointsScored).toBe(2);
});

/** This test is based upon JSON data that will be changed with normal use. It's likely safe to comment this test out is it fails */
test('Creates a collection of Questions with a total score possible of 6', () => {
  var theQuestions:Questions = new Questions();
  expect(theQuestions.totalScorePossible).toBe(8);
});
