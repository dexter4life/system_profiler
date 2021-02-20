<template>
  <div class="bg-white shadow rounded-lg">
    <div class="p-3">
      <div class="text-left font-semibold text-gray-900 mb-1 text-sm">
        Network Information
      </div>
      <div class="flex flex-col text-sm">
        <div class="flex text-xs mb-1">
          <div class="text-gray-500 text-xs font-semibold mr-1">Interface:</div>
          <div class="text-gray-400 ml-1">
            {{ iface }}
          </div>
        </div>
        <div class="flex text-xs mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-gray-600 h-4 w-5 icon icon-tabler icon-tabler-link"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"
            ></path>
            <path
              d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"
            ></path>
          </svg>
          <div class="text-gray-400 ml-1">
            {{ connections }}
          </div>
        </div>
        <div class="flex text-xs mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-gray-600 h-4 w-5 icon icon-tabler icon-tabler-arrow-narrow-down"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="16" y1="15" x2="12" y2="19" />
            <line x1="8" y1="15" x2="12" y2="19" />
          </svg>

          <div class="text-gray-400 ml-1">
            {{ bytes }} bytes - {{ downTime }} mins
          </div>
        </div>
        <div class="flex text-xs mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-gray-600 h-4 w-5 icon icon-tabler icon-tabler-arrow-up"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="18" y1="11" x2="12" y2="5"></line>
            <line x1="6" y1="11" x2="12" y2="5"></line>
          </svg>
          <div class="text-gray-400 ml-1">
            {{ upBytes }} bytes - {{ upTime }} minutes
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
const moment = require("moment");

export default {
  name: "network",
  mounted: function () {
    var self = this;
    ipcRenderer.on("network-ex", function (event, args) {
      if (args.connections) {
        self.connections = args.connections;
      }
      if (args.networkStats) {
        self.bytes = args.networkStats[0].rx_bytes;
        self.upBytes = args.networkStats[0].tx_bytes;
        self.iface = args.networkStats[0].iface;
        self.downTime = moment.duration(args.networkStats[0].rx_sec,"seconds").minutes();
        self.upTime = moment.duration(args.networkStats[0].tx_sec,'seconds').minutes();
      }
    });
  },
  data() {
    return {
      connections: 0,
      bytes: 0,
      upBytes: 0,
      iface: "",
      downTime: 0,
      upTime: 0,
    };
  },
};
</script>