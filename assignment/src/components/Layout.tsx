import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
    navbar?: boolean;
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ navbar = true, children }) => {
    return (
        <>
            {navbar && <Navbar />}
            <div className="container mt-3">{children}</div>
        </>
    );
};

export default Layout;
