import React from 'react';
import './services/firebase';
import {BrowserRouter} from "react-router-dom";
import {Router} from "./router/Router";
import {RecoilRoot} from "recoil";
import {Fallback} from "./components/atoms/Fallback";

function App() {
    return (
        <>
            <RecoilRoot>
                <React.Suspense fallback={<Fallback />}>
                    <BrowserRouter>
                        <Router/>
                    </BrowserRouter>
                </React.Suspense>
            </RecoilRoot>
        </>
    );
}

export default App;
