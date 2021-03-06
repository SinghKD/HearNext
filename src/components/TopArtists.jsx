import React, {useState} from "react"
import { Grid, Typography, Button } from "@material-ui/core";
import { useTrail, animated } from 'react-spring'
import { Spring } from "react-spring/renderprops"

const config = { mass: 5, tension: 2000, friction: 200 }


function TopArtists(props){

    const [trackSugg, setTrackSugg] = useState(false);

    function handleClick(){
        setTrackSugg(prevValue => !prevValue);
    }

    const [toggle, set] = useState(props.artist)
    const trail = useTrail(props.artists.length, {
        config,
        opacity: toggle ? 1 : 0,
        x: toggle ? 0 : 20,
        height: toggle ? 25 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    })  


    return(
    <div> 
        <Grid container direction="column" alignItems="center">

            <ol style={{marginBottom: "50px"}}>
                {trail.map(({ x, height, ...rest }, index) => (
                    <Grid item>
                        
                    <Typography color="primary">
                        <li>
                            <animated.div
                            key={props.artists[index]}
                            className="trails-text"
                            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
                            <animated.div style={{ height }}>{props.artists[index]}</animated.div>
                            </animated.div>
                         </li>
                    </Typography>
                    
                    </Grid>
                ))}
            </ol>       
                
            <Grid item>
            {!trackSugg?

                <Spring
                from={{opacity: 0}}
                to={{opacity: 1}}
                config={{duration: 1000, delay: 1200}}
                >
                {props => (
                    <div style={props}>
                    <Button 
                        onClick={handleClick}
                        style={{fontFamily: 'Montserrat'}}
                        variant="outlined"
                        color="primary" 
                        size="medium"
                    >
                        Get Suggestions based on your favourite artists 
                    </Button>
                </div>
                )}
                </Spring>
            :
                <Button 
                    onClick={handleClick}
                    className={props.Classes.link}
                    variant="outlined"
                    color="primary" 
                    size="medium"
                >
                Hide Suggestions
                </Button>
            }           
            </Grid>
        
            {trackSugg && 
            <Spring
                from={{opacity: 0}}
                to={{opacity: 1}}
                config={{duration: 1200, delay: 600}}
            >
                {prop => (
                <div style={prop}>
                    <ul>
                    {props.suggTracks.map(track => 
                        <Grid item >
                            <Typography color="primary">
                                <li>{track.name} by {track.artists["0"].name.toUpperCase()}</li>
                            </Typography>
                        </Grid>)}
                    </ul>
                </div>
                )}
            </Spring>}

        </Grid>

    </div>
    )

}

export default TopArtists;
