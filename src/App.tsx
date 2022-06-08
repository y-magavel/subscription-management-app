import React from 'react';
import './services/firebase';
import {BrowserRouter} from "react-router-dom";
import {Router} from "./router/Router";
import {RecoilRoot} from "recoil";
import {CircularProgress} from "@mui/material";

function App() {
    return (
        <>
            <RecoilRoot>
                <React.Suspense fallback={<CircularProgress />}>
                    <BrowserRouter>
                        <Router/>
                    </BrowserRouter>
                </React.Suspense>
            </RecoilRoot>
        </>
    );
}

export default App;
