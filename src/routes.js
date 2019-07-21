import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup'

export default (
    <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
    </Switch>
)