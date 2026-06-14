<template>
  <div class="geo-learning">
    <!-- ============ HERO ============ -->
    <header class="hero">
      <h1>Geolocation API · 浏览器地理定位</h1>
      <p class="hero-sub">navigator.geolocation 全解析 · 交互式 Demo · 面试高频考点</p>
    </header>

    <!-- ============ TOC ============ -->
    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 什么是 Geolocation API -->
    <!-- ============================================================ -->
    <section id="s1-intro" class="section-card">
      <h2 class="s-title">一、什么是 Geolocation API</h2>
      <p class="s-desc">
        <code>navigator.geolocation</code> 是浏览器提供的<strong>地理位置访问接口</strong>，允许 Web 应用在用户授权后获取设备的物理位置信息。
        它通过 GPS、Wi-Fi 定位、基站定位等方式计算坐标，是现代 LBS（基于位置的服务）应用的基础。
      </p>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">🌐</div>
          <div class="info-content">
            <strong>W3C 标准</strong>
            <span>Geolocation API 是 W3C 推荐标准，所有现代浏览器均支持</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">🔒</div>
          <div class="info-content">
            <strong>HTTPS 要求</strong>
            <span>出于隐私考虑，大部分浏览器要求页面在 HTTPS 环境下才能调用定位</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">📱</div>
          <div class="info-content">
            <strong>多源定位</strong>
            <span>设备自动选择最佳定位方式：GPS（最准）、Wi-Fi（次准）、基站（城市级）</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon">⚠️</div>
          <div class="info-content">
            <strong>用户授权</strong>
            <span>浏览器会弹出权限请求，用户拒绝则无法获取位置</span>
          </div>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：Geolocation API 的核心方法是 <code>getCurrentPosition()</code>、<code>watchPosition()</code> 和 <code>clearWatch()</code>，均挂在 <code>navigator.geolocation</code> 对象上。判断浏览器是否支持：<code>'geolocation' in navigator</code>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: getCurrentPosition 获取当前位置 -->
    <!-- ============================================================ -->
    <section id="s2-get" class="section-card">
      <h2 class="s-title">二、getCurrentPosition() — 获取单次位置</h2>
      <p class="s-desc">
        最常用的定位方法。调用后浏览器请求权限，获取到位置后通过回调返回 <code>GeolocationPosition</code> 对象。
      </p>

      <div class="demo-area">
        <div class="demo-label">📍 交互 Demo：点击获取你的位置</div>
        <div class="geo-controls">
          <button class="ctrl-btn primary" @click="getLocation" :disabled="loading">
            {{ loading ? '定位中...' : '获取我的位置' }}
          </button>
          <button class="ctrl-btn" @click="clearResult">清除</button>
        </div>

        <div v-if="result" class="geo-result">
          <div class="result-row">
            <span class="result-key">纬度</span>
            <span class="result-val">{{ result.lat }}</span>
          </div>
          <div class="result-row">
            <span class="result-key">经度</span>
            <span class="result-val">{{ result.lng }}</span>
          </div>
          <div class="result-row">
            <span class="result-key">精度</span>
            <span class="result-val">{{ result.accuracy }} 米</span>
          </div>
          <div class="result-row" v-if="result.altitude !== null">
            <span class="result-key">海拔</span>
            <span class="result-val">{{ result.altitude }} 米</span>
          </div>
        </div>

        <p class="geo-error" v-if="error">{{ error }}</p>
        <p class="geo-hint" v-else-if="!result">点击按钮获取位置信息，浏览器会弹出权限请求</p>
      </div>

      <pre class="code-block"><code v-text="getCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<code>getCurrentPosition</code> 是异步的，不会阻塞主线程。它接受三个参数——成功回调、失败回调、配置对象。第三个参数（配置）是面试常考点，详见第四节
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: watchPosition 持续定位 -->
    <!-- ============================================================ -->
    <section id="s3-watch" class="section-card">
      <h2 class="s-title">三、watchPosition() — 持续跟踪位置</h2>
      <p class="s-desc">
        与 <code>getCurrentPosition</code> 参数相同，但会<strong>持续监听</strong>位置变化，适用于导航、运动轨迹等场景。
        返回一个 watchId，用于 <code>clearWatch()</code> 停止监听。
      </p>

      <div class="demo-area">
        <div class="demo-label">🔄 交互 Demo：持续跟踪位置变化</div>

        <div class="geo-controls">
          <button
            class="ctrl-btn primary"
            @click="startWatching"
            :disabled="watching || watchLoading"
          >
            {{ watchLoading ? '启动中...' : '开始跟踪' }}
          </button>
          <button class="ctrl-btn danger" @click="stopWatching" :disabled="!watching">
            停止跟踪
          </button>
        </div>

        <div v-if="watchLogs.length" class="watch-log">
          <div class="watch-log-header">
            <span>位置记录（{{ watchLogs.length }} 次）</span>
            <button class="ctrl-btn sm" @click="clearWatchLogs">清空</button>
          </div>
          <div class="watch-log-list">
            <div v-for="(log, idx) in watchLogs" :key="idx" class="watch-log-item">
              <span class="wl-idx">#{{ idx + 1 }}</span>
              <span class="wl-coords">{{ log.lat }}, {{ log.lng }}</span>
              <span class="wl-acc">±{{ log.accuracy }}m</span>
              <span class="wl-time">{{ log.time }}</span>
            </div>
          </div>
        </div>
        <p class="geo-hint" v-else>点击"开始跟踪"后移动设备（或在开发者工具中模拟位置变化）</p>
      </div>

      <pre class="code-block"><code v-text="watchCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<code>watchPosition</code> 和 <code>getCurrentPosition</code> 的配置参数完全一致。要停止监听必须保存并传入 <code>watchId</code>。如果只调用一次但想节省电量，用 <code>getCurrentPosition</code> 而非 <code>watchPosition</code>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 定位配置项详解 -->
    <!-- ============================================================ -->
    <section id="s4-config" class="section-card">
      <h2 class="s-title">四、PositionOptions — 定位配置项（面试高频）</h2>
      <p class="s-desc">
        第三个参数 <code>PositionOptions</code> 对象控制定位行为，三个配置项的权衡是面试必考内容。
      </p>

      <div class="config-compare">
        <div class="config-card" v-for="cfg in configs" :key="cfg.key">
          <div class="config-key">{{ cfg.key }}</div>
          <div class="config-type">{{ cfg.type }}</div>
          <div class="config-desc">{{ cfg.desc }}</div>
          <div class="config-example">
            <strong>默认值：</strong><code>{{ cfg.default }}</code>
          </div>
          <div class="config-note">{{ cfg.note }}</div>
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-label">⚙️ 配置组合实验</div>
        <p class="s-desc" style="margin-bottom:0.8rem;">调整下面的参数，观察定位行为差异</p>

        <div class="config-form">
          <label class="config-field">
            <span>高精度模式（enableHighAccuracy）</span>
            <select v-model="opts.enableHighAccuracy">
              <option :value="false">关闭（默认，省电）</option>
              <option :value="true">开启（更准但更慢）</option>
            </select>
          </label>
          <label class="config-field">
            <span>超时时间（timeout）</span>
            <select v-model="opts.timeout">
              <option :value="3000">3 秒（快速）</option>
              <option :value="10000">10 秒（默认）</option>
              <option :value="30000">30 秒（宽松）</option>
              <option :value="Infinity">不限（Infinity）</option>
            </select>
          </label>
          <label class="config-field">
            <span>缓存有效期（maximumAge）</span>
            <select v-model="opts.maximumAge">
              <option :value="0">不使用缓存</option>
              <option :value="60000">1 分钟内缓存</option>
              <option :value="300000">5 分钟内缓存</option>
              <option :value="Infinity">无限缓存（Infinity）</option>
            </select>
          </label>
        </div>

        <button class="ctrl-btn primary" @click="getLocationWithOpts" :disabled="configLoading">
          {{ configLoading ? '定位中...' : '使用当前配置定位' }}
        </button>

        <div v-if="configResult" class="geo-result" style="margin-top:12px;">
          <div class="result-row">
            <span class="result-key">纬度</span>
            <span class="result-val">{{ configResult.lat }}</span>
          </div>
          <div class="result-row">
            <span class="result-key">经度</span>
            <span class="result-val">{{ configResult.lng }}</span>
          </div>
          <div class="result-row">
            <span class="result-key">精度</span>
            <span class="result-val">{{ configResult.accuracy }} 米</span>
          </div>
          <div class="result-row">
            <span class="result-key">耗时</span>
            <span class="result-val">{{ configResult.elapsed }}ms</span>
          </div>
        </div>
        <p class="geo-error" v-if="configError">{{ configError }}</p>
      </div>

      <pre class="code-block"><code v-text="optsCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<code>enableHighAccuracy: true</code> 会优先启用 GPS，但耗时更长、更耗电。实际项目中建议先快速获取低精度缓存（<code>maximumAge: 300000</code>）展示地图，再异步请求高精度坐标更新
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: 错误处理 -->
    <!-- ============================================================ -->
    <section id="s5-error" class="section-card">
      <h2 class="s-title">五、错误处理与边界情况</h2>
      <p class="s-desc">
        定位失败时会触发错误回调，返回 <code>GeolocationPositionError</code> 对象。错误码 <code>code</code> 属性标识失败原因。
      </p>

      <div class="err-table-wrapper">
        <table class="err-table">
          <thead>
            <tr>
              <th style="width:60px;">code</th>
              <th style="width:130px;">常量</th>
              <th>含义</th>
              <th>常见原因</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in errors" :key="e.code">
              <td><code>{{ e.code }}</code></td>
              <td><code>{{ e.constant }}</code></td>
              <td>{{ e.meaning }}</td>
              <td class="err-cause">{{ e.cause }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：部分浏览器（如 Chrome）不允许 <code>http://</code> 页面使用 Geolocation API。开发时可以用 <code>localhost</code> 或配置本地 HTTPS。同源策略对 Geolocation API 无影响，因为它是浏览器内置 API
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 6: 隐私权限 -->
    <!-- ============================================================ -->
    <section id="s6-privacy" class="section-card">
      <h2 class="s-title">六、隐私与权限机制</h2>
      <p class="s-desc">
        浏览器对地理位置权限有严格管理，了解权限机制有助于设计更好的用户体验。
      </p>

      <div class="privacy-flow">
        <div class="privacy-step">
          <div class="ps-num">1</div>
          <div class="ps-content">
            <strong>请求权限</strong>
            <span>调用 <code>getCurrentPosition</code> 或 <code>watchPosition</code> 时，浏览器弹出权限提示框</span>
          </div>
        </div>
        <div class="privacy-arrow">↓</div>
        <div class="privacy-step">
          <div class="ps-num">2</div>
          <div class="ps-content">
            <strong>用户选择</strong>
            <span>
              ✅ 允许 → 进入成功回调<br>
              ❌ 阻止 → 进入错误回调，<code>error.code === 1</code>（PERMISSION_DENIED）
            </span>
          </div>
        </div>
        <div class="privacy-arrow">↓</div>
        <div class="privacy-step">
          <div class="ps-num">3</div>
          <div class="ps-content">
            <strong>权限持久化</strong>
            <span>用户的选择会被浏览器记住，可通过浏览器设置 > 隐私与安全 > 网站设置 > 位置 修改</span>
          </div>
        </div>
      </div>

      <details class="perms-api-detail">
        <summary>🔐 Permissions API 检测定位权限（进阶）</summary>
        <p>在调用定位前，可以用 <code>navigator.permissions.query({ name: 'geolocation' })</code> 预检测权限状态。返回 <code>granted</code>、<code>denied</code> 或 <code>prompt</code>，可用于提前调整 UI。</p>
        <pre class="code-block" style="margin-top:8px;"><code>const status = await navigator.permissions.query({ name: 'geolocation' })
// status.state === 'granted' | 'denied' | 'prompt'</code></pre>
      </details>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：iOS 和 Android 上地理位置权限在 App 级别和浏览器级别分别管理。部分浏览器还有"仅在使用中允许"和"始终允许"的区分。权限被拒绝后不会自动重新请求，需要用户手动去浏览器设置中解除
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 7: Geoposition 对象详解 -->
    <!-- ============================================================ -->
    <section id="s7-props" class="section-card">
      <h2 class="s-title">七、GeolocationPosition 对象属性</h2>
      <p class="s-desc">
        成功回调中收到的 <code>GeolocationPosition</code> 对象包含位置坐标和时间戳。其中 <code>coords</code> 属性携带所有位置数据。
      </p>

      <div class="props-table-wrapper">
        <table class="props-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>类型</th>
              <th>说明</th>
              <th>可能值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in positionProps" :key="p.prop">
              <td><code>{{ p.prop }}</code></td>
              <td>{{ p.type }}</td>
              <td>{{ p.desc }}</td>
              <td class="err-cause">{{ p.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：面试常问"除了经纬度还能拿到什么"——<code>altitude</code>（海拔）、<code>heading</code>（方向/航向角，需移动中）、<code>speed</code>（速度，需移动中）。静止设备上 heading 和 speed 为 <code>null</code>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 8: 应用场景 -->
    <!-- ============================================================ -->
    <section id="s8-usage" class="section-card">
      <h2 class="s-title">八、经典应用场景</h2>

      <div class="usage-grid">
        <div class="usage-card" v-for="u in usages" :key="u.title">
          <div class="usage-icon">{{ u.icon }}</div>
          <div class="usage-title">{{ u.title }}</div>
          <div class="usage-desc">{{ u.desc }}</div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 9: 面试问答 -->
    <!-- ============================================================ -->
    <section id="s9-qa" class="section-card">
      <h2 class="s-title">九、面试高频问答（⭐→⭐⭐⭐）</h2>
      <p class="s-desc">点击问题展开答案，先思考再看解析。</p>

      <div class="qa-list">
        <div
          v-for="(item, idx) in geoQuestions"
          :key="idx"
          class="qa-item"
          :class="{ 'qa-open': openIdx === idx }"
        >
          <button class="qa-question" @click="openIdx = openIdx === idx ? -1 : idx">
            <span class="qa-level" :class="'qa-lv' + item.level">{{ '⭐'.repeat(item.level) }}</span>
            <span class="qa-text">{{ item.q }}</span>
            <span class="qa-arrow">{{ openIdx === idx ? '▾' : '▸' }}</span>
          </button>
          <div class="qa-answer" v-if="openIdx === idx">
            <div class="qa-answer-inner" v-html="item.a"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Footer -->
    <!-- ============================================================ -->
    <footer class="page-footer">
      <p>💪 掌握以上内容，你就能从容应对前端定位相关的面试与开发需求</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// ─── TOC ───
const toc = [
  { id: 's1-intro',   label: 'API 简介' },
  { id: 's2-get',     label: '单次定位' },
  { id: 's3-watch',   label: '持续跟踪' },
  { id: 's4-config',  label: '配置项' },
  { id: 's5-error',   label: '错误处理' },
  { id: 's6-privacy', label: '隐私权限' },
  { id: 's7-props',   label: '属性详解' },
  { id: 's8-usage',   label: '应用场景' },
  { id: 's9-qa',      label: '面试问答' },
]

// ─── Section 1 ───

// ─── Section 2: getCurrentPosition ───
const loading = ref(false)
const result = ref<{
  lat: number
  lng: number
  accuracy: number
  altitude: number | null
} | null>(null)
const error = ref('')

const getLocation = () => {
  if (!('geolocation' in navigator)) {
    error.value = '当前浏览器不支持 Geolocation API'
    return
  }

  loading.value = true
  result.value = null
  error.value = ''

  navigator.geolocation.getCurrentPosition(
    (res) => {
      loading.value = false
      result.value = {
        lat: Number(res.coords.latitude.toFixed(6)),
        lng: Number(res.coords.longitude.toFixed(6)),
        accuracy: Math.round(res.coords.accuracy),
        altitude: res.coords.altitude !== null ? Number(res.coords.altitude.toFixed(1)) : null,
      }
    },
    (err) => {
      loading.value = false
      error.value = formatError(err)
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
  )
}

const clearResult = () => {
  result.value = null
  error.value = ''
}

const getCode = `// 基本用法
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords
    console.log(\`纬度: \${latitude}, 经度: \${longitude}, 精度: \${accuracy}米\`)
  },
  (error) => {
    console.error(\`定位失败: \${error.message}\`)
  },
  {
    enableHighAccuracy: false,  // 高精度模式（耗电）
    timeout: 10000,              // 超时时间 10s
    maximumAge: 0                // 不使用缓存
  }
)`

// ─── Section 3: watchPosition ───
// TODO: 当 watchPosition 获取到新位置时，在界面上实时更新位置信息
// 提示：将 watchResult 绑定到模板中（类似 section2 的 geo-result），显示实时坐标
const watching = ref(false)
const watchLoading = ref(false)
const watchId = ref<number | null>(null)
const watchLogs = ref<Array<{ lat: string; lng: string; accuracy: string; time: string }>>([])

const startWatching = () => {
  if (!('geolocation' in navigator)) {
    error.value = '当前浏览器不支持 Geolocation API'
    return
  }

  watchLoading.value = true
  const id = navigator.geolocation.watchPosition(
    (res) => {
      watchLoading.value = false
      watching.value = true
      watchLogs.value.push({
        lat: res.coords.latitude.toFixed(4),
        lng: res.coords.longitude.toFixed(4),
        accuracy: Math.round(res.coords.accuracy) + 'm',
        time: new Date().toLocaleTimeString(),
      })
    },
    (err) => {
      watchLoading.value = false
      watching.value = false
      error.value = 'watchPosition 错误: ' + formatError(err)
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  )
  watchId.value = id as unknown as number
}

const stopWatching = () => {
  if (watchId.value !== null) {
    navigator.geolocation.clearWatch(watchId.value)
    watchId.value = null
  }
  watching.value = false
  watchLoading.value = false
}

const clearWatchLogs = () => {
  watchLogs.value = []
}

const watchCode = `// 持续跟踪位置
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    // 每次位置变化时触发
    updateMap(position.coords.latitude, position.coords.longitude)
  },
  (error) => {
    console.error('跟踪失败:', error.message)
  },
  { enableHighAccuracy: true }
)

// 停止跟踪
navigator.geolocation.clearWatch(watchId)`

// ─── Section 4: Config demo ───
const opts = reactive({
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 0,
})
const configLoading = ref(false)
const configResult = ref<{
  lat: number
  lng: number
  accuracy: number
  elapsed: number
} | null>(null)
const configError = ref('')

const getLocationWithOpts = () => {
  if (!('geolocation' in navigator)) {
    configError.value = '当前浏览器不支持 Geolocation API'
    return
  }

  configLoading.value = true
  configResult.value = null
  configError.value = ''

  const start = performance.now()

  navigator.geolocation.getCurrentPosition(
    (res) => {
      configLoading.value = false
      configResult.value = {
        lat: Number(res.coords.latitude.toFixed(6)),
        lng: Number(res.coords.longitude.toFixed(6)),
        accuracy: Math.round(res.coords.accuracy),
        elapsed: Math.round(performance.now() - start),
      }
    },
    (err) => {
      configLoading.value = false
      configError.value = formatError(err)
    },
    {
      enableHighAccuracy: opts.enableHighAccuracy,
      timeout: opts.timeout === Infinity ? Infinity : opts.timeout,
      maximumAge: opts.maximumAge === Infinity ? Infinity : opts.maximumAge,
    }
  )
}

const configs = [
  {
    key: 'enableHighAccuracy',
    type: 'boolean',
    desc: '是否启用高精度模式。开启后优先使用 GPS，定位更精准但耗时更长、更耗电。',
    default: 'false',
    note: '💡 城市环境 false 足够，野外/导航场景建议 true',
  },
  {
    key: 'timeout',
    type: 'number (ms)',
    desc: '定位超时时间。超过此时间未获取到位置则触发错误回调（error.code === 3）。',
    default: 'Infinity',
    note: '💡 建议设为 5-10 秒，避免用户长时间等待。设为 Infinity 则永不超时',
  },
  {
    key: 'maximumAge',
    type: 'number (ms)',
    desc: '缓存过期时间。浏览器可以返回此时间内的缓存位置，减少定位耗时。',
    default: '0',
    note: '💡 设为 0 强制获取新位置；设为 Infinity 永远使用缓存（不请求新位置）',
  },
]

const optsCode = `const options = {
  enableHighAccuracy: false,  // GPS 关闭，Wi-Fi/基站定位
  timeout: 10000,              // 10 秒超时
  maximumAge: 60000,           // 可接受 1 分钟内缓存的位置
}

navigator.geolocation.getCurrentPosition(success, error, options)`

// ─── Section 5: Error codes ───
const formatError = (err: GeolocationPositionError): string => {
  const map: Record<number, string> = {
    1: '❌ 定位权限被拒绝。请在浏览器设置 > 隐私与安全 > 网站设置 > 位置 中开启权限后重试',
    2: '❌ 定位失败。设备无法获取位置信息（GPS 信号弱、无网络等）',
    3: '❌ 定位超时。请在网络环境更好的地方重试',
  }
  return map[err.code] || '❌ 未知错误'
}

const errors = [
  { code: 1, constant: 'PERMISSION_DENIED', meaning: '用户拒绝了定位权限', cause: '用户点了"阻止"、浏览器设置中禁用了定位、或 iOS/Android 系统权限未开启' },
  { code: 2, constant: 'POSITION_UNAVAILABLE', meaning: '无法获取位置信息', cause: 'GPS 信号弱、无 Wi-Fi/基站信号、飞行模式、设备定位功能关闭' },
  { code: 3, constant: 'TIMEOUT', meaning: '定位操作超时', cause: '网络延迟过高、GPS 搜星时间超过配置的 timeout、室内信号差' },
]

// ─── Section 7: Position props ───
const positionProps = [
  { prop: 'coords.latitude', type: 'number', desc: '纬度（WGS84 坐标系）', value: '-90 ~ 90' },
  { prop: 'coords.longitude', type: 'number', desc: '经度（WGS84 坐标系）', value: '-180 ~ 180' },
  { prop: 'coords.accuracy', type: 'number', desc: '经纬度精度（米）', value: '数值越小越准' },
  { prop: 'coords.altitude', type: 'number | null', desc: '海拔高度（米，WGS84）', value: '非 null 表示支持' },
  { prop: 'coords.altitudeAccuracy', type: 'number | null', desc: '海拔精度（米）', value: '通常为 null' },
  { prop: 'coords.heading', type: 'number | null', desc: '航向角（度，0=正北）', value: '移动中才有值' },
  { prop: 'coords.speed', type: 'number | null', desc: '速度（米/秒）', value: '移动中才有值' },
  { prop: 'timestamp', type: 'DOMTimeStamp', desc: '获取位置时的时间戳', value: 'Date.now()' },
]

// ─── Section 8: Usages ───
const usages = [
  { icon: '🗺️', title: '地图导航', desc: '获取用户当前位置，在地图上标注并提供路线规划' },
  { icon: '🌤️', title: '天气服务', desc: '根据位置显示当地天气和预报，自动定位无需手动输入城市' },
  { icon: '🏪', title: '附近搜索', desc: '查找附近的餐厅、加油站、医院等 POI 点' },
  { icon: '📸', title: '地理标记', desc: '在照片、笔记、社交动态中添加位置信息' },
  { icon: '🏃', title: '运动轨迹', desc: '利用 watchPosition 记录跑步/骑行的路线、距离、配速' },
  { icon: '🛡️', title: '安全验证', desc: '检测登录 IP 与定位是否一致，作为风控因素之一' },
]

// ─── Section 9: Interview Q&A ───
const openIdx = ref(-1)
const geoQuestions = [
  {
    level: 1,
    q: '如何判断浏览器是否支持 Geolocation API？',
    a: '最简单的方式：<code>if ("geolocation" in navigator) { /* 支持 */ }</code>。<br><br>所有现代浏览器（Chrome、Firefox、Safari、Edge）均支持。不支持的情况主要是旧版 IE（IE9 以下）或某些 WebView。'
  },
  {
    level: 1,
    q: 'Geolocation API 的三个核心方法是什么？',
    a: '① <code>getCurrentPosition(success, error?, options?)</code> — 获取单次位置<br>② <code>watchPosition(success, error?, options?)</code> — 持续监听位置变化<br>③ <code>clearWatch(watchId)</code> — 停止位置监听<br><br>三个方法都挂载在 <code>navigator.geolocation</code> 对象上。'
  },
  {
    level: 2,
    q: 'enableHighAccuracy: true 有什么优缺点？',
    a: '<strong>优点</strong>：定位精度更高（可达 10 米内），因为会优先启用 GPS。<br><br><strong>缺点</strong>：<br>① <strong>耗时长</strong> — GPS 搜星可能需要 10-30 秒<br>② <strong>耗电高</strong> — GPS 模块功耗远高于 Wi-Fi/基站定位<br>③ <strong>室内无效</strong> — GPS 在室内或高楼间信号差，可能超时失败<br><br><strong>建议</strong>：非导航场景默认 <code>false</code>，先快速返回低精度位置展示页面，再异步请求高精度坐标更新。'
  },
  {
    level: 2,
    q: 'watchPosition 和 getCurrentPosition 有什么区别？应用场景分别是什么？',
    a: '<strong>getCurrentPosition</strong>：获取<strong>一次</strong>位置后自动结束。适合"用户在哪里？"的单次查询场景，如显示当前位置、搜索附近商家。<br><br><strong>watchPosition</strong>：持续监听，位置变化时自动回调。返回一个 <code>watchId</code>。适合需要跟踪移动的场景，如导航中的实时位置更新、运动轨迹记录。<br><br>两者参数完全一致。停止 <code>watchPosition</code> 需要调用 <code>navigator.geolocation.clearWatch(watchId)</code>。'
  },
  {
    level: 2,
    q: 'Geolocation API 在 HTTP 和 HTTPS 下有什么区别？',
    a: '大多数现代浏览器（Chrome 50+、Firefox 55+、Safari 10+）<strong>只允许 HTTPS</strong> 页面使用 Geolocation API。<br><br><strong>例外情况</strong>：<br>① <code>localhost</code> 和 <code>127.0.0.1</code> 被视为安全上下文，HTTP 下可用<br>② 部分浏览器允许 file:// 协议<br>③ 旧版浏览器无此限制<br><br>这是 W3C 的 Secure Contexts 规范要求，不仅限于定位，Service Worker、Notifications API 等也有同样限制。'
  },
  {
    level: 3,
    q: '如何优雅地处理用户拒绝定位权限的情况？',
    a: '<strong>① 提前检测权限</strong>：用 <code>navigator.permissions.query({ name: "geolocation" })</code> 预检测权限状态，根据 <code>granted</code> / <code>denied</code> / <code>prompt</code> 调整 UI。<br><br><strong>② 降级方案</strong>：权限被拒后，提供手动输入位置的选项（搜索城市、选择地图点）。<br><br><strong>③ 引导开启</strong>：如果是 <code>denied</code>（之前选过"阻止"），浏览器不会再次弹窗。需要在 UI 中提示用户手动去<strong>浏览器设置 > 隐私与安全 > 网站设置 > 位置</strong>中开启。<br><br><strong>④ 不要反复弹窗</strong>：一旦确定为 denied，不要再调用 <code>getCurrentPosition</code>，否则只会触发错误回调。'
  },
  {
    level: 3,
    q: 'maximumAge 参数的实际应用策略是什么？',
    a: '<strong>策略核心</strong>：在及时性和省电/速度之间做权衡。<br><br><strong>按场景推荐</strong>：<br>① <code>maximumAge: 0</code> — 需要最新位置，比如导航、运动轨迹<br>② <code>maximumAge: 60000</code>（1 分钟）— 天气应用，位置不需要很精确<br>③ <code>maximumAge: 300000</code>（5 分钟）— 新闻/资讯，粗略城市级即可<br>④ <code>maximumAge: Infinity</code> — 只使用缓存，实际不发起定位请求<br><br><strong>进阶策略</strong>：先以 <code>maximumAge: 300000</code> 快速获取缓存展示地图，同时异步调用 <code>maximumAge: 0</code> 获取最新坐标后更新。'
  },
  {
    level: 3,
    q: '高精度模式下，有哪些因素可能导致定位失败？如何提高成功率？',
    a: '<strong>失败因素</strong>：<br>① 室内环境 — GPS 信号被建筑物遮挡<br>② 高楼密集区 — "城市峡谷"效应导致多径干扰<br>③ 隧道/地下停车场 — 完全无信号<br>④ 飞行模式或关闭定位服务<br>⑤ timeout 设置过短（GPS 搜星可能需要 20-30 秒）<br><br><strong>提高成功率的策略</strong>：<br>① 设置合理的 timeout（15-30 秒）<br>② 先 <code>enableHighAccuracy: false</code> 快速兜底，再尝试高精度<br>③ 监听 <code>watchPosition</code> 而不是单次 <code>getCurrentPosition</code>，给 GPS 更多时间<br>④ 降级方案：检测到 POSITION_UNAVAILABLE 时提示用户开启 Wi-Fi（即使不连接，Wi-Fi 扫描也能辅助定位）'
  },
]
</script>

<style scoped>
/* ============================================
   Geolocation Learning Page Styles
   ============================================ */
.geo-learning {
  max-width: 960px;
  margin: 0 auto;
  padding-bottom: 3rem;
}

/* ─── Hero ─── */
.hero {
  text-align: center;
  padding: 2.5rem 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
}
.hero h1 {
  font-size: 1.8rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}
.hero-sub {
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.95rem;
}

/* ─── TOC ─── */
.toc {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 0.8rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background: var(--color-background);
  z-index: 10;
}
.toc-link {
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--color-background-soft);
  color: var(--color-text);
  text-decoration: none;
  border: 1px solid var(--color-border);
  transition: all 0.2s;
}
.toc-link:hover {
  background: var(--color-background-mute);
  color: var(--color-heading);
  border-color: var(--color-heading);
}

/* ─── Section Card ─── */
.section-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.8rem;
  margin-bottom: 1.5rem;
}
.s-title {
  font-size: 1.3rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}
.s-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1.2rem;
}
.s-desc code,
.s-tip code,
.config-example code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

/* ─── Section 1: Info Grid ─── */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 1rem;
}
.info-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px;
}
.info-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}
.info-content {
  font-size: 0.85rem;
  line-height: 1.5;
}
.info-content strong {
  display: block;
  font-size: 0.9rem;
  color: var(--color-heading);
  margin-bottom: 2px;
}
.info-content span {
  opacity: 0.7;
}

