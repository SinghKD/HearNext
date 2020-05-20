import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {track} from "./App"

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#1DB954'
    },
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});


export default theme  