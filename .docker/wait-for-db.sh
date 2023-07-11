#!/bin/sh

hostname="$1"
port="$2"
shift 2

# Wait for the database to start
while ! nc -z "$hostname" "$port"; do
  echo "Waiting for the database to start..."
  sleep 1
done

echo "Database is up and running!"

exec "$@"
