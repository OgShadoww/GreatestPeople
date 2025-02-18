import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routers } from '../routes';

const Routers = () => {
    return (
        <Routes>
            {routers.map(route => (
                <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};

export default Routers;