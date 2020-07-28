---
title: 'GKE Service Account Using Workload Identity'
date: 2020-07-24
tags: ['gcloud']
draft: false
hide: false
---

[GKE Workload Identity(Kubernetes Service Account)](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity?hl=zh-tw)

1. Enable Workload Identity of your GKE cluster
2. Create Google Cloud Service Account
3. Create Kubernetes Service Account
4. Link GSA and KSA
5. Link Pod and KSA: `spec.template.spec.serviceAccountName: KSA name`