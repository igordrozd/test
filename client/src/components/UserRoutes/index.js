import React, { useContext } from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Documents, Editor, Login, Register} from "../../pages";
import {CreateModal} from "../EditModal";
import { StoreContext } from "../../App";

export function UserRoutes({ hasToken }) {
    const { store, update } = useContext(StoreContext);
    if(store.user) {
        return(
            <>
                <Routes>
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/documents/:id/*" element={<Editor />} />
                    <Route
                        path="*"
                        element={<Navigate to="/documents" replace />}
                    />
                </Routes>
            </>
        );
    }
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}
