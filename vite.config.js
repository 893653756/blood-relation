import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.js',
      name: 'BloodRelation',
      fileName: 'blood-relation',
      formats: ['es']
    },
    rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
      external: ['@antv/g6'],
    },
  }
})
