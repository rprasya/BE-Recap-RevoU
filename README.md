# Simple app for my application project using Express.JS & Prisma

# Langkah-langkah pengerjaan project ini:

1. inisiasi project npm dengan menggunakan comment `npm init -y`
2. update package.json dengan menambahkan script seperti

```json
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
  },
```

3. Install package yang di perlukan

```bash
npm install express mysql2 dotenv cors
```

4. install devDependency karena pake nodemon

```bash
npm install -D nodemon
```

5. lalu akan ada `node_modules` dan `package-lock.json` yang dibuat secara otomatis oleh `npm` dimana jangan diubah isinya oleh kita sendiri dan jangan pula untuk di push ke `Github!` soalnya nanti bakal nyusahin orang

6. biar `node_modules` dan `.env` tidak push ke `Github` kita akan bikin satu file namanya `.gitignore` biar `node_modules` dan `.env` tidak ikut ke upload ke git

7. kalau males bisa lewat git bash atau terminal pake commend ini

```bash
echo node_modules >> .gitignore
```

8. inisiasi project dengan membuat satu file entrypoint, di sini gw pakenya `index.js` kalian bebas kasih namanya mau `app.js` atau `server.js` gapapa yang penting jangan kasih nama yang gajelas.

9. kalau udah bikin file tadi, bisa update `package.json` dimana script untuk memulai aplikasi backend harus ke entrypoint file yang kalian tentukan tadi, contoh kalo gw pake entrypointnya `index.js` berarti di script jadinya

```json
"script": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
}
```

10. import express, dotenv, dan package lain yang awal kita install tadi, bikin satu rute untuk mencoba apakah aplikasi kalian bisa jalan atau tidak

contohnya:

```JS
require("dotenv").config()
const express = require("express");
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// GET
app.get("/", async (req, res) => {
    res.send("here is the response")
});

// Wrong Url API
app.all("*", async (req, res) => {
    res.json({
        message: "Routes you're looking is not found"
    })
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is already running at ${PORT}`)
});
```
11. lanjut dalam inregrasi project ini dengan prisma, agar kita bisa terhubung dengan database dan melakukan pengambilan/masukin data ke database dengan [prisma](https://prisma.io)

12. inisiasi project npm yang ingin di integasikan dengan prisma, kita harus install dulu prismanya

```bash
npm install -D prisma
```

13. inisiasi prisma
```bash
prisma init
```

by default prisma akan menginisiasi project dengan database postgresql, kalu ingin memakai databasenya mysql kalian bisa pakai command

```bash
npx prisma init --datasource-provider mysql
```

14. lalu akan ada code tambahan file `.env` yaitu `DATABASE_URL` dimana nanti kalian harus isi sesuai dengan DATABASE_URL kalian, bisa di isi pake DATABASE_URL dari `railway` atau kalau jalanin di local pake yang localhost dulu aja `DATABASE_URL="mysql://root:qweasd@localhost:8111/backend_recap"`. dan ada satu file khusus yang ke generate sebuah folder yang bernama `prisma` nama filenya `schema.prisma` dimana kalian harus mendefinisikan model kalian disitu sesuai dengan perencanaan yang kalian sudah rencanakan  

15. install extension vscode prisma kalo ingin berwarna syntaxnya

16. kita bisa buat `schema` database dari yang udah kita rencanain dalam file `schema.prisma` dimana ada syntaxnya sendiri, kalian bisa baca dokumentasinya di link [ini] 

contoh model dari `schema` yang di bikin

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// add your model here, sesuaikan dengan yang sudah direncanakan
model Product {
  id Int @id @default(autoincrement())
  name String
  price Int
  imageUrl String? //arti (?) not required, kalo pengen dibikin datanya kosong
  catalogId Int?
  createdAt DateTime @default(now())
  // untuk menambahkan relasi dari product ke catalog, dimana Product boleh gapunya catalog
  Catalog Catalog? @relation(fields: [catalogId], references: [id])
}

model Catalog {
  id Int @id @default(autoincrement())
  name String
  // untuk nambahin relasi antara catalog dengan product
  products Product[] // ini artinya catalog punya banyak product
}

model Message {
  id Int @id @default(autoincrement())
  name String
  email String
  message String @db.Text // (@db.Text) biar bisa nyimpen pesan dengan karakter yang panjang
  createdAt DateTime @default(now())

}
```

17. setelah kita define model di `schema.prisma` kita bisa melakukan synchronization database kita dengan schema yang udah di buat tadi, dengan command

```bash
npx prisma migrate dev --name <nama_apa_yang_kalian_lakukan>
```

<nama_Apa_yang_kalian_lakukan> bisa di ganti dengan aktifitas yang sebelumnya kalian lakukan, contoh :
1. inisialisasi 
2. add_new_model_User
3. add_relation_to_catalog_and_product

`npx prisma -migrate dev` wajib kalian lakukan setiap kali kalian sudah selesai mengubah schema.prisma atau adanya perubahan pada schema kalian, agar database selalu ter-singkronisasi

atau apabila kalian ingin melakukan singkronisasi dengan cara lain di prisma bisa dengan cara
`npx prisma db push`