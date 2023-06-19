import React, { useState } from "react";
import "./App.css";
import { createRoot } from "react-dom/client";
import Shell from "./Shell";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const Order = React.lazy(() => import('order/OrderIndex'));
const App = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const totalPriceChanged = (price) =>{
        setTotalPrice(price);
    }
    const navigate = useNavigate();
    return (
        <Routes>
            <Route path="/ShellMFE" element={<Shell totalPriceChanged={totalPriceChanged}/>} />
            <Route path="/Order" element={<ErrorBoundary><Order totalPrice={totalPrice} onHideCart={() => {
                navigate('/ShellMFE');
            }}/></ErrorBoundary>} />
        </Routes>
    )
}

const root = createRoot(document.getElementById('root'));
    root.render(
            <BrowserRouter>
            <App/>
            </BrowserRouter>
    );