/* ─── Controls ─── */
.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.ctrl-btn {
  padding: 8px 20px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.ctrl-btn:hover:not(:disabled) {
  border-color: var(--color-heading);
  color: var(--color-heading);
}
.ctrl-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.ctrl-btn.primary {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border-color: hsla(160, 100%, 37%, 1);
}
.ctrl-btn.primary:hover:not(:disabled) {
  filter: brightness(1.1);
}
.ctrl-btn.danger {
  color: #e74c3c;
  border-color: #e74c3c44;
}
.ctrl-btn.danger:hover:not(:disabled) {
  background: #e74c3c;
  color: #fff;
  border-color: #e74c3c;
}
.ctrl-btn.sm {
  padding: 3px 10px;
  font-size: 0.78rem;
}

/* ─── Demo Area ─── */
.demo-area {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
}
.demo-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.8rem;
}
.geo-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

/* ─── Get location demo ─── */
.geo-result {
  background: var(--color-background-mute);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 8px;
}
.result-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 0.88rem;
  border-bottom: 1px solid var(--color-border);
}
.result-row:last-child {
  border-bottom: none;
}
.result-key {
  color: var(--color-text);
  opacity: 0.6;
}
.result-val {
  font-weight: 600;
  color: var(--color-heading);
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
}
.geo-error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 8px;
  line-height: 1.5;
}
.geo-hint {
  font-size: 0.82rem;
  opacity: 0.5;
  color: var(--color-text);
  margin-top: 8px;
}

