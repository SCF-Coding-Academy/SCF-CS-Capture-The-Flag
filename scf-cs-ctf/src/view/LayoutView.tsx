/**
 * Digital Cipher Activity - Provides the surrounding markup for all screens within he app.
 * @version 12.19.22
 * @author MrH-rezroll
 */

import { Outlet} from "react-router-dom";

export default function LayoutView() {
    return (
      <div id="AppWrapper2">
        <h1 id="AppTitle">Digital Cipher Activity</h1>
        <Outlet />
      </div>
    );
  }