import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';
import LoginScreen from './views/LoginView';
import HomeScreen from './views/HomeScreenView';
import NotFound from './views/NotFoundView';
import ProjectScreen from './views/ProjectsView';
import Planner from './components/Planner/Planner';
import Backlog from './components/Planner/Backlog/BacklogComponent';
import RegisterScreen from './views/RegisterView';

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
        { component: HomeScreen, path: '/', exact: true },
        { component: LoginScreen, path: '/login' },
        { component: ProjectScreen, path: '/projects' },
        { component: Planner, path: '/planner' },
        { component: RegisterScreen, path: '/register' },
        //route if view is not found
        { component: NotFound}
      ]
    };
  }

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {this.state.routes.map((route: any, i: number) => (<Route key={i} {...route} />))}
          </Switch>
        </Router>
      </div>
    );
  }
}
