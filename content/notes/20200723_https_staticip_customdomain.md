---
title: 'Https + Static IP + Custom Domain + GKE'
date: 2020-07-23
tags: ['gcloud']
draft: false
hide: false
---

+ Pre-requirements
    * Cloud Console > VPC Network > External IP Address to get static ip
    * Use [Google Domains](https://domains.google.com) to buy your own domain.

+ Bind Domain, SSL Certificate, Static IP and App
    * Use GKE ManagedCertificate to bind domain and ssl certificate
    * Use GKE Ingress and Service to bind static ip and your app
    * Use Cloud DNS to bind your domain and static ip

https://cloud.google.com/kubernetes-engine/docs/how-to/managed-certs
