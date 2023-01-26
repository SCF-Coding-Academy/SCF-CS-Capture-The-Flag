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
    <div>
      <div id="PlayView">
        <div id="TeamAView">
            <h2>{state.team1Name}</h2>
            <div className="question-box">
                {!state.team1Finish && 
                <>
                    <h3>{state.team1Question}</h3>
                </>
                }{state.team1Finish && 
                    <>
                        <h3>Finished!</h3>
                    </>
                }
            </div>
            <div className="answer-box">
                {!state.team1Finish && 
                    <>
                    {state.team1SupportImage != "" &&
                        <>
                        <img src={state.team1SupportImage} alt="Support image for current question" />
                        </>
                    }
                    <span className="timelimit-burn-down-box"><span id="Team1InnerTimeBar"><span>{state.team1TimeLimit} sec.</span></span></span>
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
                            <input onChange={playControl.updateGivenResponseTeam1} type="text" id="Team1TextResponse"></input>
                            <button onClick={(event) => playControl.answerButtonValue(event, 0, 1, true)}>Next</button>
                        </form>
                        </>
                    )}
                    </>
                }
                {state.team1Finish &&
                    <>
                        <h4>Results</h4>
                        <p>Final Score: {state.team1TotalScore} out of {state.team1TotalPossible} </p>
                    </>
                }
            </div>
        </div>
        <div id="TeamBView">
            <h2>{state.team2Name}</h2>
            <div className="question-box">
                {!state.team2Finish && 
                <>
                    <h3>{state.team2Question}</h3>
                </>
                }{state.team2Finish && 
                    <>
                        <h3>Finished!</h3>
                    </>
                }
            </div>
            <div className="answer-box">
                {!state.team2Finish && 
                <>
                {state.team2SupportImage != "" &&
                    <>
                    <img src={state.team2SupportImage} alt="Support image for current question" />
                    </>
                }
                <span className="timelimit-burn-down-box"><span id="Team2InnerTimeBar"><span>{state.team2TimeLimit} sec.</span></span></span>
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
                        <input onChange={playControl.updateGivenResponseTeam2} type="text" id="Team1TextResponse"></input>
                        <button onClick={(event) => playControl.answerButtonValue(event, 0, 2, true)}>Next</button>
                    </form>
                    </>
                )}
                </>
            }
            {state.team2Finish &&
                <>
                    <h4>Results</h4>
                    <p>Final Score: {state.team2TotalScore} out of {state.team2TotalPossible} </p>
                </>
            }
            </div>
        </div>
      </div>
        {state.team1Finish && state.team2Finish &&
            <>
            <div id="FinishPanel">
                
                <Link onClick={playControl.resetGame} to="/">Finish!</Link>
            </div>
            </>
        }
    </div>
    );
}
