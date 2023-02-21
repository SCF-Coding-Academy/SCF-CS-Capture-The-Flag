/**
 * Digital CTF Activity - Models a Team to compete answering Questions
 * @version 01.17.23
 * @author MrH-rezroll
 */

import Questions from "./questions";

export default class Team{
    public name:string;
    public currentQuestionIndex:number;
    public questions:Questions;

    public teamCurrentState = {question:"", timeLimit:20};

    constructor(name:string){
        this.name = name;
        this.questions = new Questions();
        this.currentQuestionIndex = 0;
        this.resetTeam = this.resetTeam.bind(this);
    }

    public resetTeam():void{
        this.questions = new Questions();
        this.currentQuestionIndex = 0;
    }
}