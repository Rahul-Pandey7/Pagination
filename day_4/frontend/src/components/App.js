import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sorting from './Sorting';

export default class App extends React.Component{
    render(){
        return (
            <div>
                <Router>
                    <Route path='/' exact component={Sorting}/>
                    <Route path="/sort" component={Sorting}/>
                </Router>
            </div>
        )
    }
}