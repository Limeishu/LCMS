<template>
  <div>
    <div class="server-container">
      <h2>概覽</h2>
      <div class="server-list">
        <div class="container" v-for="(item, i) in serverState" :key="i">
          <div class="box-icon" @click="choosedState === 'cpu' ? choosedState = 'memory' : choosedState = 'cpu'">
            <div class="box-info" v-if="choosedState === 'cpu'">
              <p>CPU</p>
              <h1>{{ (item[item.length - 1].cpu['1s'].reduce((a,b) => a + b, 0) / item[item.length - 1].cpu['1s'].length * 100).toFixed(1) }}<span>%</span></h1>
            </div>
            <div class="box-info" v-else>
              <p>MEM</p>
              <h1>{{ (100 - (item[item.length - 1].memory.system.free / item[item.length - 1].memory.system.total * 100)).toFixed(1) }}<span>%</span></h1>
            </div>
          </div>
          <div class="info">
            <h1>{{ serverList[i].name }}</h1>
            <p>IP: {{ serverList[i].ip }}</p>
          </div>
          <div class="cpu-chart-container" v-if="item[item.length - 1] && choosedState === 'cpu'">
            <div class="cpu-chart" v-for="(usage, index) in item[item.length - 1].cpu['1s']" :key="index">
              <div class="state" :style="{ 'transform': `translateX(-${100 - usage * 100}%)`}"></div>
            </div>
          </div>
          <div class="mem-chart-container" v-else>
            <div class="mem-chart">
              <div class="state" :style="{ 'transform': `translateX(-${(item[item.length - 1].memory.system.free / item[item.length - 1].memory.system.total * 100).toFixed(2)}%)`}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="server-container">
      <h2>儲存空間使用狀態</h2>
      <line-chart :chart-data="dataCollection" :options="chartOptions" :styles="chartStyle"></line-chart>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import LineChart from '../components/layout/lineChart'
  import config from '../../server/config.json'
  export default {
    data () {
      return {
        serverList: config.serverList,
        serverState: [],
        serverStateLiveGetter: null,
        choosedState: 'cpu',
        dataCollection: null,
        chartOptions: {
          scales: {
            xAxes: [{
              gridLines: {
                color: 'rgba(128, 128, 128, .2)'
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: null,
                stepSize: 5,
                callback: (label, index, lables) => {
                  return `${label} TB`
                }
              },
              gridLines: {
                color: 'rgba(128, 128, 128, .2)'
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false
        },
        chartStyle: {
          height: '400px',
          position: 'relative'
        }
      }
    },
    components: {
      LineChart
    },
    computed: {
      ...mapGetters(['storageUsage', 'theme', 'themeList'])
    },
    mounted () {
      this.serverState = Array.apply(null, {length: this.serverList.length}).map(e => [])
      this.serverStateLiveGetter = setInterval(() => {
        this.serverList.forEach(async (ele, index) => {
          let data = await this.getServerState(ele.api)
          this.serverState[index].push(data)
        })
      }, 1000)
      this.renderChart()
    },
    methods: {
      ...mapActions(['getStorageUsage']),

      async getServerState (api) {
        let res = await this.$http.get(api)
        return res.data
      },

      async renderChart () {
        await this.getStorageUsage()
        this.chartOptions.scales.yAxes[0].ticks.max = Math.max(...this.storageUsage.map(e => (e.size / 1000000000000).toFixed(2))) + 5
        let themeColorHex = this.themeList.filter(e => e.className === this.theme)[0].colorSets.tone
        let themeColorRGB = this.colorHexConvert(themeColorHex)
        const chartData = {
          labels: [...this.storageUsage.map(e => new Date(e.date).toLocaleDateString())],
          datasets: [
            {
              label: 'Disk Usage',
              data: [...this.storageUsage.map(e => ((e.size - e.free) / 1000000000000).toFixed(2))],
              borderColor: themeColorHex,
              backgroundColor: this.generateGradientColor(`${themeColorRGB.r}, ${themeColorRGB.g}, ${themeColorRGB.b}`, 0.8)
            },
            {
              label: 'Capacity',
              data: [...this.storageUsage.map(e => (e.size / 1000000000000).toFixed(2))],
              borderColor: '#999999',
              backgroundColor: this.generateGradientColor(`153, 153, 153`, 0.2)
            }
          ]
        }
        this.dataCollection = chartData
      },

      colorHexConvert (hexColor) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
        return {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      },

      generateGradientColor (color, alpha) {
        let ctx = document.createElement('canvas').getContext('2d')
        let gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, `rgba(${color}, ${alpha})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)
        return gradient
      }
    },
    beforeDestroy () {
      clearInterval(this.serverStateLiveGetter)
    }
  }
</script>