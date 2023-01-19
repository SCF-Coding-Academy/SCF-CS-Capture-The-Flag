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
    team1Question:string,
    team1Answers:Array<string>,
    team1ImgUrl:string,
    team1TimeLimit:number,
    team2Question:string,
    team2Answers:Array<string>,
    team2ImgUrl:string,
    team2TimeLimit:number
}

export default class PlayControl extends React.Component<Props>{

    state:State;

    constructor(props:Props){
        super(props);


        this.state = {
            team1Question: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].theQuestion,
            team1Answers: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers,
            team1ImgUrl: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
            team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit,
            team2Question: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].theQuestion,
            team2Answers: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers,
            team2ImgUrl: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
            team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit,
        };

        cipherPreviewInput = null;
        cipherText = null; 
        this.answerButtonValue = this.answerButtonValue.bind(this);
    }

    render(): React.ReactNode {
        return PlayView(this.props, this, this.state);
    }

    answerButtonValue(event: any, answerNumber:number, teamNumber:number, isAnswerText:boolean = false) {
        event.preventDefault();
        if(teamNumber == 1){
            if(this.props.team1.currentQuestionIndex < this.props.team1.questions.theQuestions.length - 1){
                this.props.team1.currentQuestionIndex++;
                if(isAnswerText){
                    //handle text input answer
                }
                else{
                    //handle button input answer
                }
            }
        }
        else if(teamNumber == 2){
            if(this.props.team2.currentQuestionIndex < this.props.team2.questions.theQuestions.length - 1){
                this.props.team2.currentQuestionIndex++;
                if(isAnswerText){
                    //handle text input answer
                }
                else{
                    //handle button input answer
                }
            }
        }
        this.setState({
            team1Question: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].theQuestion,
            team1Answers: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].answers,
            team1ImgUrl: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].supportImage,
            team1TimeLimit: this.props.team1.questions.theQuestions[this.props.team1.currentQuestionIndex].timeLimit,
            team2Question: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].theQuestion,
            team2Answers: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].answers,
            team2ImgUrl: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].supportImage,
            team2TimeLimit: this.props.team2.questions.theQuestions[this.props.team2.currentQuestionIndex].timeLimit,
        });
    }
}