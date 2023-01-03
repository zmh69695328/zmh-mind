import { defineConfig } from 'vite'
// const path = require('path')
import sentryVitePlugin from "@sentry/vite-plugin";

export default defineConfig({
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
    sentryVitePlugin({
      org: "zmh",
      project: "zmh-mind",
      url:'http://113.31.125.185:10271/',
      // Specify the directory containing build artifacts
      include: "./dist",

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and needs the `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN,

      // Optionally uncomment the line below to override automatic release name detection
      // release: process.env.RELEASE,
      release:process.env.RELEASE,
      debug:true
    }),
  ]
})
