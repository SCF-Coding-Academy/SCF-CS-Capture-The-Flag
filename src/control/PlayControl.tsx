/**
 * Digital Cipher Activity - Handles user input from the corresponding view and any business logic that may be required
 * @version 12.19.22
 * @author MrH-rezroll
 */

import React from "react";
import { Props } from "../App";
import Team from "../model/team";
import PlayView from "../view/PlayView";
import AudioControl from "./AudioControl";

let cipherPreviewInput = document.getElementById('EncodeDisplayPreview') as HTMLInputElement | null;
let cipherText = document.getElementById('CipherText') as HTMLInputElement | null;

export interface State{
    team1Name:string,
    team1Question:string,
    team1Answers:Array<string>,
    team1SupportImage:string,
    team1TimeLimit:number,
    team1Finish:boolean,
    team1TotalPossible:number,
    team1TotalScore:number,
    team2Name:string,
    team2Question:string,
    team2Answers:Array<string>,
    team2SupportImage:string,
    team2TimeLimit:number,
    team2Finish:boolean,
    team2TotalPossible:number,
    team2TotalScore:number
}

export default class PlayControl extends React.Component<Props>{

    state:State;
    team1CounterIntervalID: any = 0;
    team2CounterIntervalID: any = 0;
    team1CounterBar:number = 0;
    team2CounterBar:number = 0;
    canCheckForTeam1ButtonAnswer:boolean = true;
    canCheckForTeam2ButtonAnswer:boolean = true;
    canCheckForTeam1ButtonAnswerIntervalID: any = 0;
    canCheckForTeam2ButtonAnswerIntervalID: any = 0;
    audio1:HTMLAudioElement;
    audio2:HTMLAudioElement;
    audioFinish:HTMLAudioElement;
    audioWin:HTMLAudioElement;
    audioControl:AudioControl;

