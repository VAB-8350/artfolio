'use client'

// External modules
import React from 'react'
import * as echarts from 'echarts'

export default function PaintForMonths({ data }) {

  React.useEffect(() => {

    const element = document.getElementById('paint-for-months')
    if (element) {

      const pie = echarts.init(element)


      pie.setOption({
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: (params) => {

            return `<div class='flex gap-2 items-center'><svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="#000000"  class="icon icon-tabler icons-tabler-filled icon-tabler-palette"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c5.498 0 10 4.002 10 9c0 1.351 -.6 2.64 -1.654 3.576c-1.03 .914 -2.412 1.424 -3.846 1.424h-2.516a1 1 0 0 0 -.5 1.875a1 1 0 0 1 .194 .14a2.3 2.3 0 0 1 -1.597 3.99l-.156 -.009l.068 .004l-.273 -.004c-5.3 -.146 -9.57 -4.416 -9.716 -9.716l-.004 -.28c0 -5.523 4.477 -10 10 -10m-3.5 6.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m8 0a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m-4 -3a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" /></svg><strong>${params.data} Pinturas</strong> agregadas en <strong>${params.name}</strong><br/></div>`

          }
        },
        xAxis: {
          type: 'category',
          data: data.date,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#333', // Cambia este color al que prefieras para las líneas de rejilla
              width: 1, // Opcional: ajusta el grosor de las líneas
              type: 'solid' // Opcional: tipo de línea (solid, dashed, etc.)
            }
          }
        },
        grid: {
          left: '5%',  // Ajusta el margen izquierdo
          right: '5%', // Ajusta el margen derecho
          top: '10%',  // Opcional: Ajusta el margen superior
          bottom: '10%' // Opcional: Ajusta el margen inferior
        },
        series: [
          {
            data: data.quantity,
            type: 'bar',
            barMaxWidth: '60px',
            itemStyle: {
              color: '#fff',
              borderRadius: 10
            }
          }
        ]
      })

      window.addEventListener('resize', () => graphResize(pie))

    }

    return () => window.removeEventListener('resize', () => null)

  }, [data])

  // Methods
  const graphResize = (graph) => {

    graph.resize()

  }

  return <div id='paint-for-months' style={{ width: '100%', height: '100%' }} />

}
