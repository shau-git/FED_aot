# FED_aot
This aot web page provides a comprehensive information about the popular manga __Attack On Titan__ , written by Hajime Isayama, organized into in sections for characters, titans, episodes, locations and organizations. Furthermore, Users can like their favorite characters after logging in, making it a valuable resource for all Attack on Titan fans.


Each section offers search by name, with episodes featuring a season dropdown filter. For extra fun, the Get Started page lets fans "slice to transform". The Hero section features images of some iconic scenes from the anime. Hope you enjoy using the app!


My project link [FED_aot](https://shau-git.github.io/PF_NarutoDB/)


## Design Process
My intention for this app’s design was to make it look cinematic and anime‑styled. To achieve this, I drew inspiration for the hero section from [Netflix](https://www.netflix.com/sg/title/70299043). For the titan display section, I referenced design ideas from the [Naruto website](https://naruto-official.com/en/special/naruto-storm-series), and for the song part, I adapted concepts from [Spotify](https://open.spotify.com/).

You can view my design prototype in this Figma [link](https://www.figma.com/design/u43Fv081mEVCyoJITjiCr6/aot?node-id=0-1&t=oo6A1yfX2TP5tjV0-1).


## Features
In this section will dive dip in all the details of each sections in this app.

### Get Started
This is the first section you'll see when visiting the app.
1. __Select Image__:
    - Choose from images at the bottom of the hero section.
2. __Select Audio__:
    - Click the audio player on the center right to hear Eren's speech.
3. __Change display__:
    - Click the knife icon (top right of hero image) to activate. The icon turns red, locks the screen (no scrolling), but keeps all elements clickable. 
    - Drag anywhere to "slice to transform" — switches images and audio.
    - Click the knife icon again to deactivate — screen unlocks, icon returns to normal.
4. __Get Started Button__:
    - click this button to proceed to Home.

### Home Page
This section contains the app's core information. Note: Some images aren't provided by the API.
1. __Hero Section__:
    - `More button`: Cycle through different seasons of hero images.
    - `Random Quote button`: Fetch a random Attack on Titan quote.
    - `Drag from top center` → Attack on Titan logo slides down → click to return to Get Started.
2. __Titans__:
    - Navigate Titan Height, Abilities, and Allegiance.
    - Read More → detailed titan information.
3. __Characters__:
    - Search bar filters characters by name.
    - Deceased characters appear in black & white; hover to reveal original colors.
    - Read More → detailed character information.
4. __Episodes__:
    - Dropdown filters episodes by season.
    - `Click episode title `→ view episode details.
5. __Locations & Organizations__:
    - Search bar filters by name.
    - Read More → detailed information.
6. __Likes__:
    - `Logged-in` users can like favorite characters.
    - `log out button` to log out.
7. __Songs__:
    - `Green Scout Regiment logo` (bottom right) is draggable but can't be dismissed.
    - `Double-click the logo` → opens Song section..
    - Select songs to play.
    - Close with the cross icon (top left).
    - __Note__ : Songs continue playing if not paused before closing.

## Technologies Used
1. Frontend :
    - [React](https://react.dev/) : building fast, interactive, and reusable user interfaces easy and scalable.
    - [Tailwind](https://tailwindcss.com/) : style fast, consistently, and directly in JSX without writing custom CSS.
2. Backend :
    - [Express](https://expressjs.com/) : building fast, simple, and flexible backend APIs in Node.js easy.
3. Database : 
    - [Neon](https://neon.com/) : It provides a serverless, scalable PostgreSQL database that’s easy to deploy and manage.
4. Deployment:
    - Frontend: [vercel](https://vercel.com/shaus-projects)
    - Backend: [render](https://render.com/)


## Testing
If you notice a character __like button__ that __isn't working__, it's likely because the server takes some time to start up. Simply __log out__ and __log back in__, and the issue should be resolved.

## Credits

### Content
- The Sysnosis for each epsiodes were copied from [attackontitan.fandom](https://attackontitan.fandom.com/wiki/List_of_Attack_on_Titan_episodes).
- The API source for this project [attackontitanapi](https://www.attackontitanapi.com/docs)
- The API source for the random quote inthe Hero section [attackontitanquotes](https://attackontitanquotes.vercel.app/).

### Media and audio
- All of the photos used in this project were obtained from [Pinterest](https://www.pinterest.com/).
- The cursor images were downloaded from [sweezy-cursor](https://sweezy-cursors.com/)
- All audio for Eren's speech in the get started page were downloaded from [zedge](https://www.zedge.net/).
- All Songs were downloaded from [skysound7](https://skysound7.com/).
    
### Acknowledgements
- I received inspiration for this project from Hajime Isayama’s [Attack on Titan](https://en.wikipedia.org/wiki/Attack_on_Titan_(TV_series))
