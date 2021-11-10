#!/bin/bash

echo "Create network..."
docker network create redis_g_i

echo "Run redisgraph..."
docker run -d -p 6379:6379 --name redisgraph --network redis_g_i redislabs/redisgraph

echo "Run redisinsight..."
docker run -d -v redisinsight:/db -p 8001:8001 --name redisinsight --network redis_g_i redislabs/redisinsight:latest

echo "For complete logs:"
echo "On a shell, run: docker logs -f redisgraph"
echo "On another shell, run: docker logs -f redisinsight"
