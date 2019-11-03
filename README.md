# api-diff-tester
validate API response comparison and create report

# usage

1. URL to compare is written in `config/default.yml`

```
url:
  expected: "localhost:3000" 
  actual: "localhost:8000"
  
# Adjust the interval for throwing requests
delaySec: 1
```

2. Set the parameter to be verified to `src/resources.yml`


3. After executing the command, a report is dist in `src/result.yml`

```
$ npm run start
```
