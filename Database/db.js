require('dotenv').config()
const mysql = require('mysql2')

const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'cjh5701'
const password = process.env.DB_PASSWORD || 'a1234'
const database = process.env.DB_DATABASE || 'teamPJ'

const config = {host,user,password,database}
const pool = mysql.createPool(config)
const promisePool = pool.promise()
exports.pool = promisePool