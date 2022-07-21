---
title: "System Design Practice: Uber"
date: 2022-06-13
tags: ['system-design']
draft: false
hide: false
---

## Services
* `Map Service`: google map, provide map and ETA
* `Location Service`: see https://towardsdatascience.com/ace-the-system-design-interview-uber-lyft-7e4c212734b3
    + DB: Redis
    + store the true location in Location True Cache
    + store the geohashed location in Driver Proximity Cache (to search nearest drivers efficiently)
* `Match Service`: call `location service` to get nearest drivers, use `map service` to compute ETA and create a match
* `Trip Service`: after a match start to record the positions in trip
* `Web Socket Service` to make a continuous connections(need to record which machine serve which user)
    + Other service can use the stored infos to communicate with user

## Table
`Location True Cache`
| user_id | longitude | latitude | type   | expire_time |
| ------- | --------- | -------- | ------ | ----------- |
| id1     | 12.78     | 59.02    | driver | 1646404653  |
| id2     | 12.79     | 59.12    | driver | 1646404658  |

`Driver Proximity Cache`
| geohash | drivers        |
| ------- | -------------- |
| dr5ru7  | (1646404651,id1), ... |
| dr5ru9  | (1646404653,id1), (1646404658,id2), ... |

## Flow
* Drivers connect to our service via `Web Socket Service` and continuously update their locations by `Location Service`
    + `Location Service` store the latest driver location into location truth cache
    + `Location Service` also update the driver proximity cache by geohash
* Passenger connect to our service via `Web Socket Service` and request a driver to match
    + `Match service` will call `Location Service` to get the nearest drivers
    + `Match service` also call the `Map Service` to get the ETA of each drivers
    + `Match service` notify the drivers to create a match
* After a match is created, driver start to interact with `Trip Service` to update the trip infos

## Others
When driver update his position to `location true table`, he also need to update the `driver proximity cache`.  
We need to have a strategy to get the latest position from `driver proximity cache` and expire old positions when the true position be updated.
* use the sorted set of redis and the ZRANGEBYSCORE command, O(logN+M)
    + use expire_time as the score
    + ZRANGEBYSCORE $now +inf to query for non-expired positions
    + ZREMRANGEBYSCORE -inf $now to query for expired position
    + [reference](https://redis.io/commands/zrangebyscore/)

## Reference
* https://towardsdatascience.com/ace-the-system-design-interview-uber-lyft-7e4c212734b3
* GeoHash: https://www.movable-type.co.uk/scripts/geohash.html