import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';
import LoginScreen from './views/Login/LoginView';
import HomeScreen from './views/HomeScreenView';
import NotFound from './views/NotFoundView';
import ProjectScreen from './views/Projects/ProjectView/ProjectsView';
import LandingPage from './components/LandingPage/LandingPage'
import Planner from './components/Planner/Planner';
import RegisterScreen from './views/Register/RegisterView';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Colors } from './util/constants';
import ProjectBacklogView from './views/Projects/ProjectBacklogView/ProjectBacklogView';

interface AppState {
  title: string,
  routes: any,
}

interface AppProps {
}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: 'Stacklog',
      routes: [
        { component: HomeScreen, path: '/home', exact: true },
        { component: LoginScreen, path: '/login' },
        { component: ProjectScreen, path: '/projects' },
        { component: Planner, path: '/planner' },
        { component: RegisterScreen, path: '/register' },
        { component: ProjectBacklogView, path: '/project'},
        { component: LandingPage, path: '/'},
        //route if view is not found
        { component: NotFound }
      ]
    };
  }

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              {this.state.routes.map((route: any, i: number) => (<Route key={i} {...route} />))}
            </Switch>
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