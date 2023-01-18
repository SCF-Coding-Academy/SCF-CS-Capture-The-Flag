/**
 * Digital CTF Activity - Models a Question requiring a button response
 * @version 01.17.23
 * @author MrH-rezroll
 */

import Question from "./question";

export default class QuestionButtonResponse extends Question{
    public answers: Array<string>;
    public points: Array<number>;

    constructor(question:string, answer1:string, answer2:string, answer3:string, answer4:string, points1:number, points2:number, points3:number, points4:number, timeLimit: number = 30){
        super(question, timeLimit);
        this.answers = new Array<string>(4);
        this.answers[0] = answer1;
        this.answers[1] = answer2;
        this.answers[2] = answer3;
        this.answers[3] = answer4;
        this.points = new Array<number>(4);
        this.points[0] = points1;
        this.points[1] = points2;
        this.points[2] = points3;
        this.points[3] = points4;
    }

    public getPointsForAnswer(answerNumber: number):number{
        try{
            return this.points[answerNumber];
        }
        catch (e){
            console.log(e);
            return 0;
        }
    }
}