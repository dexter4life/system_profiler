<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <div class="flex-1 overflow-auto focus:outline-none" tabindex="0">
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <div class="mt-8">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>
            <div
              class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3"
            >
              <cpu></cpu>
              <memory></memory>
              <network></network>
            </div>
          </div>
        </div>
        <cpu-process-performance></cpu-process-performance>
        <process-table></process-table>
      </main>
    </div>
  </div>
</template>

<script>
import cpu from "./components/CPU.vue";
import Memory from "./components/Memory.vue";
import Network from "./components/Network.vue";
import CpuProcessPerformance from "./components/CpuProcessPerformance";
import ProcessTable from './components/ProcessTable.vue';

export default {
  name: "App",
  components: {
    cpu,
    Memory,
    Network,
    CpuProcessPerformance,
    ProcessTable,
  },
};

cpu;
Memory;
ProcessTable;
Network;
CpuProcessPerformance;
</script>

