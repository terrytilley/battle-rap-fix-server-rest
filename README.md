# Battle Rap Fix Server

## Getting Started

### Install Node Modules
```
> git clone git@github.com:terrytilley/battle-rap-fix-server.git
> cd battle-rap-fix-server
> yarn install
```

### Setup Database
```
> psql
> create database battle_rap_fix_dev;
> create database battle_rap_fix_test;
> yarn run migrate:dev
> yarn run seed:dev
```

### Sart Server
```
> yarn start
```

### Run Tests
```
> yarn test
```