/* ─── Section 3: Watch log ─── */
.watch-log {
  margin-top: 8px;
}
.watch-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 8px;
}
.watch-log-list {
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}
.watch-log-item {
  display: flex;
  gap: 12px;
  padding: 6px 10px;
  font-size: 0.82rem;
  border-bottom: 1px solid var(--color-border);
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
}
.watch-log-item:last-child {
  border-bottom: none;
}
.wl-idx {
  color: var(--color-text);
  opacity: 0.4;
  min-width: 28px;
}
.wl-coords {
  flex: 1;
  color: var(--color-heading);
}
.wl-acc {
  color: var(--color-text);
  opacity: 0.6;
  min-width: 60px;
}
.wl-time {
  color: var(--color-text);
  opacity: 0.5;
  min-width: 70px;
  text-align: right;
}

/* ─── Section 4: Config compare ─── */
.config-compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin-bottom: 1rem;
}
.config-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px;
}
.config-key {
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 2px;
}
.config-type {
  font-size: 0.72rem;
  color: hsla(160, 100%, 37%, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.config-desc {
  font-size: 0.82rem;
  line-height: 1.5;
  opacity: 0.8;
  margin-bottom: 8px;
}
.config-example {
  font-size: 0.82rem;
  margin-bottom: 6px;
}
.config-note {
  font-size: 0.78rem;
  color: var(--color-text);
  opacity: 0.6;
  line-height: 1.4;
}

/* ─── Config form ─── */
.config-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}
.config-field {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
}
.config-field span {
  min-width: 180px;
  color: var(--color-text);
  opacity: 0.8;
}
.config-field select {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-heading);
  font-size: 0.85rem;
  cursor: pointer;
}

