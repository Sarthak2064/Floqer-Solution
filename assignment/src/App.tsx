import React from "react";
import TableComponent from "./pages/tableComponent.tsx";
import Layout from "./components/Layout.tsx";
import {Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import {BrowserRouter as Router, Routes} from "react-router-dom";
import LineGraph from "./pages/LineGraph.tsx";
import SecondTableComponent from "./pages/secondTable.tsx";

function App() {
  return (
    <React.Fragment>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/table" element={<TableComponent />} />
                    <Route path="/line" element={<LineGraph />} />
                    <Route path="/second-table/:year" element={<SecondTableComponent />} />
                </Routes>
            </Layout>
        </Router>
    </React.Fragment>
  )
}

export default App
