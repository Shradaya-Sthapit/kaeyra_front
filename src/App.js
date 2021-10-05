import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from "react-router";
import Home from './components/Home';
import Post from './components/Post';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/post" component={Post}/>  
      </Switch>
   </BrowserRouter>

  );
}


export default App;
