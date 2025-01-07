import { defineConfig,loadEnv} from 'vite'
// const path = require('path')
import sentryVitePlugin from "@sentry/vite-plugin";

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
    plugins:[
      // sentryVitePlugin({
      //   org: process.env.VITE_ORG,
      //   project: process.env.VITE_PROJECT,
      //   url:process.env.VITE_URL,
      //   // Specify the directory containing build artifacts
      //   include: "./dist",
  
      //   // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      //   // and needs the `project:releases` and `org:read` scopes
      //   authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
  
      //   // Optionally uncomment the line below to override automatic release name detection
      //   // release: process.env.RELEASE,
      //   release:process.env.VITE_RELEASE,
      // }),
    ]
  }
})
