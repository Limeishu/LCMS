<template>
  <div id="home">
    <Loader v-if="!analysisData" />
    <div class="analystic" v-if="analysisData">
      <div class="date-tag">
        <span>{{ new Date((new Date() - 7 * 60 * 60 * 24 * 1000)).toLocaleDateString() }}</span> ~
        <span>{{ new Date().toLocaleDateString() }}</span>
      </div>
      <h1>總覽</h1>
      <div class="head">
        <div class="block">
          <span>瀏覽量</span>
          <h1>{{ analysisData.totals[0].values[0] }}
            <span>次</span>
          </h1>
          <p>
            <font-awesome-icon :icon="['fas', analysisData.totals[0].values[0] > analysisData.totals[1].values[0] ? 'arrow-up' : 'arrow-down']"
            /> {{ Math.abs(analysisData.totals[1].values[0] - analysisData.totals[0].values[0]) }}
          </p>
        </div>
        <div class="block">
          <span>訪客</span>
          <h1>{{ analysisData.totals[0].values[1] }}
            <span>人</span>
          </h1>
          <p>
            <font-awesome-icon :icon="['fas', analysisData.totals[0].values[1] > analysisData.totals[1].values[1] ? 'arrow-up' : 'arrow-down']"
            /> {{ Math.abs(analysisData.totals[1].values[1] - analysisData.totals[0].values[1]) }}
          </p>
        </div>
        <div class="block">
          <span>新訪客</span>
          <h1>{{ analysisData.totals[0].values[2] }}
            <span>人</span>
          </h1>
          <p>
            <font-awesome-icon :icon="['fas', analysisData.totals[0].values[2] > analysisData.totals[1].values[2] ? 'arrow-up' : 'arrow-down']"
            /> {{ Math.abs(analysisData.totals[1].values[2] - analysisData.totals[0].values[2]) }}
          </p>
        </div>
        <div class="block">
          <span>工作階段</span>
          <h1>{{ analysisData.totals[0].values[3] }}
            <span>個</span>
          </h1>
          <p>
            <font-awesome-icon :icon="['fas', analysisData.totals[0].values[3] > analysisData.totals[1].values[3] ? 'arrow-up' : 'arrow-down']"
            /> {{ Math.abs(analysisData.totals[1].values[3] - analysisData.totals[0].values[3]) }}
          </p>
        </div>
        <div class="block">
          <span>平均停留時間</span>
          <h1>{{ (analysisData.totals[0].values[4] / analysisData.totals[0].values[3] / 60).toFixed(1) }}
            <span>分鐘</span>
          </h1>
          <p>
            <font-awesome-icon :icon="['fas', analysisData.totals[0].values[4] / analysisData.totals[0].values[3] > analysisData.totals[1].values[4] / analysisData.totals[1].values[3] ? 'arrow-up' : 'arrow-down']"
            /> {{ Math.abs((analysisData.totals[0].values[4] / analysisData.totals[0].values[3] - analysisData.totals[1].values[4]
            / analysisData.totals[1].values[3]) / 60).toFixed(1) }}
          </p>
        </div>
      </div>
      <h1>統計資料</h1>
      <div class="list-container">
        <div class="list head">
          <p class="title">頁面標題</p>
          <p v-for="i in 4" :key="i" @click="selected = i, sortData(i-1)" :class="{ 'active': selected === i }">
            <span class="icon">
              <font-awesome-icon icon="angle-down" />
            </span>
            <span>{{ option[i-1] }}</span>
          </p>
          <p>平均停留時間</p>
        </div>
        <div class="list" v-for="(item, i) in analysisData.rows" :key="i">
          <p class="title">{{ item.dimensions[0] }}</p>
          <p v-for="j in 4" :key="j">{{ item.metrics[0].values[j-1] }}</p>
          <p>{{ (item.metrics[0].values[4] / item.metrics[0].values[3] / 60).toFixed(0) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from '@/components/layout'
export default {
  components: {
    Loader
  },
  data () {
    return {
      analysisData: '',
      selected: 1,
      option: [
        '瀏覽量',
        '訪客',
        '新訪客',
        '工作階段',
        '平均停留時間'
      ]
    }
  },
  mounted () {
    this.gapi()
  },
  methods: {
    async gapi () {
      let gapi = await this.$getGapiClient()
      let res = await gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [
            {
              viewId: '147916397',
              dateRanges: [
                {
                  startDate: '7daysAgo',
                  endDate: 'today'
                },
                {
                  startDate: '14daysAgo',
                  endDate: '7daysAgo'
                }
              ],
              metrics: [
                { expression: 'ga:pageviews' },
                { expression: 'ga:users' },
                { expression: 'ga:newUsers' },
                { expression: 'ga:sessions' },
                { expression: 'ga:sessionDuration' }
              ],
              dimensions:
              [
                { name: 'ga:pageTitle' }
              ]
            }
          ]
        }
      })
      this.analysisData = await JSON.parse(res.body).reports[0].data
      this.sortData(this.selected)
    },
    sortData (i) {
      this.analysisData.rows.sort((a, b) => { return a.metrics[0].values[i] - b.metrics[0].values[i] }).reverse()
    }
  }
}
</script>