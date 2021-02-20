<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
    <div class="flex flex-row rounded shadow-sm bg-white">
      <div ref="chart" id="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
const { ipcRenderer } = require("electron");

export default {
  name: "CpuProcessPerformance",
  mounted: function () {
    var myChart = echarts.init(this.$refs.chart);
    var option;

    window.onresize = function () {
      myChart.resize();
    };

    option = {
      grid: {
        right: 10,
        left: 40,
        top: 20,
        bottom: 20,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
      },
      yAxis: {
        max: 100,
        min: 0,
        type: "value",
        axisLabel: {
          formatter: "{value}%",
        },
      },
      series: [
        {
          showSymbol: false,
          hoverAnimation: false,
          smooth: true,
          data: [],
          type: "line",
          areaStyle: {},
        },
      ],
    };

    option && myChart.setOption(option);

    ipcRenderer.on("cpu", function (event, args) {
      option.series[0].data.push(args.percentage);
      if (option.series[0].data.length >= 300) {
        option.series[0].data.shift();
      }
      myChart.setOption(option, true);
    });
  },
};
</script>

<style scoped>
#chart {
  width: 100%;
  height: 300px;
}
</style>