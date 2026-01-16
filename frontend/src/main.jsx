import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { AppContextProvider } from "./Context/AppContext";
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<AppContextProvider>
    <App/>
</AppContextProvider>

</BrowserRouter>


)