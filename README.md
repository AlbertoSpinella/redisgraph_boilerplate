# RedisGraph boilerplate

Boilerplate for RedisGraph.
Once cloned the repo, run the following commands:
```
npm ci
./redis_start.sh
npm t
```
Alternatively, instead of `npm t`, run `npm run dev` and, on another shell, run: `./seed.sh` to create mock data.

Visit localhost:8001 to view data. To do so, run the following query:
```
GRAPH.QUERY "Boilerplate" "match (n) return n"
```
