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

# Sort the stream to compare results
sort: true 
```

2. Set the parameter to be verified to `config/resources/resources.txt`


3. After executing the command, a report is dist in `report/${timestamp}.txt`

```
$ npm run start
```
