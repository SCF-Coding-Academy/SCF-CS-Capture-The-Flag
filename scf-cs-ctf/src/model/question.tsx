/**
 * Digital CTF Activity - Models the elements common to all Questions
 * @version 01.17.23
 * @author MrH-rezroll
 */

export default abstract class Question{
    public theQuestion:string;
    public timeLimit:number;

    constructor(question:string, timeLimit: number){
        this.theQuestion = question;
        this.timeLimit = timeLimit;
    }
}