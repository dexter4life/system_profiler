<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    PID
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CPU
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Started
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    memRss
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="process in processes" :key="process.pid">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900"
                  >
                    {{ process.pid }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {{ roundTo(process.cpu, 2) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {{ process.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {{ process.started }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-xs font-medium"
                  >
                    {{ process.memRss }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");
var Decimal = require('decimal.js');

export default {
  name: "ProcessTable",
  mounted: function () {
    var self = this;
    ipcRenderer.on("cpu-ex", function (event, args) {
      if (args.processData) {
        self.processes = args.processData.list;
      }
    });
  },
  data: function () {
    return {
      processes: [],
    };
  },
  methods: {
    roundTo: function (num, decimalPlaces = 0) {
      return new Decimal(num).toDecimalPlaces(decimalPlaces).toNumber();
    },
  },
};
</script>