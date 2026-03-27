import { configureWunderGraphApplication } from '@wundergraph/sdk'

configureWunderGraphApplication({
  apis: [
    {
      name: 'spacex',
      apiNamespace: 'spacex',
      graphql: {
        endpoint: 'https://spacex-api.fly.dev/graphql',
      },
    },
  ],
  server: {
    port: 9991,
    playground: true,
  },
})
