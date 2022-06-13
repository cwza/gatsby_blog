---
title: "System Design Practice: Uber"
date: 2022-06-13
tags: ['system-design']
draft: false
hide: false
---

## Note
* Map Service: google map, provide map and ETA
* Location Service: see https://towardsdatascience.com/ace-the-system-design-interview-uber-lyft-7e4c212734b3
    + Better to store the driver location into Driver proximity cache to check if this is the latest location of driver
* Match Service: call location service to get nearest drivers, use map service to compute ETA and create a match
* Trip Service: after a match start to record the positions in trip
* Web Socket Service to make a continuous connections(need to record which machine serve which user)
    + Other service can use the stored infos to communicate with user

## Flow
* Drivers connect to our service via Web Socket Service and continuously update their locations by Location Service
    + Location Service store the latest driver location into location truth cache
    + Location Service also update the driver proximity cache by geohash
* Passenger connect to our service via Web Socket Service and request a driver to match
    + Match service will call Location Service to get the nearest drivers
    + Match service also call the Map Service to get the ETA of each drivers
    + Match service notify the drivers to create a match
* After a match is created, driver start to interact with Trip Service to update the trip infos

## Reference
* https://towardsdatascience.com/ace-the-system-design-interview-uber-lyft-7e4c212734b3
* GeoHash: https://www.movable-type.co.uk/scripts/geohash.html