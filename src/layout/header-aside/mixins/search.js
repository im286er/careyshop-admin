import { mapState, mapMutations } from 'vuex'
import hotkeys from 'hotkeys-js'

export default {
  components: {
    'cs-panel-search': () => import('../components/panel-search')
  },
  mounted() {
    // 绑定搜索功能快捷键 [ 打开 ]
    hotkeys(this.searchHotkey.open, event => {
      event.preventDefault()
      this.searchPanelOpen()
    })
    // 绑定搜索功能快捷键 [ 关闭 ]
    hotkeys(this.searchHotkey.close, event => {
      event.preventDefault()
      this.searchPanelClose()
    })
  },
  beforeDestroy() {
    hotkeys.unbind(this.searchHotkey.open)
    hotkeys.unbind(this.searchHotkey.close)
  },
  computed: {
    ...mapState('careyshop', {
      searchActive: state => state.search.active,
      searchHotkey: state => state.search.hotkey
    })
  },
  methods: {
    ...mapMutations({
      searchToggle: 'careyshop/search/toggle',
      searchSet: 'careyshop/search/set'
    }),
    /**
     * 接收点击搜索按钮
     */
    handleSearchClick() {
      this.searchToggle()
      if (this.searchActive) {
        this.$refs.panelSearch.focus()
      }
    },
    /**
     * 打开搜索面板
     */
    searchPanelOpen() {
      if (!this.searchActive) {
        this.searchSet(true)
        this.$refs.panelSearch.focus()
      }
    },
    // 关闭搜索面板
    searchPanelClose() {
      if (this.searchActive) {
        this.searchSet(false)
      }
    }
  }
}