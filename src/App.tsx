import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';
import LoginScreen from './views/Login/LoginView';
import HomeScreen from './views/HomeScreenView';
import NotFound from './views/NotFoundView';
import ProjectScreen from './views/Projects/ProjectView/ProjectsView';
import LandingPage from './views/LandingPage/LandingPage'
import Planner from './components/Planner/Planner';
import RegisterScreen from './views/Register/RegisterView';
import { MuiThemeProvider, createMuiTheme, Theme, withStyles } from '@material-ui/core';
import { Colors } from './util/constants';
import ProjectBacklogView from './views/Projects/ProjectBacklogView/ProjectBacklogView';
import MenuBar from './components/MenuBar/MenuBar';

interface AppState {
  title: string,
  routes: any,
}

interface AppProps {
  classes: any,
}

const useStyles = (theme: Theme) => ({
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(7),
    paddingTop: theme.spacing(8),
    position: "relative"
  },
});

class App extends React.Component<AppProps, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      title: 'Stacklog',
      routes: [
        { component: HomeScreen, path: '/', exact: true },
        { component: LoginScreen, path: '/login' },
        { component: ProjectScreen, path: '/projects' },
        { component: RegisterScreen, path: '/register' },
        { component: ProjectBacklogView, path: '/project' },
        //route if view is not found
        { component: NotFound }
      ]
    };
  }

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    //@ts-ignore
    const { classes } = this.props;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            <MenuBar title="title" />
            <div className={classes.content}>
              <Switch>
                {this.state.routes.map((route: any, i: number) => (<Route key={i} {...route} />))}
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}


const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primaryColor
    },
    secondary: {
      main: Colors.secondaryColor
    }
  }
});

//@ts-ignore
export default withStyles(useStyles)(App)