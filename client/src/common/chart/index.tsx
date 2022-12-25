import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FC, useState } from 'react';
import { useEffect } from 'react';

interface LineChartProps {
  chartData: { name: string; data: number[] }[];
  chartOptions: ApexOptions;
}

const LineChart: FC<LineChartProps> = ({ chartData, chartOptions }) => {
  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    setOptions({
      chart: {
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [],
        labels: {
          style: {
            colors: '#c8cfca',
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
          style: {
            colors: '#c8cfca',
            fontSize: '12px',
          },
        },
        axisTicks: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [],
        },
        colors: ['#4FD1C5'],
      },
      colors: ['#4FD1C5'],
      ...chartOptions,
    });
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={chartData}
      type='area'
      width='100%'
      height='100%'
    />
  );
};

export default LineChart;
