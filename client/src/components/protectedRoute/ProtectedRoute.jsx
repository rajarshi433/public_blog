import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {

    const email = useSelector((state) => state.auth.email);

    if (!email) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default ProtectedRoute;