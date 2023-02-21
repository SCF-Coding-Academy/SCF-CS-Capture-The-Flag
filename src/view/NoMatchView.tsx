/**
 * Digital Cipher Activity - Handles any UI required to notify and/or redirect user in the event of an invalid route
 * @version 12.19.22
 * @author MrH-rezroll
 */

import { Link } from "react-router-dom";

export default function NoMatchView() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }