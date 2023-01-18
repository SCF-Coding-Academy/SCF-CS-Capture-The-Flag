/**
 * Digital CTF Activity - Models a Team to compete answering Questions
 * @version 01.17.23
 * @author MrH-rezroll
 */

import Questions from "./questions";

export default class Team{
    public name:string;
    public questions:Questions;

    constructor(name:string){
        this.name = name;
        this.questions = new Questions();
    }
}