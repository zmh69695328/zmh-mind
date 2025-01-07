import { defineConfig,loadEnv} from 'vite'
// const path = require('path')

export default defineConfig(({mode})=>{
  Object.assign(process.env, loadEnv(mode, process.cwd()))
  return {
    // ...
    build: {
      lib: {
          entry: './src/index.ts',
          name: 'ZmhMind',
          // the proper extensions will be added
          fileName: 'mind'
        },
      rollupOptions:{
          output:{
              format:'umd',
              exports:'default',
              name:'ZmhMind'
          }
      },
      sourcemap:true
    },
    sourcemap:true
  }
})
