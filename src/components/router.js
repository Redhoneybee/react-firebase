import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// routes
import Auth from "../routes/Auth";
import Home from "../routes/Home";
const AppRouter = ({ isLoggedIn }) => {
    return (
        <>
            <Router>
                <Switch>
                    {isLoggedIn ?
                        <Home />
                        :
                        <Auth />
                    }
                </Switch>
            </Router>
        </>
    );
}

export default AppRouter;