interface Salary {
    work_year: string;
    salary_in_usd: number;
    job_title: string;
}

interface ProcessedData {
    year: string;
    total_jobs: number;
    avg_salary: number;
}

export const processData = (data: Salary[]): ProcessedData[] => {
    const result: { [key: string]: { total_jobs: number; total_salary: number } } = {};

    data.forEach(item => {
        if (!result[item.work_year]) {
            result[item.work_year] = { total_jobs: 0, total_salary: 0 };
        }
        result[item.work_year].total_jobs += 1;
        result[item.work_year].total_salary += item.salary_in_usd;
    });

    return Object.keys(result).map(year => ({
        year,
        total_jobs: result[year].total_jobs,
        avg_salary: result[year].total_salary / result[year].total_jobs,
    }));
};