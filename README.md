# Spectra-WA

> _“Apa jadinya kalau ChatGPT tinggal di WhatsApp dan bisa lo ajak ngobrol 24/7? Gini nih jadinya.”_  
> — Kanya Ratanak Sros

Bot ini hidup di dalam kegelapan WhatsApp lo. Dibikin pakai Node.js, powered by OpenAI, dan dibungkus pake Baileys MD.  
Ya, semacam asisten digital, tapi lebih mirip hantu AI yang nongkrong di kontak lo.

---

## ⚠️ Syarat Sebelum Nyemplung

Ada dua mode utama:
- `/ai` → buat ngobrol sama ChatGPT
- `/img` → buat manggil DALL·E (teks jadi gambar)

Tapi semua itu **nggak bakal jalan** kalau lo belum kasih dia kunci.

---

## 🔑 Kasih Kunci ke Gerbang

1. Buat dulu API key OpenAI:  
   👉 [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

2. Masukkan ke file `sigil.json` lo, contoh:
   ```json
   {
     "keyopenai": "ISI_APIKEY_OPENAI_DISINI",
     "donasi": "jangan lupa support ya bang :)"
   }
---

## 🧱 Syarat Biologis

* Otak lokal lo minimal Node.js versi 20 ke atas
  👉 [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* Sama Git buat cloning project
  👉 [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

## ⚙️ Cara Bangkitin Bot-nya

```bash
git clone https://github.com/kanyaars/Spectra-Prelude.git
cd Spectra-prelude
npm install
node index.js
```

Kalau gagal? Cek dulu sambungan internet lo. Atau hidup lo. Kadang dua-duanya error.

---

## 🪙 Donasi

Kalau lo ngerasa Spectra ini berguna (atau bikin lo gak kesepian), lo bisa buang receh ke sini:
[KASIH REZEKI LO KE ORANG YANG MEMBUTUHKAN](https://kitabisa.com)

---

## 📜 Lisensi

MIT License.
Dipake? Silakan.
Dimodif? Bebas.
Dijual ulang? Ya jangan gitu-gitu amat lah.

© 2025, mod by **Kanya Ratanak Sros**

---

> *“Spectra bukan bot biasa. Dia dengar. Dia bicara. Dia menyerap keanehan lo.”*

```
