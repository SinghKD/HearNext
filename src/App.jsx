import React, {useState, useEffect} from 'react';
import './App.css';
import TopTracks from "./components/TopTracks"
import TopArtists from "./components/TopArtists"
import {Button, Typography, makeStyles, SvgIcon, Grid} from "@material-ui/core"
import { Spring } from "react-spring/renderprops"
import theme from './Theme';

const queryString = require('query-string');


function App() {

const [loggedIn, setLogin] = useState(false); 
const [track, setTrack] = useState(false);
const [artist, setArtist] = useState(false);
const [trackList, setTrackList] = useState([]);
const [artistList, setArtistList] = useState([]);
const [idTracks, setIdTracks] = useState([]);
const [idArtists, setIdArtists] = useState([]);


function showTracks(){
  setTrack(true);
  setArtist(false);
}

function showArtists(){
  setTrack(false);
  setArtist(true);
}


useEffect(() => {
  const parsed = queryString.parse(window.location.search);
  const token = parsed.access_token;

  function handleTracks(topTracks, trackIds){
    setTrackList(topTracks);
    
    fetch("https://api.spotify.com/v1/recommendations?seed_tracks="+trackIds, {
      headers: {'Authorization': 'Bearer ' + token }
      }).then(response => response.json())
      .then(data => setIdTracks(data.tracks));
  }

  function handleArtists(topArtists, artistIds){
    setArtistList(topArtists);
    
    fetch("https://api.spotify.com/v1/recommendations?seed_artists="+artistIds, {
      headers: {'Authorization': 'Bearer ' + token }
      }).then(response => response.json())
      .then(data => setIdArtists(data.tracks));
  }

  if(token){

    setLogin(true);

    fetch("https://api.spotify.com/v1/me/top/tracks", {
      headers: {'Authorization': 'Bearer ' + token }
      }).then(response => response.json())
      .then(data => handleTracks([data.items["0"].name, data.items["1"].name, data.items["2"].name, data.items["3"].name, data.items["4"].name] 
                                ,[data.items["0"].id, data.items["1"].id, data.items["2"].id, data.items["3"].id, data.items["4"].id]));

      fetch("https://api.spotify.com/v1/me/top/artists", {
        headers: {'Authorization': 'Bearer ' + token }
      }).then(response => response.json())
      .then(data => handleArtists([data.items["0"].name, data.items["1"].name, data.items["2"].name, data.items["3"].name, data.items["5"].name]
                                  ,[data.items["0"].id, data.items["1"].id, data.items["2"].id, data.items["3"].id, data.items["4"].id]));
  }

}, [])

const useStyles = makeStyles(theme => ({
  heading: {
    fontFamily: 'Major Mono Display',
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: '4rem'
    },
  },
  link: {
    fontFamily: 'Montserrat',
    justifyContent: 'center',
  }

}))

  const classes = useStyles();
  

  return(
    <div className="App">

{/* --------------------------------------------------heading------------------------------------------------ */}
      <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
        config={{duration: 1000}}
      >
        {props => (
          <div style={props}>
            <Typography 
              className={classes.heading} 
              variant={loggedIn? "h2" : "h1"} 
              align="center" 
              color="primary" 
              gutterBottom
              style={loggedIn? {marginBottom: "70px"}:null}
              >
                HearNext
            </Typography>
          </div>
        )}
      </Spring>

      
  {/* ---------------------------------------------menu buttons-------------------------------------- */}
      { 
        loggedIn? 
        <div>
          <Grid container justify="center" spacing="3">
            <Grid item>
              <Spring
                from={{opacity: 0}}
                to={{opacity: 1}}
                config={{duration: 1000, delay:1000}}
              >
                {props => (
                  <div style={props}>
                    <Button  
                      className={classes.link}
                      variant={track? "contained" : "outlined"} 
                      color="primary" 
                      size="large" 
                      onClick={showTracks}
                      >
                        Your Top Tracks
                    </Button>
              </div>
              )}
              </Spring>
            </Grid>

            <Grid item>
              <Spring
                from={{opacity: 0}}
                to={{opacity: 1}}
                config={{duration: 1000, delay:1000}}
              >
                {props => (
                  <div style={props}>
                    <Button 
                      className={classes.link}
                      variant={artist? "contained" : "outlined"} 
                      color="primary" 
                      size="large" 
                      onClick={showArtists}
                      >
                        Your Top Artists
                    </Button>
              </div>
              )}
              </Spring>
            </Grid>
           </Grid>

          {track && 
          <TopTracks 
            track = {track}
            tracks = {trackList}
            suggTracks = {idTracks}
            Classes = {classes}
          />}

          {artist && 
          <TopArtists 
            artist = {artist}
            artists = {artistList}
            suggTracks = {idArtists}
            Classes = {classes}
          />}
        </div> 
        : 
  // -----------------------------------------login button--------------------------------------------------

        <Grid container justify="center" alignItems="center" style={{height: "500px"}}>
          <Grid item>
            <Spring
            from={{opacity: 0}}
            to={{opacity: 1}}
            config={{duration: 1000, delay:1000}}
            >
            {props => (
              <div style={props}>
                <Button 
                  className={classes.link} 
                  color="primary" 
                  size="large" 
                  variant="outlined" 
                  href='https://hearnextbackend.herokuapp.com/login'
                  endIcon={
                    <SvgIcon>
                      <g>
                      <path d="m17.672 16.718c-3.232-2.129-7.295-2.646-12.076-1.532-.96.223-.636 1.68.34 1.461 7.692-1.788 10.547 1.448 11.323 1.448.742-.001 1.033-.968.413-1.377z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#1DB954"/>
                      <path d="m5.257 12.896c4.301-1.018 9.184-.426 12.744 1.542.866.479 1.592-.834.726-1.312-3.875-2.142-9.167-2.788-13.815-1.689-.964.227-.623 1.686.345 1.459z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#1DB954"/>
                      <path d="m4.689 8.994c4.53-1.386 10.885-.626 14.469 1.73.823.541 1.654-.708.824-1.253-3.98-2.617-10.742-3.438-15.732-1.912-.952.291-.504 1.726.439 1.435z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#1DB954"/>
                      <path d="m12 24c6.617 0 12-5.383 12-12s-5.383-12-12-12-12 5.383-12 12 5.383 12 12 12zm0-22.5c5.79 0 10.5 4.71 10.5 10.5s-4.71 10.5-10.5 10.5-10.5-4.71-10.5-10.5 4.71-10.5 10.5-10.5z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#1DB954"/></g>
                    </SvgIcon>}
                >
                    Login with Spotify 

                </Button> 
              </div>
              )}
            </Spring>
          </Grid>
        </Grid>
      }

    </div>  
  )
    }


export default App
