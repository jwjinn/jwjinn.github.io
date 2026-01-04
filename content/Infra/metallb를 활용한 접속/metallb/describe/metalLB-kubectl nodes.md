```shell

kubectl get nodes -o wide
NAME                                       STATUS   ROLES           AGE   VERSION   INTERNAL-IP       EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
nai-gpu-md-0-vcl6p-c9cd7-7zzzl             Ready    <none>          14d   v1.33.2   192.168.120.152   <none>        Ubuntu 22.04.5 LTS   6.8.0-87-generic   containerd://1.7.27-d2iq.1
nai-gpu-md-0-vcl6p-c9cd7-8fk7z             Ready    <none>          14d   v1.33.2   192.168.120.90    <none>        Ubuntu 22.04.5 LTS   6.8.0-87-generic   containerd://1.7.27-d2iq.1
nai-gpu-md-0-vcl6p-c9cd7-8rvzn             Ready    <none>          14d   v1.33.2   192.168.120.137   <none>        Ubuntu 22.04.5 LTS   6.8.0-87-generic   containerd://1.7.27-d2iq.1
nai-gpu-md-0-vcl6p-c9cd7-z5slr             Ready    <none>          14d   v1.33.2   192.168.120.58    <none>        Ubuntu 22.04.5 LTS   6.8.0-87-generic   containerd://1.7.27-d2iq.1
nai-gpu-worker-0-2j2tg-xz8nc-gqj2j-s7rw5   Ready    <none>          10d   v1.33.2   192.168.120.175   <none>        Ubuntu 22.04.5 LTS   6.5.0-45-generic   containerd://1.7.27-d2iq.1
nai-gpu-worker-0-hkxm2-gwzhl-zsnvh-mp2gt   Ready    <none>          14d   v1.33.2   192.168.120.81    <none>        Ubuntu 22.04.5 LTS   6.5.0-45-generic   containerd://1.7.27-d2iq.1
nai-gpu-worker-0-hkxm2-gwzhl-zsnvh-smbgq   Ready    <none>          14d   v1.33.2   192.168.120.85    <none>        Ubuntu 22.04.5 LTS   6.5.0-45-generic   containerd://1.7.27-d2iq.1
nai-gpu-wpqs6-f58rj                        Ready    control-plane   23d   v1.33.2   192.168.120.57    <none>        Ubuntu 22.04.5 LTS   6.8.0-87-generic   containerd://1.7.27-d2iq.1
nai-gpu-wpqs6-p2z7w                        Ready    control-plane   23d   v1.33.2   192.168.120.59    <none>        Ubuntu 22.04.5 LTS   6.8.0-87-generic   containerd://1.7.27-d2iq.1
nai-gpu-wpqs6-smtlk                        Ready    control-plane   23d   v1.33.2   192.168.120.136   <none>        Ubuntu 22.04.5 LTS   6.8.0-87-generic   containerd://1.7.27-d2iq.1

```