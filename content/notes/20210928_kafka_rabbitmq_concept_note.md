---
title: "Note of Kafka RabbitMQ Concept"
date: 2021-09-28
tags: ['message-queue']
draft: false
hide: false
---

## rabbitmq: exchange, routing key, queue
* scalibility: producer send msg to (exchange, routing key), bind one queue to that (exchange, routing key), all consumers consumes msgs from that one shared queue (scale by number of consumers)
* broadcast: producer send msg to (exchange, routing key), each consumer create their own queue and bind to that (exchange, routing key), so that each consumer will consume msgs from their own queue

## kafka: topic, partition
* broadcast: producer send msg to (topic, partition), each consumer consumes msgs from the same (topic, partition), but each consumer will have their own offset(this offset is maintained by consumer it self not kafka)
* scalibility: producer send msg to (topic), kafka will dispatch msgs to each partitions(default: round-robin or you can specify a key), and each consumer consumes msgs from their specific partition (scale by number of partitions not number of consumers)
* order: only be guaranteed in same partition, so when use the same key to send the ordered msg
* consumer_group: each consumer in one consumer_group will be assigned to one partition, so kafka guarantee that msgs will be consumed parallel in one consumer_group
