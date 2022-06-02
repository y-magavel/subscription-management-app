import React from 'react';
import './services/firebase';
import {BrowserRouter} from "react-router-dom";
import {Router} from "./router/Router";
import {RecoilRoot} from "recoil";

function App() {
    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Router/>
                </RecoilRoot>
            </BrowserRouter>
        </>
    );
}

export default App;
