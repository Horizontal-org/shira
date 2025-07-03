### for garage.toml

rpc_secret = "$(openssl rand -hex 32)"
admin_token = "$(openssl rand -base64 32)"
metrics_token = "$(openssl rand -base64 32)"


> after upping the docker container I recommend creating an alias for the garage command `alias garage="docker exec -ti <container name> /garage"`

### for setting up cluster

`garage layout assign -z dc1 -c 10G <node_id>`

> where <node_id> corresponds to the identifier of the node shown by garage status (first column). You can enter simply a prefix of that identifier. For instance here you could write just garage layout assign -z dc1 -c 1G 563e.

#### apply layout

`garage layout apply --version 1`


#### create a bucket

`garage bucket create shira-main-bucket`

for info of the bucket:

```
garage bucket list
garage bucket info shira-main-bucket
```


#### create an API key

The shira-main-bucket bucket now exists on the Garage server, however it cannot be accessed until we add an API key with the proper access rights.

`garage key create shira-main-app-key`

The output should look as follows:

```
Key name: nextcloud-app-key
Key ID: GK3515373e4c851ebaad366558
Secret key: 7d37d093435a41f2aab8f13c19ba067d9776c90215f56614adad6ece597dbb34
Authorized buckets:
```

Check that everything works as intended:

```
garage key list
garage key info shira-main-app-key
```

Now that we have a bucket and a key, we need to give permissions to the key on the bucket:

```
garage bucket allow \
  --read \
  --write \
  --owner \
  shira-main-bucket \
  --key shira-main-app-key
```

You can check at any time the allowed keys on your bucket with:

garage bucket info shira-main-bucket


> I recommend installing minio client for debugging if necessary

```
mc alias set \
  garage \
  http://localhost:3900 \
  key_id \
  key_secret \
  --api S3v4
```

Some commands:
```
# list buckets
mc ls garage/

# list objets in a bucket
mc ls garage/my_files

# copy from your filesystem to garage
mc cp /proc/cpuinfo garage/my_files/cpuinfo.txt

# copy from garage to your filesystem
mc cp garage/my_files/cpuinfo.txt /tmp/cpuinfo.txt

# mirror a folder from your filesystem to garage
mc mirror --overwrite ./book garage/garagehq.deuxfleurs.fr
```
