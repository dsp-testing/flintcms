const graphqlHTTP = require('express-graphql')
const h = require('../utils/helpers')
const express = require('express')
const chalk = require('chalk')
const schema = require('../graphql')
const getUserPermissions = require('../utils/get-user-permissions')
const emitSocketEvent = require('../utils/emit-socket-event')
const events = require('../utils/events')
const log = require('../utils/log')
const debug = require('debug')('flint')

module.exports = (app) => {
  const graphql = express()
  const io = app.get('io')

  graphql.use(h.loggedIn)
  graphql.use('/', graphqlHTTP(async req => ({
    schema,
    pretty: true,
    graphiql: global.FLINT.debugMode,
    rootValue: {
      io,
      req,
      user: req.user,
      perms: await getUserPermissions(req.user._id),
      events,
      socketEvent: (event, payload) => emitSocketEvent({ io, req }, event, payload),
      log
    }
  })))

  debug(`${chalk.gray('[App: GraphQL]')} initialized.`)

  return graphql
}
