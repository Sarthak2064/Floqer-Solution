import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

interface Salary {
    work_year: number;
    job_title: string;
}

interface ProcessedData {
    year: number;
    total_jobs: number;
}

const processData = (data: Salary[]): ProcessedData[] => {
    const result: { [key: string]: { total_jobs: number } } = {};

    data.forEach(item => {
        if (!result[item.work_year]) {
            result[item.work_year] = { total_jobs: 0 };
        }
        result[item.work_year].total_jobs += 1;
    });

    return Object.keys(result).map(year => ({
        year: parseInt(year),
        total_jobs: result[year].total_jobs,
    }));
};

const LineGraph = () => {
    const [chartData, setChartData] = useState<{
        series: { data: number[] }[];
        options: ApexCharts.ApexOptions;
    }>({
        series: [],
        options: {
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Total Salaries by Year',
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Year'
                }
            },
            yaxis: {
                title: {
                    text: 'Total Salaries'
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        }
    });

    useEffect(() => {
        axios.get<Salary[]>('https://floqer-solution.onrender.com/api/salaries')
            .then(response => {
                const processedData = processData(response.data);
                const seriesData = processedData.map(item => item.total_jobs);
                const categories = processedData.map(item => item.year.toString());

                setChartData(prevState => ({
                    ...prevState,
                    series: [{ data: seriesData }],
                    options: {
                        ...prevState.options,
                        xaxis: {
                            ...prevState.options.xaxis,
                            categories: categories
                        }
                    }
                }));
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
            });
    }, []);

    return (
        <React.Fragment>
            <h1>Line Graph</h1>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={550} />
            </div>
        </React.Fragment>
    );
};

export default LineGraph;
