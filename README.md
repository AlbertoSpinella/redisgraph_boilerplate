# RedisGraph boilerplate

Boilerplate for RedisGraph.
Once cloned the repo, run the following commands:
```
npm ci
./redis_start.sh
npm run dev
```
On another shell, run: `./seed.sh` to create mock data. Visit localhost:8001 to view data. To do so, run the following query:
```
GRAPH.QUERY "GraphName" "match (n) return n"
```
