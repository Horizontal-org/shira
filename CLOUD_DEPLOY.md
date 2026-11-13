# Shira Cloud deploy

Shira Cloud requires some extra services on top of Shira Self-hosted,
specially the Library and the Payments processor, which live in separate
repositories.

Deployment is _in the process_ of being automated through Github
Actions, where:

* For `development`, `beta` and `main` branches, container images are
  built and push to [Docker
  Hub](https://hub.docker.com/u/horizontalorg).

* For Library and Payments, the `main` branch is built and pushed to
  Docker Hub as private repositories.

* After a successful build, another Github workflow runs, connecting
  through SSH to the deployment server and running the `deploy.sh`
  script, which basically runs Docker Compose tasks to update the
  service.

  Library and Payments don't have a `deploy.sh` script, they use the
  script from Shira.

## Setting up

### Shira

Currently, the Shira Cloud compose file doesn't run a webserver.  You
need to run a reverse proxy.  These files reside in our Ansible
playbook.

* Create a user for Shira on the deployment server.

* As this user, clone this repository.

* Copy the `.env.sample` file into a `.env` file and fill up the
  variables.  You can use [the self-hosting guide](SELF_HOSTING.md) but
  you'll need some extra variables, specially the Stripe access keys to
  generate payments.

* Run `./deploy.sh`

```sh
adduser shira
su - shira
git clone https://github.com/Horizontal-org/shira
cd shira
cp .env.sample .env
$EDITOR .env
./deploy.sh
```

* If everything works, you can setup the server for remote deployment
  access.

### Server

* Create an SSH key for Github Actions.

* Set it as an authorized key, limiting it to the `deploy.sh` command.

```sh
umask 077 # Prevents SSH complaints about file permissions
ssh-keygen -t ed25519
echo -n 'command="/home/shira/shira/deploy.sh" ' >> ~/.ssh/authorized_keys
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
```

**Note:** Make sure that the `deploy.sh` command and the public key are
on a single line on `authorized_keys`.

### Github

This process needs to be done on the Library and Payments repositories
as well.

* Copy the SSH private key

* Go to the repository on Github and create Action secrets

```sh
cat ~/.ssh/id_ed25519
```

| Secret                   | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `ALPHA_HOST`             | The hostname of the server for alpha deployment.    |
| `ALPHA_USERNAME`         | Username of the user the GH Action will connect to. |
| `ALPHA_KEY`              | The contents of the private key.                    |
| `ALPHA_PORT`             | SSH port number (ie. 22)                            |
| `MATTERMOST_WEBHOOK_URL` | Mattermost webhook to send notifications to.        |


**Note:** Once we move the automated deployment to beta and production,
other variables will appear here.
