/**
 * Digital Cipher Activity - This view provides the user with the option to do the Beginner or Advanced activity
 * @version 12.19.22
 * @author MrH-rezroll
 */

import { Props } from "../App";
import { Link } from "react-router-dom";
import AppLandingControl from "../control/AppLandingControl";

export default function AppLandingView(props:Props, appLandingControl:AppLandingControl) {
    return (
      <div id="AppLanding">
        <h2>Create Team Names</h2>
        <div id="MainSelection">
          <form>
            <label htmlFor="team1Name">Team 1</label>
            <input onChange={appLandingControl.updateTeam1Name} name="team1Name" type="text" defaultValue={"Team A"}></input>
            <label htmlFor="team2Name">Team 2</label>
            <input onChange={appLandingControl.updateTeam2Name} name="team2Name" type="text" defaultValue={"Team B"}></input>
          </form>
          <Link to="play">Play Game!</Link>
        </div>
      </div>
    );
  }