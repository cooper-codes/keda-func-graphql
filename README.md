# Azure Functions in Keda with HTTP scalar

### Requirements

- Azure Core Tools [Install Instructions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- garden bonsai [Install Instructions](https://docs.garden.io/getting-started/quickstart)
- helm [Install Instructions](https://helm.sh/docs/helm/helm_install/)
- K6 (optional) [Install Instructions](https://grafana.com/docs/k6/latest/get-started/installation/)
- Modify your /etc/hosts or C:\Windows\System32\drivers\etc\hosts file to include the following mapping `127.0.0.1 garden.local`

### Running the app

- `garden deploy`
- Open web browser to [Apollo Sandbox](https://garden.local/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKIAeAhnAA4A2CAiroUcADpJFEAWCttEDgF8QQoA)
  - The first request may fail. Try submitting again.
  - If you continue to see an error including "internal-router" try re-running `garden deploy`
- Or run k6 `k6 run k6/index.js `

### Teardown

- Run `garden del env`
