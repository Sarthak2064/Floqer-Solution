import React from "react";
import {Link} from "react-router-dom";

const Navbar = ({title = "Floqer"}) => {
    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to="/">
                        <a className="navbar-brand">{title}</a>
                    </Link>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar;