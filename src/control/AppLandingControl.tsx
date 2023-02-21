import React from "react";
import { Props } from "../App";
import AppLandingView from "../view/AppLandingView";

export default class AppLandingControl extends React.Component<Props>{

    constructor(props:Props){
        super(props);
        this.updateTeam1Name = this.updateTeam1Name.bind(this);
        this.updateTeam2Name = this.updateTeam2Name.bind(this);
    }

    render(): React.ReactNode {
        return AppLandingView(this.props, this);
    }

    public updateTeam1Name(event: { target: {name: any, value: any; }; }):void{
        this.props.team1.name = event.target.value;
    }

    public updateTeam2Name(event: { target: {name: any, value: any; }; }):void{
        this.props.team2.name = event.target.value;
    }
}