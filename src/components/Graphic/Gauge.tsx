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
        // Capa de sombra interna
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          radius: '95%', // Radio menor para crear el efecto de sombra dentro
          pointer: { show: false },
          progress: { show: false }, // Sin progreso, solo para la sombra
          axisLine: {
            lineStyle: {
              width: 20,
              color: [[1, 'rgba(187, 134, 252, 0.2)']], // Color semitransparente
              shadowBlur: 12,
              opacity: 0.4,
              shadowColor: '#BB86FC',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false }
        },
        // Capa principal con progreso
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
            width: 4,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#BB86FC' }, // Color inicial
                { offset: 1, color: '#6300DC' }  // Color final
              ]),
            },
          },
          radius: '100%',
          axisLine: {
            lineStyle: {
              width: 20,
              color: [[1, '#FAF8F8']], // Reduce el ancho del indicador para mejor visualización en espacios pequeños
            }
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
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
                formatter: `${result.toFixed(0)}%`
              }
            }
          ],
          detail: {
            width: 25,
            height: 20,
            fontSize: 15,
            color: 'black',
            fontFamily: 'Poppins',
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