/* ─── Section 4: Code ─── */
.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  overflow-x: auto;
  font-size: 0.82rem;
  line-height: 1.6;
  margin: 0 0 1rem;
  tab-size: 2;
}
.code-block code {
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  white-space: pre;
}

/* ─── Section 5: Error table ─── */
.err-table-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}
.err-table {
  width: 100%;
  font-size: 0.85rem;
  border-collapse: collapse;
}
.err-table th {
  background: var(--color-background-mute);
  color: var(--color-heading);
  font-weight: 600;
  padding: 10px 12px;
  text-align: left;
  border: 1px solid var(--color-border);
}
.err-table td {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  vertical-align: top;
}
.err-table code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.85em;
}
.err-cause {
  font-size: 0.82rem;
  opacity: 0.75;
}

/* ─── Section 6: Privacy flow ─── */
.privacy-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 1rem;
}
.privacy-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 18px;
  width: 100%;
  max-width: 500px;
}
.ps-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  flex-shrink: 0;
}
.ps-content {
  font-size: 0.85rem;
  line-height: 1.6;
}
.ps-content strong {
  display: block;
  color: var(--color-heading);
  margin-bottom: 2px;
}
.privacy-arrow {
  font-size: 1.2rem;
  opacity: 0.4;
}

.perms-api-detail {
  margin-bottom: 1rem;
  cursor: pointer;
}
.perms-api-detail summary {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading);
  cursor: pointer;
  padding: 8px 0;
}
.perms-api-detail p {
  margin-top: 6px;
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.85;
}

