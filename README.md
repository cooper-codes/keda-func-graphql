# Azure Functions in Keda with HTTP scalar

### Requirements

- garden bonsai [Install Instructions](https://docs.garden.io/getting-started/quickstart)
- helm [Install Instructions](https://helm.sh/docs/helm/helm_install/)
- K6 (optional) [Install Instructions](https://grafana.com/docs/k6/latest/get-started/installation/)

### Running the app

- `garden deploy`
- Open web browser to [Apollo Sandbox](https://local.garden/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKIAeAhnAA4A2CAiroUcADpJFEAWCttEDgF8QQoA)
  - The first request may fail. Try submitting again.
  - If you continue to see an error including "internal-router" try re-running `garden deploy`
- Or run k6 `k6 run k6/index.js `

### Teardown

- Run `garden del env`
