import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from '../pages/Home';
// import SignUp from '../pages/SignUp';



const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route path="/register" component={SignUp} /> */}
    </Switch>
  );
}


export default Routes