import { configureWunderGraphApplication, introspect } from '@wundergraph/sdk'

// GraphQL API 数据源
const spacex = introspect.graphql({
  apiNamespace: 'spacex',
  url: 'https://spacex-api.fly.dev/graphql',
})

// REST API 数据源 (Open-Meteo 天气 API)
// WunderGraph 会将 REST API 转换为 GraphQL
const weather = introspect.openApi({
  apiNamespace: 'weather',
  source: {
    kind: 'url',
    url: 'https://raw.githubusercontent.com/open-meteo/open-meteo/main/openapi.yml',
  },
})

configureWunderGraphApplication({
  apis: [spacex, weather],
  server: {
    port: 9991,
    playground: true,
  },
})
