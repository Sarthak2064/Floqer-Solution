import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, Column, useSortBy } from "react-table";
import { columns } from "../components/columns";
import {Link, useNavigate} from "react-router-dom"; // Ensure this is the correct path


interface Salary {
    work_year: number;
    experience_level: string;
    employment_type: string;
    job_title: string;
    salary: number;
    salary_currency: string;
    salary_in_usd: number;
    employee_residence: string;
    remote_ratio: number;
    company_location: string;
    company_size: string;
}

interface ProcessedData {
    year: number;
    total_jobs: number;
    avg_salary: number;
}



const processData = (data: Salary[]): ProcessedData[] => {
    const result: { [key: string]: { total_jobs: number; total_salary: number } } = {};

    data.forEach((item) => {
        if (!result[item.work_year]) {
            result[item.work_year] = { total_jobs: 0, total_salary: 0 };
        }
        result[item.work_year].total_jobs += 1;
        result[item.work_year].total_salary += parseFloat(item.salary_in_usd.toString()); // Ensure salary_in_usd is parsed as a number
    });


     return Object.keys(result).map((year) => {
        const total_jobs = result[year].total_jobs;
        const total_salary = result[year].total_salary;
        const avg_salary = total_jobs > 0 ? total_salary / total_jobs : 0;
        return {
            year: Number(year),
            total_jobs,
            avg_salary,
        };
    });
};

const TableComponent: React.FC = () => {
    const [salaries, setSalaries] = useState<Salary[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get<Salary[]>(`https://floqer-solution.onrender.com/api/salaries`)
            .then((response) => {
                setSalaries(response.data);
            })
            .catch((error) => {
                console.error("Error fetching salaries:", error);
            });
    }, []); // Empty dependency array to fetch salaries only once

    const processedData = React.useMemo(() => processData(salaries), [salaries]);


    const handleRowClick = (year: number) => {
        navigate(`/second-table/${year}`);
    };


    const tableInstance = useTable(
        { columns: columns as Column<ProcessedData>[], data: processedData },
        useSortBy
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="main">
            <h1>Salary List</h1>
            <table {...getTableProps()} className="table">
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                                {column.render("Header")}
                                <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            key={row.id}
                            onClick={() => handleRowClick(row.original.year)}
                            data-year={row.original.year}
                            style={{ cursor: "pointer" }}
                        >
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} key={cell.column.id}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <p>*Note*: To sort the data just click on the column headings.</p>
            <br />
            <h4>To see Line Graph of above data click here</h4>
            <button type="button" className="btn btn-outline-info">
                <Link to="/line">
                    <a className="nav-link text-decoration-none">Click Here</a>
                </Link>
            </button>
        </div>
    );
};

export default TableComponent;
