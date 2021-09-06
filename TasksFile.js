/* eslint-disable import/no-extraneous-dependencies, functional/functional-parameters */
const { sh, cli } = require('tasksfile')

const shellOptions = { nopipe: true, async: undefined }

/*****
  You can run any of these tasks manually like this: npx task tests:npmaudit
*****/

const dev = {
  start() {
    const tsc = `ttsc --watch --pretty`
    const browserync = `sleep 2 && browser-sync start --watch --reload-delay 1500 --no-open --no-notify --no-ui --no-ghost-mode --no-inject-changes --files=./frontend/**/* --files=./server/**/* --files=./boot.js --ignore=node_modules --port 8081 --proxy 'localhost:8080' --host '0.0.0.0'`
    const nodemon = `sleep 2 && nodemon ./boot.js --watch server --ext js`
    sh(`concurrently "${tsc}" "${nodemon}" "${browserync}"`, shellOptions)
  },
  inspect() {
    sh(`node --inspect ./boot.js`, shellOptions)
  },
}

cli({
  dev,
})
/* eslint-enable import/no-extraneous-dependencies, functional/functional-parameters */