/* ─── Section 7: Props table ─── */
.props-table-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}
.props-table {
  width: 100%;
  font-size: 0.85rem;
  border-collapse: collapse;
}
.props-table th {
  background: var(--color-background-mute);
  color: var(--color-heading);
  font-weight: 600;
  padding: 10px 12px;
  text-align: left;
  border: 1px solid var(--color-border);
}
.props-table td {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  color: var(--text-color, var(--color-text));
  vertical-align: top;
}
.props-table code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.85em;
}

/* ─── Section 8: Usage grid ─── */
.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}
.usage-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s;
}
.usage-card:hover {
  transform: translateY(-2px);
}
.usage-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}
.usage-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading);
  margin-bottom: 6px;
}
.usage-desc {
  font-size: 0.82rem;
  line-height: 1.5;
  opacity: 0.7;
}

/* ─── Tip ─── */
.s-tip {
  background: color-mix(in srgb, hsla(160, 100%, 37%, 1) 10%, transparent);
  border-left: 3px solid hsla(160, 100%, 37%, 1);
  padding: 0.8rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--color-text);
}

/* ─── Footer ─── */
.page-footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.9rem;
}

/* ─── Section 9: Q&A ─── */
.qa-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.qa-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.qa-item.qa-open {
  border-color: hsla(160, 100%, 37%, 0.5);
  box-shadow: 0 0 0 1px hsla(160, 100%, 37%, 0.15);
}
.qa-question {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  background: var(--color-background);
  color: var(--color-heading);
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}
.qa-question:hover {
  background: var(--color-background-mute);
}
.qa-level {
  flex-shrink: 0;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 3px;
}
.qa-lv1 {
  background: #42b88322;
  color: #42b883;
}
.qa-lv2 {
  background: #f39c1222;
  color: #f39c12;
}
.qa-lv3 {
  background: #e74c3c22;
  color: #e74c3c;
}
.qa-text {
  flex: 1;
  line-height: 1.4;
}
.qa-arrow {
  flex-shrink: 0;
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.4;
}
.qa-answer {
  border-top: 1px solid var(--color-border);
  background: var(--color-background-soft);
}
.qa-answer-inner {
  padding: 14px;
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--color-text);
}
.qa-answer-inner code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}
.qa-answer-inner strong {
  color: var(--color-heading);
}

/* ─── Responsive ─── */
@media (max-width: 700px) {
  .hero h1 { font-size: 1.3rem; }
  .section-card { padding: 1.2rem; }
  .info-grid { grid-template-columns: 1fr; }
  .config-compare { grid-template-columns: 1fr; }
  .usage-grid { grid-template-columns: 1fr; }
  .config-field { flex-direction: column; align-items: stretch; }
  .config-field span { min-width: auto; }
}
</style>
