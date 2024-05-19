import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { useTable, Column } from "react-table";

interface Salary {
    work_year: number;
    job_title: string;
}

interface JobTitleCount {
    job_title: string;
    count: number;
}

const secondTable: React.FC = () => {
    const { year } = useParams<{ year: string }>();
    const [jobTitleCounts, setJobTitleCounts] = useState<JobTitleCount[]>([]);

    useEffect(() => {
        axios
            .get<Salary[]>(`https://floqer-solution.onrender.com/api/salaries`)
            .then((response) => {
                const filteredSalaries = response.data.filter(salary => salary.work_year.toString() === year);
                const counts = filteredSalaries.reduce((acc: { [title: string]: number }, salary) => {
                    acc[salary.job_title] = (acc[salary.job_title] || 0) + 1;
                    return acc;
                }, {});

                const countsArray: JobTitleCount[] = Object.keys(counts).map((key) => ({
                    job_title: key,
                    count: counts[key]
                }));

                setJobTitleCounts(countsArray);
            })
            .catch((error) => {
                console.error("Error fetching salaries:", error);
            });
    }, [year]);

    const columns: Column<JobTitleCount>[] = React.useMemo(
        () => [
            {
                Header: 'Job Title',
                accessor: 'job_title',
            },
            {
                Header: 'Number of Jobs',
                accessor: 'count',
            },
        ],
        []
    );

    const data = React.useMemo(() => jobTitleCounts, [jobTitleCounts]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { columns, data }
    );

    return (
        <div>
            <h2>Job Titles for {year}</h2>
            <table {...getTableProps()} className="table">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} key={cell.column.id}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default secondTable;
