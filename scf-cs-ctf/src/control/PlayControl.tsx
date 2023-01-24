/**
 * Digital Cipher Activity - Handles user input from the corresponding view and any business logic that may be required
 * @version 12.19.22
 * @author MrH-rezroll
 */

import React from "react";
import { Props } from "../App";
import Team from "../model/team";
import PlayView from "../view/PlayView";

let cipherPreviewInput = document.getElementById('EncodeDisplayPreview') as HTMLInputElement | null;
let cipherText = document.getElementById('CipherText') as HTMLInputElement | null;

export interface State{
    team1Name:string,
    team1Question:string,
    team1Answers:Array<string>,
    team1ImgUrl:string,
    team1TimeLimit:number,
    team1Finish:boolean,
    team1TotalPossible:number,
    team1TotalScore:number,
    team2Name:string,
    team2Question:string,
    team2Answers:Array<string>,
    team2ImgUrl:string,
    team2TimeLimit:number,
    team2Finish:boolean,
    team2TotalPossible:number,
    team2TotalScore:number
}

export default class PlayControl extends React.Component<Props>{

    state:State;
    team1CounterIntervalID: any = 0;
    team2CounterIntervalID: any = 0;

    constructor(props:Props){
        super(props);


        this.state = {
            team1Name: this.props.team1.name,
            team1Question: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].theQuestion,
            team1Answers: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers,
            team1ImgUrl: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
            team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit,
            team1Finish: false,
            team1TotalPossible: 0,
            team1TotalScore: 0,
            team2Name: this.props.team2.name,
            team2Question: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].theQuestion,
            team2Answers: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers,
            team2ImgUrl: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
            team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit,
            team2Finish: false,
            team2TotalPossible: 0,
            team2TotalScore: 0
        };
        
        this.answerButtonValue = this.answerButtonValue.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.updateGivenResponseTeam1 = this.updateGivenResponseTeam1.bind(this);
        this.updateGivenResponseTeam2 = this.updateGivenResponseTeam2.bind(this);
    }

    public resetGame():void{
        this.props.team1.resetTeam();
        this.props.team2.resetTeam();
        this.state = {
            team1Name: this.props.team1.name,
            team1Question: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].theQuestion,
            team1Answers: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers,
            team1ImgUrl: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
            team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit,
            team1Finish: false,
            team1TotalPossible: 0,
            team1TotalScore: 0,
            team2Name: this.props.team2.name,
            team2Question: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].theQuestion,
            team2Answers: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers,
            team2ImgUrl: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
            team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit,
            team2Finish: false,
            team2TotalPossible: 0,
            team2TotalScore: 0
        };
    }

    render(): React.ReactNode {
        return PlayView(this.props, this, this.state);
    }

    answerButtonValue(event: any, answerNumber:number, teamNumber:number, isAnswerText:boolean = false, isTimeoutAnswer:boolean = false) {
        if(event != undefined){
            event.preventDefault();
        }
        if(teamNumber == 1){
            if(this.props.team1.currentQuestionIndex < this.props.team1.questions.theQuestions.length){
                if(!isTimeoutAnswer){
                    if(isAnswerText){
                        this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].scoreAnswer();
                        console.log(this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex]);
                    }
                    else{
                        this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].scoreAnswer(answerNumber);
                    }
                }
                else {
                    this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].pointsScored = 0;
                }

                if(this.props.team1.currentQuestionIndex < this.props.team1.questions.theQuestions.length - 1){
                    this.props.team1.currentQuestionIndex++;
                    this.setState({
                        team1Question: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].theQuestion,
                        team1Answers: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers,
                        team1ImgUrl: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
                        team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit,
                    });
                }
                else if(!this.state.team1Finish) {
                    this.props.team1.questions.setTotalScoreRecieved();
                    this.setState({
                        team1TotalScore: this.props.team1.questions.totalScoreRecieved,
                        team1TotalScorePossible: this.props.team1.questions.totalScorePossible,
                        team1Finish: true
                    });
                }
            }
        }
        else if(teamNumber == 2){
            if(this.props.team2.currentQuestionIndex < this.props.team2.questions.theQuestions.length){
                if(!isTimeoutAnswer){
                    if(isAnswerText){
                        this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].scoreAnswer();
                    }
                    else{
                        this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].scoreAnswer(answerNumber);
                    }
                }
                else {
                    this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].pointsScored = 0;
                }

                if(this.props.team2.currentQuestionIndex < this.props.team2.questions.theQuestions.length - 1){
                    this.props.team2.currentQuestionIndex++;
                    this.setState({
                        team2Question: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].theQuestion,
                        team2Answers: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers,
                        team2ImgUrl: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
                        team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit,
                    });
                }
                else if (!this.state.team2Finish){
                    this.props.team2.questions.setTotalScoreRecieved();
                    this.setState({
                        team2TotalScore: this.props.team2.questions.totalScoreRecieved,
                        team2TotalScorePossible: this.props.team2.questions.totalScorePossible,
                        team2Finish: true
                    });
                }
            }
        }
    }

    componentDidMount(){
        this.team1CounterIntervalID = setInterval(():any => {this.team1TimerCountDown(this.props, this.state)}, 1000);
        this.team2CounterIntervalID = setInterval(():any => {this.team2TimerCountDown(this.props, this.state)}, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.team1CounterIntervalID);
        clearInterval(this.team2CounterIntervalID);
    }

    private team1TimerCountDown(props:Props, state:State){
        if(!this.state.team1Finish){
            if(this.props.team1.currentQuestionIndex < this.props.team1.questions.theQuestions.length && this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit > 0){
                this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit --;
                this.setState({
                    team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit
                });
            }
            else if(this.props.team1.currentQuestionIndex < this.props.team1.questions.theQuestions.length && this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit <= 0){
                if(this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers.length > 0){
                    this.answerButtonValue(undefined, 10, 1, false, true);
                }
                else{
                    this.answerButtonValue(undefined, 10, 1, true, true);
                }
            }
        }
    }

    private team2TimerCountDown(props:Props, state:State){
        if(!this.state.team2Finish){
            if(this.props.team2.currentQuestionIndex < this.props.team2.questions.theQuestions.length && this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit > 0){
                this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit --;
                this.setState({
                    team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit
                });
            }
            else if(this.props.team2.currentQuestionIndex < this.props.team2.questions.theQuestions.length && this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit <= 0){
                if(this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers.length > 0){
                    this.answerButtonValue(undefined, 10, 2, false, true);
                }
                else{
                    this.answerButtonValue(undefined, 10, 2, true, true);
                }
            }
        }
    }
    
    public updateGivenResponseTeam1(event: { target: {name: any, value: any; }; }) {
        this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].responseGiven = event.target.value;
    }
    
    public updateGivenResponseTeam2(event: { target: {name: any, value: any; }; }) {
        this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].responseGiven = event.target.value;
    }
}