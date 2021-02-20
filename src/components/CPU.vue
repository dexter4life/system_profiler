<template>
  <div class="bg-white shadow rounded-lg">
    <div class="p-3">
      <div class="text-left font-semibold text-gray-700 mb-1 text-sm">
        Processor Info
      </div>
      <div class="flex flex-col text-xs">
        <div class="flex mb-1">
          <div class="font-semibold text-gray-500">Model:</div>
          <div class="text-gray-400 ml-1 text-xs">
            {{ model }} x {{ count }}
          </div>
        </div>
        <div class="flex flex-row mb-1">
          <div class="font-semibold text-gray-500">Speed:</div>
          <div class="text-gray-400 ml-1" :class="className">{{ speed }}%</div>
        </div>
        <div class="flex flex-row mb-1">
          <div class="font-semibold text-gray-500">Processes:</div>
          <div class="text-gray-400 ml-1">{{ processCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const { ipcRenderer } = require("electron");

export default {
  name: "cpu",
  mounted: function () {
    var self = this;
    ipcRenderer.on("cpu", function (event, args) {
      self.speed = args.percentage;
      self.model = args.model;
      self.count = args.count;
      if (self.speed > 30) {
        self.className = "text-yellow-400";
      } else if (self.speed > 70) {
        self.className = "text-red-500";
      } else {
        self.className = "text-gray-400";
      }
    });
    ipcRenderer.on("cpu-ex", function (event, args) {
      if( args.processCount){
        self.processCount = args.processCount;
      }
    });
  },
  methods: {},
  data: function () {
    return {
      processCount: 0,
      count: 0,
      model: "",
      speed: 0,
      className: "text-gray-400",
    };
  },
};
</script>

<style scoped>
#cpu {
  width: 100px;
  height: 100px;
}
</style>>