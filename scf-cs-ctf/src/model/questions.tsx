/**
 * Digital CTF Activity - Models a collection of Questions
 * @version 01.17.23
 * @author MrH-rezroll
 */

import Question from "./question";
import QuestionButtonResponse from "./questionButtonResponse";

import * as questionsButtonResponseJSON from '../questionsButtonResponseTEXT.json';
import * as questionsTextResponseJSON from '../questionsTextResponseTEXT.json';
import QuestionTextResponse from "./questionTextResponse";

export default class Questions{
    public theQuestions:Array<Question>;
    public totalScorePossible:number;
    public totalScoreRecieved:number;

    constructor(){

        let qBs: string = JSON.stringify(questionsButtonResponseJSON);
        let qTs: string = JSON.stringify(questionsTextResponseJSON);
        let questionsButtonResponse = JSON.parse(qBs);
        this.theQuestions = [];
        this.totalScorePossible = 0;
        this.totalScoreRecieved = 0;

        for (const key in questionsButtonResponse){
            if(key != "default"){
                this.theQuestions.push(new QuestionButtonResponse(
                    questionsButtonResponse[key].question,
                    questionsButtonResponse[key].answer1,
                    questionsButtonResponse[key].answer2,
                    questionsButtonResponse[key].answer3,
                    questionsButtonResponse[key].answer4,
                    parseInt(questionsButtonResponse[key].points1),
                    parseInt(questionsButtonResponse[key].points2),
                    parseInt(questionsButtonResponse[key].points3),
                    parseInt(questionsButtonResponse[key].points4),
                    parseInt(questionsButtonResponse[key].timeLimit)
                ));
                this.totalScorePossible += Math.max(parseInt(questionsButtonResponse[key].points1), parseInt(questionsButtonResponse[key].points2), parseInt(questionsButtonResponse[key].points3), parseInt(questionsButtonResponse[key].points4));
            }
        }

        let questionsTextResponse = JSON.parse(qTs);
        for (const key in questionsTextResponse){
            if(key != "default"){
                this.theQuestions.push(new QuestionTextResponse(
                    questionsTextResponse[key].question,
                    questionsTextResponse[key].correctResponse,
                    parseInt(questionsTextResponse[key].timeLimit),
                    parseInt(questionsTextResponse[key].pointValue),
                    questionsTextResponse[key].isCaseSensitive
                ));
                this.totalScorePossible += parseInt(questionsTextResponse[key].pointValue);
            }
        }
    }

    public setTotalScoreRecieved():void{
        this.theQuestions.forEach( (value) => {
            this.totalScoreRecieved += value.pointsScored;
        });
    }
}