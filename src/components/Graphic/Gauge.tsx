import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

type GaugeChartProps = {
    value: number;
    comparisonValue: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, comparisonValue }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    let result = (value / comparisonValue) * 100;

    const option: EChartsOption = {
      backgroundColor: 'transparent',
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          max: comparisonValue,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 10 // Reduce el ancho del indicador para mejor visualización en espacios pequeños
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
        data: [
            {
            value: value,
            name: '',
            title: {
                offsetCenter: ['0%', '-10%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '-10%'],
                formatter: `${result.toFixed(2)}%`
                }
            }
          ],
          detail: {
            width: 25,
            height: 20,
            fontSize: 15,
            color: 'inherit',
          }
        }
      ]
    };

    myChart.setOption(option);


    return () => {
      myChart.dispose();
    };
  }, [value, comparisonValue]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '120px', // Ajusta el ancho para que encaje en la card
        height: '120px', // Ajusta la altura para que sea cuadrado
        margin: '0 auto' // Centra el gráfico dentro del div
      }}
    />
  );
};

export default GaugeChart;
