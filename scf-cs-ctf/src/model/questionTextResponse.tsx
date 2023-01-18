/**
 * Digital CTF Activity - Models a Question that requires text input for response
 * @version 01.17.23
 * @author MrH-rezroll
 */

import Question from "./question";

export default class QuestionTextResponse extends Question{
    public givenResponse: string;

    private isCaseSensitive: boolean;
    private pointValue: number;
    private correctResponse: string;

    constructor(question: string, correctResponse: string, timeLimit: number = 30, pointValue: number = 2, isCaseSensitive: boolean = true){
        super(question, timeLimit);
        this.pointValue = pointValue;
        this.correctResponse = correctResponse;
        this.givenResponse = "";
        this.isCaseSensitive = isCaseSensitive;
    }

    public scoreAnswer():void{
        if(this.isCaseSensitive){
            if(this.givenResponse == this.correctResponse)
                this.setPointsScored(this.pointValue);
        }
        else{
            if(this.givenResponse.toLowerCase() == this.givenResponse.toLowerCase())
            this.setPointsScored(this.pointValue);
        }
    }
}