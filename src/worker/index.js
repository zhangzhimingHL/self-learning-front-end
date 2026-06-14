// worker.js
self.onmessage = (e) => {
  const max = e.data
  let sum = 0

  // 大量计算
  for (let i = 0; i < max; i++) {
    sum += i
  }

  // 把结果发回 Vue
  self.postMessage(sum)

  // 关闭自己
  self.close()
}