/**
 * Digital Cipher Activity - Entrypoint to the activity app
 * @version 12.19.22
 * @author MrH-rezroll
 */

import { Routes, Route} from "react-router-dom";
import React, { useEffect } from "react";
import LayoutView from "./view/LayoutView";
import Team from "./model/team";
import PlayControl from "./control/PlayControl";
import AppLandingControl from "./control/AppLandingControl";

export interface Props {
  team1: Team;
  team2: Team;
  keys: {w:boolean, a:boolean, s:boolean, d:boolean, up:boolean, down:boolean, left:boolean, right:boolean};
  menuSelectSound: HTMLAudioElement;
  menuSelectSound2: HTMLAudioElement;
  menuSelectSound3: HTMLAudioElement;
  finishClickSound: HTMLAudioElement;
  winSound: HTMLAudioElement;
}

export default function App ({team1, team2, keys, menuSelectSound, menuSelectSound2, menuSelectSound3, finishClickSound, winSound}:Props){
      
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
      };
    });

    function downHandler({ key }:any): void {
        switch(key){
          case 'w':
            keys.w = true;
            break;
          case 'a':
            keys.a = true;
            break;
          case 's':
            keys.s = true;
            break;
          case 'd':
            keys.d = true;
            break;
          case 'ArrowUp':
            keys.up = true;
            break;
          case 'ArrowLeft':
            keys.left = true;
            break;
          case 'ArrowDown':
            keys.down = true;
            break;
          case 'ArrowRight':
            keys.right = true;
            break;
          default: break;
        }
    }

    function upHandler({ key }:any): void {
        switch(key){
          case 'w':
            keys.w = false;
            break;
          case 'a':
            keys.a = false;
            break;
          case 's':
            keys.s = false;
            break;
          case 'd':
            keys.d = false;
            break;
          case 'ArrowUp':
            keys.up = false;
            break;
          case 'ArrowLeft':
            keys.left = false;
            break;
          case 'ArrowDown':
            keys.down = false;
            break;
          case 'ArrowRight':
            keys.right = false;
            break;
          default: break;
        }
    }
    
    return (
      <div id="AppWrapper">
        <Routes>
          <Route path="/" element={<LayoutView />}>
            <Route index element={<AppLandingControl team1={team1} team2={team2} keys={keys} menuSelectSound={menuSelectSound} menuSelectSound2={menuSelectSound2} menuSelectSound3={menuSelectSound3} finishClickSound={finishClickSound} winSound={winSound}/>}/>
            <Route path="play" element={<PlayControl team1={team1} team2={team2} keys={keys} menuSelectSound={menuSelectSound} menuSelectSound2={menuSelectSound2} menuSelectSound3={menuSelectSound3} finishClickSound={finishClickSound} winSound={winSound}/>}/>
            <Route path="*" element={<AppLandingControl team1={team1} team2={team2} keys={keys} menuSelectSound={menuSelectSound} menuSelectSound2={menuSelectSound2} menuSelectSound3={menuSelectSound3} finishClickSound={finishClickSound} winSound={winSound}/>}/>
          </Route>
        </Routes>
      </div>
    );
}