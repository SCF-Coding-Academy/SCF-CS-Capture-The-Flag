/**
 * Digital CTF Activity - Models a Question that requires text input for response
 * @version 01.17.23
 * @author MrH-rezroll
 */

import Question from "./question";

export default class QuestionTextResponse extends Question{

    private isCaseSensitive: boolean;
    private pointValue: number;

    constructor(question: string, correctResponse: string, timeLimit: number = 30, pointValue: number = 2, isCaseSensitive: boolean = true){
        super(question, timeLimit, new Array<string>, "", correctResponse);
        this.pointValue = pointValue;
        this.isCaseSensitive = isCaseSensitive;
    }

    public scoreAnswer(answer:number = 0):void{
        if(this.isCaseSensitive){
            if(this.responseGiven == this.correctResponse)
                this.setPointsScored(this.pointValue);
        }
        else{
            if(this.responseGiven.toLowerCase() == this.correctResponse.toLowerCase())
            this.setPointsScored(this.pointValue);
        }
    }
}