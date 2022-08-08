# Intro Mongo with NodeJS

# REQ

Software must install before reading

1. Docker
1. Docker-compse

# Run mongo

1. Run docker-compose.yml

```bash
docker-compose up
```

2. When docker built run script

```bash
docker exec mongo1 /scripts/rs-init.sh
```

3. To check status replica

```bash
docker exec -it mongo1 mongo
```

when open terminal of mongo1
```bash
dbrs:PRIMARY> rs.status();
```

## More
1. That shutdown the replica set

```bash
docker-compose down
```

2. You must remove network if remove and restart docker-compose:

```bash
docker rm -f mongodb ; docker network prune
```
# Mongo Shell

- `rs.status()`: checks status of the Replica set
- `rs.initiate()`: initiates set with default settings
- `rs.conf()`: get the current configuration object
- `rs.add(hostportstr)`: add a new member to the set
- `rs.remove(hostportstr)`: remove a host from the replica set
- `rs.printReplicationInfo()`: check oplog size and time range
- `rs.printSecondaryReplicationInfo()`: check replica set members and replication lag
- `db.isMaster()`: check who is primary
- `db.hello()`: check who is primary

# REF

## Producer
1. https://hub.docker.com/_/mongo/
1. https://github.com/docker-library/mongo
1. https://github.com/tericcabrel/blog-tutorials/tree/main/mongodb-replica-set

## Blog
1. https://blog.devgenius.io/how-to-deploy-a-mongodb-replicaset-using-docker-compose-a538100db471
1. https://zgadzaj.com/development/docker/docker-compose/turning-standalone-mongodb-server-into-a-replica-set-with-docker-compose