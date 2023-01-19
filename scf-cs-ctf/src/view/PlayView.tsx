/**
 * Digital Cipher Activity - The acivity view with only essential options for using ciphers
 * @version 12.19.22
 * @author MrH-rezroll
 */

import React from "react";
import { Link } from "react-router-dom";
import { Props } from "../App";
import PlayControl, { State } from "../control/PlayControl";

export default function (props:Props, playControl:PlayControl, state:State) {

  return (
      <div id="PlayView">
        <div id="TeamAView">
            <h2>{props.team1.name}</h2>
            <div className="question-box">
                <h3>{state.team1Question}</h3>
            </div>
            <span className="timelimit-burn-down-box">{state.team1TimeLimit} sec.</span>
            <div className="answer-box">
                {state.team1Answers.length == 4 && (
                    <>
                    <button onClick={(event) => playControl.answerButtonValue(event, 0, 1)} defaultValue={0}>W: {state.team1Answers[0]}</button>
                    <button onClick={(event) => playControl.answerButtonValue(event, 1, 1)} defaultValue={1}>A: {state.team1Answers[1]}</button>
                    <button onClick={(event) => playControl.answerButtonValue(event, 2, 1)} defaultValue={2}>S: {state.team1Answers[2]}</button>
                    <button onClick={(event) => playControl.answerButtonValue(event, 3, 1)} defaultValue={3}>D: {state.team1Answers[3]}</button>
                    </>
                )}
                {state.team1Answers.length < 4 && (
                    <>
                    <form>
                        <input type="text" id="Team1TextResponse"></input>
                        <button onClick={(event) => playControl.answerButtonValue(event, 0, 1, true)}>Submit</button>
                    </form>
                    </>
                )}
            </div>
        </div>
        <div id="TeamBView">
            <h2>{props.team2.name}</h2>
            <div className="question-box">
                <h3>{state.team2Question}</h3>
            </div>
            <span className="timelimit-burn-down-box">{state.team2TimeLimit} sec.</span>
            <div className="answer-box">
                {state.team2Answers.length == 4 && (
                    <>
                    <button onClick={(event) => playControl.answerButtonValue(event, 0, 2)} defaultValue={0}>up: {state.team2Answers[0]}</button>
                    <button onClick={(event) => playControl.answerButtonValue(event, 1, 2)} defaultValue={1}>left: {state.team2Answers[1]}</button>
                    <button onClick={(event) => playControl.answerButtonValue(event, 2, 2)} defaultValue={2}>down: {state.team2Answers[2]}</button>
                    <button onClick={(event) => playControl.answerButtonValue(event, 3, 2)} defaultValue={3}>right: {state.team2Answers[3]}</button>
                    </>
                )}
                {state.team2Answers.length < 4 && (
                    <>
                    <form>
                        <input type="text" id="Team1TextResponse"></input>
                        <button onClick={(event) => playControl.answerButtonValue(event, 0, 2, true)}>Submit</button>
                    </form>
                    </>
                )}
            </div>
        </div>
      </div>
    );
}
