'use client'

// External modules
import React from 'react'
import * as echarts from 'echarts'

export default function AvailablesReviews({ quantity, maxReviews }) {

  React.useEffect(() => {

    const element = document.getElementById('pie-graph')
    if (element) {

      const pie = echarts.init(element)

      pie.setOption({
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: (params) => {
            return `<div class='flex gap-2 items-center'><svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.192 17.966c-3.242 -.28 -5.972 -2.269 -8.192 -5.966c2.4 -4 5.4 -6 9 -6c3.326 0 6.14 1.707 8.442 5.122" /><path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" /></svg><strong>${params.data.value}</strong> Reviews <strong>${params.data.name}</strong><br/></div>`
          }
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: '#fff',
          }
        },
        series: [
          {
            name: 'Reviews',
            type: 'pie',
            radius: ['70%', '110%'],
            center: ['50%', '90%'],
            // adjust the start and end angle
            startAngle: 180,
            padAngle: 2,
            endAngle: 360,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              color: '#fff',
            },
            data: [
              { value: quantity, name: 'Consumidas', itemStyle: { color: '#fff' } },
              { value: (maxReviews - quantity), name: 'Disponibles', itemStyle: { color: '#444' } },
            ]
          }
        ]
      })

      window.addEventListener('resize', () => graphResize(pie))

    }

    return () => window.removeEventListener('resize', () => null)

  }, [quantity, maxReviews])

  // Methods
  const graphResize = (graph) => {

    graph.resize()

  }

  return <div id='pie-graph' style={{ width: '100%', height: '100%' }} />

}
