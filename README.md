# GUIDE



## BACKEND

### Set up database

#### Instal mongodb

Tergantung distro yang dipilih, misalkan untuk distro debian dan turunannya. Atau dapat menggunakan docker.

```sh
#username dan password menyesuaikan
mongosh -u nayanika -p Nayanika170845 --authenticationDatabase admin

```

Alternatif menggunakan docker:

```sh
#lihat pada untuk versi spesifik (https://hub.docker.com/_/mongo)
docker pull mongodb/mongodb-community-server

#run command
docker run -d \
--name mongo \
-v mongodb_data:/data/db \
-e MONGO_INITDB_ROOT_USERNAME=nayanika \
-e MONGO_INITDB_ROOT_PASSWORD=Nayanika170845 \
-p 27017:27017 \
mongodb/mongodb-community-server:latest

#melihat proses/container
docker container ls

#akses ke shell mongodb
docker exec -it mongo mongosh -u nayanika -p Nayanika170845 --authenticationDatabase admin
```

#### Buat database

Setelah masuk ke shell mongodb, buat database baru dan buat user baru.

```js
// nama database bebas
use galeri-nayanika

// Credentials ini yang dipakai untuk koneksi backend ke db
db.createUser({ user: 'nayanika-admin', pwd: "Nayanik4-170845", roles: [{ role: "readWrite", db: "galeri-nayanika"}]})
```

