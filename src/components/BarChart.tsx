import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface CropYield {
  crop: string;
  averageYield: number;
}

interface BarChartProps {
  data: CropYield[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('bar-chart') as HTMLElement;
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: data.map(item => item.crop),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.map(item => item.averageYield),
          type: 'bar',
          color: '#4caf50',
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
    };
    myChart.setOption(option);
  }, [data]);

  // Inline CSS styling
  const chartStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '20px',
  };

  return <div id="bar-chart" style={chartStyle}></div>;
};

export default BarChart;