// src/columns.tsx
import { Column } from 'react-table';

interface ProcessedData {
    year: string;
    total_jobs: number;
    avg_salary: number;
}

export const columns: Column<ProcessedData>[] = [
    {
        Header: 'Year',
        accessor: 'year',
    },
    {
        Header: 'Total Jobs',
        accessor: 'total_jobs',
    },
    {
        Header: 'Average Salary (USD)',
        accessor: 'avg_salary',
        Cell: ({ value }: { value: number }) => value.toFixed(2), // Format to two decimal places
    },
];
