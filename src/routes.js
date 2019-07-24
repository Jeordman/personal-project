import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import MyCounselor from './components/MyCounselor/MyCounselor'
import CounselorLogin from './components/CounselorLogin/CounselorLogin'
import CounselorSignup from './components/CounselorSignup/CounselorSignup'

export default (
    <Switch>
        <Route path='/counselorsignup' component ={CounselorSignup} />
        <Route path='/counselorLogin' component={CounselorLogin} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/myCounselor/:id' component={MyCounselor} />
        <Route exact path='/' component={Dashboard} />
    </Switch>
)