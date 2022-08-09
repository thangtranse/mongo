# Intro Mongo with NodeJS

# REQ

Software must install before reading

1. Docker
1. Docker-compse

# Run mongo

1. Run docker-compose.yml

```bash
docker-compose up --detach
```

2. To check status replica

```bash
docker exec -it mongo_mongodb-primary_1 mongo -u root
```

- Password in `docker-compose.yml` with `MONGODB_ROOT_PASSWORD` field, you can change it
- `mongo_mongodb-primary_1` it's name docker container, you can change it with field `container_name` in `docker-compose` file

After that, enter code at below to terminal docker

```bash
replicaset:PRIMARY> rs.status();
```

you will see all config of replica set of cluster

## More

1. That shut-down the replica set

```bash
docker-compose down
```

2. Remove network if you remove images don't use `docker-compose down`

```bash
docker network prune
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

# Handle when Error

1. You should change file `host`

```text
127.0.0.1 mongodb-primary
```

- `mongodb-primary` if you change it in `docker-compose.yml` with `MONGODB_ADVERTISED_HOSTNAME` field, then you must change it's

# Continue

Read file [link](nodeWatch)

# REF

## Producer

1. https://hub.docker.com/r/bitnami/mongodb
