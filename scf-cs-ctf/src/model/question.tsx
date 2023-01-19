/**
 * Digital CTF Activity - Models the elements common to all Questions
 * @version 01.17.23
 * @author MrH-rezroll
 */

import React from "react";

export default abstract class Question{
    public theQuestion:string;
    public timeLimit:number;
    public pointsScored:number;
    public responseGiven:string;
    public correctResponse:string;
    public supportImage:string;
    public answers: Array<string>;

    constructor(question:string, timeLimit: number, answers: Array<string> = new Array<string>, supportImage:string = "", correctResponse:string = ""){
        this.theQuestion = question;
        this.timeLimit = timeLimit;
        this.pointsScored = 0;
        this.responseGiven = "";
        this.answers = answers;
        this.correctResponse = correctResponse;
        this.supportImage = supportImage;
    }

    protected setPointsScored(pointsScored:number):void {
        this.pointsScored = pointsScored;
    }

    public scoreAnswer(answerNumber: number = 0):void {}
}