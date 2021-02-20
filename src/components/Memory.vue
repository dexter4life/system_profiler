<template>
  <div class="bg-white shadow rounded-lg">
    <div class="p-3">
      <div class="text-left font-semibold text-gray-700 mb-1 text-sm">
        Memory Info
      </div>
      <div class="flex flex-col text-xs">
        <div class="flex mb-1">
          <div class="font-semibold text-gray-500">Available:</div>
          <div class="text-gray-400 ml-1 text-xs">
            {{ available }} gigabytes
          </div>
        </div>
        <div class="flex flex-row mb-1">
          <div class="font-semibold text-gray-500">Used:</div>
          <div class="text-gray-400 ml-1">{{ used }} gigabytes</div>
        </div>
        <div class="flex flex-row mb-1">
          <div class="font-semibold text-gray-500">Total:</div>
          <div class="text-gray-400 ml-1">{{ total }} gigabytes</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
const {convert} = require('convert');

export default {
  name: "memory",
  mounted: function () {
    var self = this;
    ipcRenderer.on("memory", function (event, args) {
      self.available = Math.round(convert(args.available).from('bytes').to('gigabytes'));
      self.used = Math.round(convert(args.used).from('bytes').to('gigabytes'));
      self.total = Math.round(convert(args.total).from('bytes').to('gigabytes'));
    });
  },
  data: function () {
    return {
      available: 0,
      used: 0,
      total: 0,
    };
  },
};
</script>