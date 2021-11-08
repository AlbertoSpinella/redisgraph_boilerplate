#!/bin/bash

echo "Stop redisgraph..."
docker stop redisgraph
echo "Remove redisgraph..."
docker rm redisgraph

echo "Stop redisinsight..."
docker stop redisinsight
echo "Remove redisinsight..."
docker rm redisinsight

echo "Remove network..."
docker network rm redis_g_i