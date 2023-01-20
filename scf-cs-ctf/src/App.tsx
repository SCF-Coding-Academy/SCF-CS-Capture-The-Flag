/**
 * Digital Cipher Activity - Entrypoint to the activity app
 * @version 12.19.22
 * @author MrH-rezroll
 */

import { Routes, Route} from "react-router-dom";
import React from "react";
import LayoutView from "./view/LayoutView";
import AppLandingView from "./view/AppLandingView";
import Team from "./model/team";
import PlayControl from "./control/PlayControl";
import AppLandingControl from "./control/AppLandingControl";

export interface Props {
  team1: Team;
  team2: Team;
}

export default function App ({team1, team2}:Props){
  
    return (
      <div id="AppWrapper">
        <h1>Capture the Flag</h1>
        <Routes>
          <Route path="/" element={<LayoutView />}>
            <Route index element={<AppLandingControl team1={team1} team2={team2}/>}/>
            <Route path="play" element={<PlayControl team1={team1} team2={team2} />}/>
            <Route path="*" element={<AppLandingControl team1={team1} team2={team2}/>}/>
          </Route>
        </Routes>
      </div>
    );
}