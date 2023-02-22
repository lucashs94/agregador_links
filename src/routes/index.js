import { Route, Routes } from "react-router-dom"

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Admin from '../pages/Admin'
import Error from '../pages/Error'
import Networks from '../pages/Networks'

import Private from "./Private"

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/'                 element={ <Login/> }/>

            <Route path='/register'         element={ <Register/> }/>

            <Route path='/settings'         element={ <Private> <Admin/> </Private> }/>
            <Route path='/admin'            element={ <Private> <Admin/> </Private> }/>
            <Route path='/admin/social'     element={ <Private> <Networks/> </Private> }/>
            
            <Route path='/:slug'            element={ <Home/> }/>
            
            <Route path='*'                 element={ <Error/> }/>
        </Routes>
    )
}
