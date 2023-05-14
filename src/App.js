import './App.css';
//use effect for synchronize a component with an external system
import React, { useEffect, useState } from "react";
// for notifications
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { useDispatch } from "react-redux";
//use state
const App = () => {
    const dispatch = useDispatch();
    //use effect function
    useEffect(() => {
        const data = [];
        const promise = async () => {
            //fetching contact function form json placeholder
            await fetch('https://jsonplaceholder.typicode.com/users/')
                .then((response) => response.json())
                .then((json) => {
                    json.map((contact) => {
                        data.push({
                            id: contact.id,
                            name: contact.name,
                            number: contact.phone,
                            email: contact.email
                        });
                    })
                });
            dispatch({ type: 'FETCH_CONTACTS', payload: data });
        };
        promise();
    }, []);


    return (
        <div className="App">
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}>

                </Route>
                <Route path="/add" element={<Add />}>

                </Route>
                <Route path="/edit/:id" element={<Edit />}>

                </Route>
            </Routes>
        </div>
    );
}

export default App;