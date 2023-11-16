import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home/Home';


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>} />
                {/*<Route path="/about" component={MoviePage} />*/}
            </Routes>
        </Router>
    );
};

export default AppRouter;