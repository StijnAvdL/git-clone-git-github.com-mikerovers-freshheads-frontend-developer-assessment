import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Innovations from "./pages/Innovations"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Innovations />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