    constructor(props:Props){
        super(props);
        this.audio1 = new Audio(props.menuSelectSound2.src);
        this.audio1.preload = 'auto';
        this.audio2 = new Audio(props.menuSelectSound3.src);
        this.audio2.preload = 'auto';
        this.audioFinish = new Audio(props.finishClickSound.src);
        this.audioFinish.preload = 'auto';
        this.audioWin = new Audio(props.winSound.src);
        this.audioWin.preload = 'auto';
        this.audioControl = new AudioControl();

        this.state = {
            team1Name: this.props.team1.name,
            team1Question: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].theQuestion,
            team1Answers: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers,
            team1SupportImage: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
            team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit,
            team1Finish: false,
            team1TotalPossible: 0,
            team1TotalScore: 0,
            team2Name: this.props.team2.name,
            team2Question: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].theQuestion,
            team2Answers: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers,
            team2SupportImage: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
            team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit,
            team2Finish: false,
            team2TotalPossible: 0,
            team2TotalScore: 0
        };
        this.team1CounterBar = this.state.team1TimeLimit;
        this.team2CounterBar = this.state.team2TimeLimit;
        
        this.answerButtonValue = this.answerButtonValue.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.checkForTeam1ButtonInput = this.checkForTeam1ButtonInput.bind(this);
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
            team1SupportImage: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
            team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit,
            team1Finish: false,
            team1TotalPossible: 0,
            team1TotalScore: 0,
            team2Name: this.props.team2.name,
            team2Question: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].theQuestion,
            team2Answers: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers,
            team2SupportImage: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
            team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit,
            team2Finish: false,
            team2TotalPossible: 0,
            team2TotalScore: 0
        };
        this.team1CounterBar = this.state.team1TimeLimit;
        this.team2CounterBar = this.state.team2TimeLimit;
        this.audioControl.playAudioClip(this.audioFinish);
    }

    render(): React.ReactNode {
        return PlayView(this.props, this, this.state);
    }

    answerButtonValue(event: any, answerNumber:number, teamNumber:number, isAnswerText:boolean = false, isTimeoutAnswer:boolean = false) {
        if(event != undefined){
            event.preventDefault();
        }
        if(teamNumber == 1){
            this.audioControl.playAudioClip(this.audio1, 0.5);
            if(this.props.team1.currentQuestionIndex < this.props.team1.questions.theQuestions.length){
                if(!isTimeoutAnswer){
                    if(isAnswerText){
                        this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].scoreAnswer();
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
                        team1SupportImage: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
                    });
                    this.team1CounterBar = this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit;
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
            this.audioControl.playAudioClip(this.audio2, 0.5);
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
                        team2SupportImage: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
                    });
                    this.team2CounterBar = this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit
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
        /* allows button presses for input, not currently used
        this.canCheckForTeam1ButtonAnswerIntervalID = setInterval(():any => {this.checkForTeam1ButtonInput(this.props, this.state)}, 50);
        this.canCheckForTeam2ButtonAnswerIntervalID = setInterval(():any => {this.checkForTeam2ButtonInput(this.props, this.state)}, 50);
        */
    }
    
    componentWillUnmount() {
        clearInterval(this.team1CounterIntervalID);
        clearInterval(this.team2CounterIntervalID);
        /* allows button presses for input, not currently used
        clearInterval(this.canCheckForTeam1ButtonAnswerIntervalID);
        clearInterval(this.canCheckForTeam2ButtonAnswerIntervalID);
        */
    }

    private checkForTeam1ButtonInput(props:Props, state:State):void{
        if(this.canCheckForTeam1ButtonAnswer){
            if(this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers.length > 0){
                if(this.props.keys.w){
                    this.answerButtonValue(undefined, 0, 1);
                    this.canCheckForTeam1ButtonAnswer = false;
                }
                else if(this.props.keys.a){
                    this.answerButtonValue(undefined, 1, 1);
                    this.canCheckForTeam1ButtonAnswer = false;
                }
                else if(this.props.keys.s){
                    this.answerButtonValue(undefined, 2, 1);
                    this.canCheckForTeam1ButtonAnswer = false;
                }
                else if(this.props.keys.d){
                    this.answerButtonValue(undefined, 3, 1);
                    this.canCheckForTeam1ButtonAnswer = false;
                }
            }
        }
        else if (!this.props.keys.w && !this.props.keys.a && !this.props.keys.s && !this.props.keys.d){
            this.canCheckForTeam1ButtonAnswer = true;
        }
    }

    private checkForTeam2ButtonInput(props:Props, state:State):void{
        if(this.canCheckForTeam2ButtonAnswer){
            if(this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers.length > 0){
                if(this.props.keys.up){
                    this.answerButtonValue(undefined, 0, 2);
                    this.canCheckForTeam2ButtonAnswer = false;
                }
                else if(this.props.keys.left){
                    this.answerButtonValue(undefined, 1, 2);
                    this.canCheckForTeam2ButtonAnswer = false;
                }
                else if(this.props.keys.down){
                    this.answerButtonValue(undefined, 2, 2);
                    this.canCheckForTeam2ButtonAnswer = false;
                }
                else if(this.props.keys.right){
                    this.answerButtonValue(undefined, 3, 2);
                    this.canCheckForTeam2ButtonAnswer = false;
                }
            }
        }
        else if (!this.props.keys.up && !this.props.keys.left && !this.props.keys.down && !this.props.keys.right){
            this.canCheckForTeam2ButtonAnswer = true;
        }
    }

    private team1TimerCountDown(props:Props, state:State){
        if(!this.state.team1Finish){
            if(this.props.team1.currentQuestionIndex < this.props.team1.questions.theQuestions.length && this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit > 0){
                this.updateProgressBar(1, this.state.team1TimeLimit);
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
                
                this.updateProgressBar(2, this.state.team2TimeLimit);
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

    private updateProgressBar(teamNumber:number, currentTeamTime:number):void{
        let elem:HTMLElement = document.getElementById("Team1InnerTimeBar") as HTMLElement;
        let width = (100 / this.team1CounterBar) * currentTeamTime;
        if(teamNumber == 2){
            elem = document.getElementById("Team2InnerTimeBar") as HTMLElement;
            width = (100 / this.team2CounterBar) * currentTeamTime;
        }
        
        if(elem != undefined){
            elem.style.width = width + "%";
        }
    }

    public doWinSound():boolean{
        this.audioControl.playAudioClip(this.audioWin);
        return true;
    }
    
    public updateGivenResponseTeam1(event: { target: {name: any, value: any; }; }) {
        this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].responseGiven = event.target.value;
    }
    
    public updateGivenResponseTeam2(event: { target: {name: any, value: any; }; }) {
        this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].responseGiven = event.target.value;
    }
}