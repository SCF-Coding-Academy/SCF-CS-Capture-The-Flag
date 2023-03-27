/**
 * Digital Cipher Activity - This view provides the user with the option to do the Beginner or Advanced activity
 * @version 12.19.22
 * @author MrH-rezroll
 */

import { Props } from "../App";
import { Link } from "react-router-dom";
import AppLandingControl from "../control/AppLandingControl";

export default function AppLandingView(props:Props, appLandingControl:AppLandingControl) {
  let audio = new Audio(props.menuSelectSound.src);
  const playAudio = () => {
    audio.play();
  }
    return (
      <div id="AppLanding">
        <h2>Create Team Names</h2>
        <div id="MainSelection">
          <form>
            <div>
              <label htmlFor="team1Name">Team 1:</label>
              <input onChange={appLandingControl.updateTeam1Name} name="team1Name" type="text" defaultValue={"Team A"}></input>
            </div>
            <div>
              <label htmlFor="team2Name">Team 2:</label>
              <input onChange={appLandingControl.updateTeam2Name} name="team2Name" type="text" defaultValue={"Team B"}></input>
            </div>
          </form>
          <Link onClick={playAudio} to="play">Play Game!</Link>
        </div>
      </div>
    );
  }