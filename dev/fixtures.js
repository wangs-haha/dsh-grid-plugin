/* Fixture backend for the local UI harness. Not shipped with the plugin. */

;(function () {
  const FIRST = ['Ada', 'Grace', 'Alan', 'Linus', 'Barbara', 'Ken', 'Margaret', 'Dennis', 'Frances', 'Edsger', 'Anita', 'Tim', 'Radia', 'Vint', 'Sophie', 'Yann']
  const LAST = ['Lovelace', 'Hopper', 'Turing', 'Torvalds', 'Liskov', 'Thompson', 'Hamilton', 'Ritchie', 'Allen', 'Dijkstra', 'Borg', 'Berners-Lee', 'Perlman', 'Cerf', 'Wilson', 'Lecun']
  const CITIES = ['London', 'New York', 'Manchester', 'Berlin', 'Tokyo', 'Paris', 'Toronto', 'Sydney']
  const STATUS = ['active', 'active', 'active', 'trialing', 'past_due', 'canceled']
  const PLANS = ['free', 'starter', 'growth', 'scale', 'enterprise']

  const pick = (list, index) => list[index % list.length]
  const iso = (day) => new Date(Date.UTC(2024, 0, 1) + day * 86400000).toISOString()

  const users = Array.from({ length: 187 }, (_, index) => {
    const first = pick(FIRST, index * 7 + 3)
    const last = pick(LAST, index * 5 + 1)
    return {
      id: index + 1,
      email: (first + '.' + last + index + '@example.com').toLowerCase(),
      full_name: first + ' ' + last,
      status: pick(STATUS, index * 3),
      country: pick(['GB', 'US', 'DE', 'JP', 'FR', 'CA', 'AU'], index),
      plan: pick(PLANS, index * 2),
      mrr: [0, 19, 49, 199, 999][index % 5],
      score: Math.round((((index * 37) % 1000) / 10) * 10) / 10,
      is_verified: index % 3 !== 0,
      created_at: iso(index % 320),
      last_seen: index % 11 === 0 ? null : iso(300 + (index % 60)),
      notes: index % 7 === 0 ? null : index % 5 === 0
        ? 'Imported from the legacy billing system during the migration window; contact the account team before changing the plan.'
        : 'VIP account — handle with care.',
      tags: JSON.stringify(pick([['beta', 'eu'], ['vip'], ['churn-risk', 'smb'], []], index)),
    }
  })

  const orders = Array.from({ length: 523 }, (_, index) => ({
    id: index + 1,
    user_id: (index % 187) + 1,
    number: 'ORD-' + String(20240000 + index),
    status: pick(['paid', 'paid', 'pending', 'refunded', 'failed'], index),
    total: Math.round(((index * 137) % 50000) ) / 100,
    currency: pick(['USD', 'EUR', 'GBP'], index),
    placed_at: iso(index % 300),
    shipped_at: index % 4 === 0 ? null : iso((index % 300) + 2),
    carrier: pick(['DHL', 'UPS', 'FedEx'], index),
    tracking: 'TRK' + String(800000 + index * 7),
  }))

  const TABLES = {
    shop: [
      { name: 'users', kind: 'table', rows: users.length, comment: 'Customer accounts' },
      { name: 'orders', kind: 'table', rows: orders.length, comment: 'Checkout orders' },
      { name: 'order_items', kind: 'table', rows: 1204, comment: '' },
      { name: 'products', kind: 'table', rows: 64, comment: 'Catalog' },
      { name: 'categories', kind: 'table', rows: 12, comment: '' },
      { name: 'payments', kind: 'table', rows: 498, comment: 'PSP settlements' },
      { name: 'shipments', kind: 'table', rows: 371, comment: '' },
      { name: 'coupons', kind: 'table', rows: 9, comment: '' },
      { name: 'reviews', kind: 'table', rows: 812, comment: '' },
      { name: 'inventory', kind: 'table', rows: 64, comment: '' },
      { name: 'audit_log', kind: 'table', rows: 91822, comment: 'Append-only' },
      { name: 'v_active_customers', kind: 'view', rows: null, comment: 'Reporting view' },
      { name: 'v_mrr_by_plan', kind: 'view', rows: null, comment: '' },
    ],
    analytics: [
      { name: 'events', kind: 'table', rows: 4021331, comment: 'Event stream' },
      { name: 'sessions', kind: 'table', rows: 88214, comment: '' },
      { name: 'funnels', kind: 'table', rows: 18, comment: '' },
      { name: 'v_daily_active', kind: 'view', rows: null, comment: '' },
    ],
  }

  const COLUMNS = {
    users: [
      { name: 'id', type: 'int unsigned', nullable: false, defaultValue: null, primaryKey: true, extra: 'auto_increment', comment: '' },
      { name: 'email', type: 'varchar(160)', nullable: false, defaultValue: null, primaryKey: false, extra: '', comment: 'Login identity' },
      { name: 'full_name', type: 'varchar(120)', nullable: false, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'status', type: "enum('active','trialing','past_due','canceled')", nullable: false, defaultValue: "'active'", primaryKey: false, extra: '' },
      { name: 'country', type: 'char(2)', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'plan', type: 'varchar(32)', nullable: false, defaultValue: "'free'", primaryKey: false, extra: '' },
      { name: 'mrr', type: 'decimal(10,2)', nullable: false, defaultValue: '0.00', primaryKey: false, extra: '' },
      { name: 'score', type: 'decimal(6,1)', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'is_verified', type: 'tinyint(1)', nullable: false, defaultValue: '0', primaryKey: false, extra: '' },
      { name: 'created_at', type: 'datetime', nullable: false, defaultValue: 'CURRENT_TIMESTAMP', primaryKey: false, extra: '' },
      { name: 'last_seen', type: 'datetime', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'notes', type: 'text', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'tags', type: 'json', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
    ],
    orders: [
      { name: 'id', type: 'bigint', nullable: false, defaultValue: null, primaryKey: true, extra: 'auto_increment', comment: '' },
      { name: 'user_id', type: 'int unsigned', nullable: false, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'number', type: 'varchar(24)', nullable: false, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'status', type: 'varchar(16)', nullable: false, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'total', type: 'decimal(12,2)', nullable: false, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'currency', type: 'char(3)', nullable: false, defaultValue: 'USD', primaryKey: false, extra: '' },
      { name: 'placed_at', type: 'datetime', nullable: false, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'shipped_at', type: 'datetime', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'carrier', type: 'varchar(16)', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
      { name: 'tracking', type: 'varchar(32)', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
    ],
  }

  /** Default columns for tables that do not have a hand-written set. */
  const GENERIC_COLUMNS = [
    { name: 'id', type: 'bigint', nullable: false, defaultValue: null, primaryKey: true, extra: 'auto_increment', comment: '' },
    { name: 'ref', type: 'varchar(64)', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
    { name: 'amount', type: 'decimal(12,2)', nullable: true, defaultValue: null, primaryKey: false, extra: '' },
    { name: 'created_at', type: 'datetime', nullable: false, defaultValue: 'CURRENT_TIMESTAMP', primaryKey: false, extra: '' },
  ]

  const DDL = (table) =>
    'CREATE TABLE `' + table + '` (\n' +
    '  `id` bigint NOT NULL AUTO_INCREMENT,\n' +
    "  `email` varchar(160) NOT NULL,\n" +
    "  `status` enum('active','trialing','past_due','canceled') NOT NULL DEFAULT 'active',\n" +
    '  `mrr` decimal(10,2) NOT NULL DEFAULT 0.00,\n' +
    '  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\n' +
    '  PRIMARY KEY (`id`),\n' +
    '  UNIQUE KEY `users_email_unique` (`email`),\n' +
    '  KEY `users_status_idx` (`status`),\n' +
    '  KEY `users_created_at_idx` (`created_at`)\n' +
    ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'

  const INDEXES = (table) => [
    { name: 'PRIMARY', columns: ['id'], unique: true, primary: true },
    { name: table + '_email_unique', columns: ['email'], unique: true, primary: false },
    { name: table + '_status_idx', columns: ['status'], unique: false, primary: false },
    { name: table + '_created_at_idx', columns: ['created_at'], unique: false, primary: false },
  ]

  const CONNECTIONS = [
    { id: 'c_mysql', name: '生产环境 MySQL', engine: 'mysql', group: '生产', color: 'red', host: 'db-prod-01', port: 3306, user: 'app', database: 'shop', file: '', redisDb: 0, ssl: true, hasPassword: true },
    { id: 'c_pg', name: 'Staging Postgres', engine: 'postgres', group: '测试', color: 'yellow', host: 'staging.internal', port: 5432, user: 'dev', database: 'shop', file: '', redisDb: 0, ssl: false, hasPassword: true },
    { id: 'c_lite', name: '本地 SQLite', engine: 'sqlite', group: '开发', color: 'green', host: '', port: 0, user: '', database: '', file: 'D:/data/app.db', redisDb: 0, ssl: false, hasPassword: false },
    { id: 'c_redis', name: 'Redis 缓存', engine: 'redis', group: '生产', color: 'none', host: 'cache-01', port: 6379, user: '', database: '', file: '', redisDb: 0, ssl: false, hasPassword: true },
  ]

  const REDIS_KEYS = [
    ['user:1001:profile', 'hash'], ['user:1001:session', 'string'], ['user:1002:profile', 'hash'],
    ['cart:88f3a', 'hash'], ['cart:91b2c', 'hash'], ['cart:aa01d', 'list'],
    ['rate:api:203.0.113.7', 'string'], ['queue:emails', 'list'], ['queue:webhooks', 'list'],
    ['lock:order:44231', 'string'], ['leaderboard:weekly', 'zset'], ['tags:active', 'set'],
    ['events:stream', 'stream'], ['session:abc', 'string'], ['session:def', 'string'],
    ['feature:checkout-v2', 'string'], ['config:plans', 'hash'],
  ]

  const tables = (database) => TABLES[database] || TABLES.shop

  const columnSet = (table) => COLUMNS[table] || GENERIC_COLUMNS

  const rowsOf = (table) => {
    if (table === 'users') return users
    if (table === 'orders') return orders
    return Array.from({ length: 42 }, (_, index) => ({
      id: index + 1,
      ref: 'REF-' + (1000 + index),
      amount: Math.round(((index * 991) % 40000)) / 100,
      created_at: iso(index),
    }))
  }

  /**
   * Apply ORDER BY + LIMIT/OFFSET + a very small WHERE subset, so the harness
   * exercises the same client code path as the real Host.
   */
  function pageRows(payload) {
    let list = rowsOf(payload.table).slice()
    const where = String(payload.where || '').trim()
    const filter = /^(\w+)\s*=\s*'([^']*)'$/.exec(where)
    if (filter) list = list.filter((row) => String(row[filter[1]]) === filter[2])
    if (payload.orderBy) {
      const key = payload.orderBy
      const sign = payload.orderDir === 'desc' ? -1 : 1
      list.sort((a, b) => (a[key] > b[key] ? sign : a[key] < b[key] ? -sign : 0))
    }
    const page = Number(payload.page) || 1
    const size = Number(payload.pageSize) || 100
    const start = (page - 1) * size
    return { page, pageSize: size, rows: list.slice(start, start + size), total: list.length }
  }

  const json = (body, status) => ({
    ok: status === undefined || status < 400,
    status: status || 200,
    json: async () => body,
  })

  window.fetch = async (url, init) => {
    const payload = JSON.parse(init.body)
    const action = payload.action

    if (action === 'meta') {
      return json({
        ok: true,
        allowWrites: false,
        bindings: [
          {
            workspaceId: 'w1',
            workspacePath: 'D:/work/code/dsh-grid-plugin',
            connectionId: 'c_mysql',
            connectionName: '生产环境 MySQL',
            database: 'shop',
            createdAt: new Date().toISOString(),
          },
        ],
        workspaces: [
          { id: 'w1', title: 'dsh-grid-plugin', path: 'D:/work/code/dsh-grid-plugin' },
          { id: 'w2', title: 'another-project', path: 'D:/work/another-project' },
        ],
        engines: [
          { id: 'sqlite', label: 'SQLite', package: null, defaultPort: 0, kind: 'file', fields: ['file'], description: 'A local database file. Works with no extra install.', available: true },
          { id: 'mysql', label: 'MySQL / MariaDB', package: 'mysql2', defaultPort: 3306, kind: 'network', fields: ['host', 'port', 'user', 'password', 'database'], description: 'MySQL 5.7+ and MariaDB 10.x over TCP.', available: true },
          { id: 'postgres', label: 'PostgreSQL', package: 'pg', defaultPort: 5432, kind: 'network', fields: ['host', 'port', 'user', 'password', 'database'], description: 'PostgreSQL 12+ with database and schema levels.', available: true },
          { id: 'sqlserver', label: 'SQL Server', package: 'mssql', defaultPort: 1433, kind: 'network', fields: ['host', 'port', 'user', 'password', 'database'], description: 'Microsoft SQL Server 2017+ over TDS.', available: true },
          { id: 'redis', label: 'Redis', package: 'ioredis', defaultPort: 6379, kind: 'network', fields: ['host', 'port', 'password', 'redisDb'], description: 'Redis 6+ key browser and command console.', available: true },
        ],
      })
    }
    if (action === 'connections.list') return json({ ok: true, connections: CONNECTIONS })
    if (action === 'connections.sessions') {
      return json({ ok: true, sessions: [{ id: 'c_mysql', engine: 'mysql', version: 'MySQL 8.4.0', idleMs: 1200 }] })
    }
    if (action === 'connections.connect') {
      const connection = CONNECTIONS.find((entry) => entry.id === payload.id)
      return json({ ok: true, engine: connection ? connection.engine : 'mysql', serverVersion: connection && connection.engine === 'redis' ? 'Redis 7.2.4' : 'MySQL 8.4.0' })
    }
    if (action === 'connections.test') return json({ ok: true, latencyMs: 12, serverVersion: 'MySQL 8.4.0' })
    if (action === 'connections.create') return json({ ok: true, connection: CONNECTIONS[0], probe: { ok: true, latencyMs: 9, serverVersion: 'MySQL 8.4.0' } })
    if (action === 'connections.update') return json({ ok: true, connection: CONNECTIONS[0] })
    if (action === 'connections.delete') return json({ ok: true, deleted: true })
    if (action === 'connections.disconnect') return json({ ok: true, wasOpen: true })

    if (action === 'databases') {
      const connection = CONNECTIONS.find((entry) => entry.id === payload.connectionId)
      if (connection && connection.engine === 'redis') {
        return json({ ok: true, databases: Array.from({ length: 4 }, (_, index) => ({ name: 'db' + index, schemas: [] })) })
      }
      if (connection && connection.engine === 'postgres') {
        return json({ ok: true, databases: [{ name: 'shop', schemas: ['public', 'reporting'] }] })
      }
      if (connection && connection.engine === 'sqlite') {
        return json({ ok: true, databases: [{ name: 'main', schemas: [] }] })
      }
      return json({ ok: true, databases: [{ name: 'shop', schemas: [] }, { name: 'analytics', schemas: [] }] })
    }
    if (action === 'tables') return json({ ok: true, tables: tables(payload.database) })

    if (action === 'columns') {
      return json({
        ok: true,
        columns: columnSet(payload.table),
        indexes: INDEXES(payload.table),
        ddl: DDL(payload.table),
      })
    }

    if (action === 'rows') {
      const result = pageRows(payload)
      return json({
        ok: true,
        columns: columnSet(payload.table).map((column) => ({ name: column.name, type: column.type })),
        rows: result.rows,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        durationMs: 7,
      })
    }
    if (action === 'rows.update') return json({ ok: true, affected: 1 })
    if (action === 'rows.insert') return json({ ok: true, affected: 1 })
    if (action === 'rows.delete') return json({ ok: true, affected: 1 })
    if (action === 'export') {
      const result = pageRows({ ...payload, page: 1, pageSize: 500 })
      return json({ ok: true, columns: columnSet(payload.table).map((c) => ({ name: c.name })), rows: result.rows, truncated: false, total: result.total })
    }

    if (action === 'sql') {
      const first = /from\s+([`"\w.]+)/i.exec(payload.sql || '')
      const table = first ? first[1].replace(/[`"]/g, '') : 'users'
      const result = pageRows({ table, page: 1, pageSize: 100 })
      return json({
        ok: true,
        statementCount: 2,
        durationMs: 23,
        results: [
          { statement: payload.sql, columns: columnSet(table).map((c) => ({ name: c.name, type: c.type })), rows: result.rows.slice(0, 40), rowCount: 40, durationMs: 19 },
          { statement: 'SELECT status, COUNT(*) AS n FROM users GROUP BY status', columns: [{ name: 'status', type: 'varchar' }, { name: 'n', type: 'bigint' }], rows: [{ status: 'active', n: 96 }, { status: 'trialing', n: 31 }, { status: 'past_due', n: 22 }, { status: 'canceled', n: 38 }], rowCount: 4, durationMs: 4 },
        ],
      })
    }

    if (action === 'redis.databases') {
      return json({ ok: true, databases: [{ name: 'db0', schemas: [] }, { name: 'db1', schemas: [] }, { name: 'db2', schemas: [] }, { name: 'db3', schemas: [] }] })
    }
    if (action === 'redis.scan') {
      const pattern = String(payload.pattern || '*').replace(/\*/g, '')
      return json({
        ok: true,
        cursor: '0',
        keys: REDIS_KEYS.filter(([key]) => key.includes(pattern) || pattern === '')
          .filter(([, type]) => !payload.type || type === payload.type)
          .map(([key, type]) => ({ key, type, ttl: type === 'string' ? 3600 : -1 })),
      })
    }
    if (action === 'redis.key') {
      const entry = REDIS_KEYS.find(([key]) => key === payload.key) || ['missing', 'none']
      const type = entry[1]
      const value = type === 'hash'
        ? { email: 'ada@example.com', plan: 'growth', country: 'GB', signed_up: '2024-01-02' }
        : type === 'zset'
          ? [{ member: 'ada', score: 981 }, { member: 'grace', score: 902 }, { member: 'alan', score: 870 }]
          : type === 'set'
            ? ['eu-west', 'beta', 'vip']
            : type === 'list'
              ? ['job-1001', 'job-1002', 'job-1003']
              : '{"id":1001,"name":"Ada Lovelace","plan":"growth"}'
      return json({ ok: true, key: payload.key, type, ttl: type === 'string' ? 3600 : -1, length: type === 'hash' ? 4 : null, value, truncated: false })
    }
    if (action === 'redis.command') return json({ ok: true, command: 'GET', tokens: ['GET'], reply: '{"id":1001}', durationMs: 1 })
    if (action === 'redis.delete') return json({ ok: true, deleted: 1 })

    return json({ ok: true })
  }

  window.__GRID_FIXTURES = { CONNECTIONS, TABLES, users }
})()
