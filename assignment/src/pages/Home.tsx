import React from "react";
import {Link} from "react-router-dom";

function Home(){
    return(
        <React.Fragment>
            <div className="container">
                <h1>Internship Task 1 : Basic Table</h1>
                <h3>Description:</h3>
                <p> Based on this data, create a table (call it “main table”) with the following columns: <br/>
                    1. Year<br/>
                    2. Number of total jobs for that year<br/>
                    3. Average salary in USD<br/>
                    Users should be able to sort the table by any column.</p>

                <h1>Internship Task 2: Analytics</h1>
                <h3>Description</h3>
                <p>1. A line graph that shows how this number has changed from 2020 to 2024 (kaggle link above has
                similar bar graph)<br/>
                2. Now, when I click a row from our main table, a second table should appear that displays <br/>
                    aggregated job titles and the number of jobs for that year.<br/>
                    For example, if the user clicks on 2022, all the titles from 2022 should appear in another table, along with the sum of how many times each job appeared in 2022</p>
                <button type="button" className="btn btn-outline-info">
                    <Link to="/table">
                        <a className="nav-link text-decoration-none">Click Here</a>
                    </Link>
                </button>
            </div>
        </React.Fragment>
    )
}

export default Home;