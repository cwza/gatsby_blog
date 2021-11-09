---
title: "Note of Durable retry by rabbitmq"
date: 2021-11-09
tags: ['message-queue']
draft: false
hide: false
---

## Quorum Queues
* https://www.rabbitmq.com/quorum-queues.html
* Replication queues across all rabbitmq cluster nodes
* Set redelivery limit by header x-delivery-count

## Delay Exchange Plugin
* https://github.com/rabbitmq/rabbitmq-delayed-message-exchange
* A user can declare an exchange with the type x-delayed-message and then publish messages with the custom header x-delay expressing in milliseconds a delay time for the message. The message will be delivered to the respective queues after x-delay milliseconds.

## Dead Letter Exchange
* When you set x-dead-letter-exchange, the message will automatically be sended to this exchange after nack or ttl

## Combine all of above to construct the durable retry machanism by rabbitmq
* Use quorum queue as your working queue and set the redelivery limit
	+ High availability with max retry. 
* Set x-dead-letter-exchange to delay exchange on your working queue
	+ When you nack or ttl the message, the message will be send to delay exchange automatically
* Bind your working queue to delay exchange
	+ The delay exchange will delay your message and send it back to working queue again