# Squish — Earnest Architects

Web utama berisi enam tab dalam satu situs statis (tanpa server/backend, tanpa build step):

| Tab | Isi | Sumber |
| --- | --- | --- |
| 画像圧縮 | Squish — kompres JPEG/PNG/WebP langsung di browser | `squish.html` (proyek asli) |
| フォトエディター | Photopea, ditanam dengan bahasa Jepang | `editor.html` |
| Excelビューア | Lihat .xlsx/.xls/.csv di browser | `excel/` (dari `excel-main.zip`) |
| 動画エディター | OpenCut, ditanam lewat iframe | `config.js` mengatur URL-nya |
| 2Dドロワー | openPlan3D — editor floor plan 2D/3D | `plan2d/` (di-build dari `laanlabs/openPlan3D`) |
| 3Dドロワー | Hew — pemodel 3D solid-first | `hew/` (rilis resmi `hew3d/hew` v1.1.0) |

`index.html` adalah halaman utama (shell tab). Setiap tab dimuat sekali saat pertama dibuka dan tetap
mempertahankan statusnya saat pindah tab. Buka langsung ke tab tertentu dengan `#squish` `#photo`
`#excel` `#video` `#draw2d` `#draw3d` di akhir URL.

## Tentang tab 2Dドロワー (openPlan3D)

- Diambil dari [laanlabs/openPlan3D](https://github.com/laanlabs/openPlan3D) (lisensi MIT), di-build
  sendiri sebagai *static single-page app* (adapter statis + hash router) supaya bisa berjalan sebagai
  file biasa di dalam folder `plan2d/`, tanpa server Node.js.
- Endpoint server (upload handoff dari app iOS, "assistant share", MCP) dihapus dari build ini karena
  butuh backend sendiri (Firebase). Fitur inti — gambar, edit, render 3D, export SVG/DXF/PDF/PNG/JSON,
  import JSON/RoomPlan — berjalan penuh secara lokal di browser.
- **Bahasa:** UI-nya sendiri hanya punya English dan Portuguese (belum ada Jepang). Kalau perlu bahasa
  Jepang di tab ini, bisa menyusul sebagai pekerjaan tambahan (dictionary di
  `src/lib/i18n/locales/`), tapi ukurannya besar (±1.400 baris teks) sehingga saya belum menerjemahkannya.

## Tentang tab 3Dドロワー (Hew)

- Diambil dari rilis resmi **v1.1.0** [hew3d/hew](https://github.com/hew3d/hew) (tarball
  `hew-web-v1.1.0.tar.gz` yang sama dengan yang dipakai app.hew3d.com), bukan hasil build dari source —
  Hew memakai kernel geometri Rust/WASM yang butuh toolchain `wasm-pack` untuk dikompilasi, jadi memakai
  rilis resminya lebih aman ketimbang membangunnya ulang di sini.
- Path absolut (`/assets/...`) dalam build diubah menjadi relatif agar bisa disajikan dari folder
  `hew/`, bukan hanya dari root domain.
- **Lisensi: AGPL-3.0.** Ini beda dari tab lain — AGPL mewajibkan kode sumber (termasuk modifikasi)
  tersedia untuk siapa pun yang memakai aplikasinya lewat jaringan. Karena di sini dipakai tanpa
  modifikasi kode, cukup pastikan tautan ke [repo aslinya](https://github.com/hew3d/hew) tetap ada
  (sudah dicantumkan di sini) bila situs ini dipublikasikan.
- **Bahasa:** UI Hew saat ini hanya berbahasa Inggris; proyeknya belum punya sistem i18n.
- Fitur "Open on Phone" (relay) tidak ikut disertakan — itu perlu service `hew-relay` terpisah di server
  Anda sendiri (lihat `docs/SELF_HOSTING.md` di repo Hew jika suatu saat ingin mengaktifkannya).

## Struktur folder

```
index.html        … shell tab (halaman utama)
squish.html       … 画像圧縮
editor.html       … フォトエディター（Photopea）
excel/            … Excelビューア
plan2d/           … 2Dドロワー（openPlan3D, static build）
hew/              … 3Dドロワー（Hew v1.1.0 release）
config.js         … URL 動画エディター（OpenCut）
logo.png, icon-*.png, manifest.json, sw.js
```

## Video editor (OpenCut)

Ubah `config.js`:
```js
window.APP_CONFIG = { VIDEO_EDITOR_URL: "https://opencut.app" };
```
Repo yang diminta (`opencut-app/opencut`) sedang ditulis ulang dari nol dan tidak menghasilkan file
statis; README-nya sendiri mengarahkan ke versi stabil `opencut-classic` yang menjalankan opencut.app.
Karena itu tab ini menanam opencut.app lewat iframe, bukan menyalin kodenya. Jika opencut.app menolak
ditampilkan sebagai iframe, gunakan tombol "新しいタブで開く" di atas tab tersebut. Detail hosting sendiri
ada di README versi sebelumnya / repo `opencut-classic`.

## Catatan lisensi ringkas

| Bagian | Lisensi |
| --- | --- |
| Squish, Excelビューア | milik Anda sendiri |
| Photopea | ditanam sebagai layanan pihak ketiga (bukan open source, gratis untuk dipakai) |
| OpenCut | AGPL-3.0 (ditanam sebagai iframe ke opencut.app, kode tidak disalin) |
| openPlan3D | MIT |
| Hew | AGPL-3.0 + Hew Plugin API Exception |

## Instal sebagai aplikasi (PWA) di Windows
1. Buka situs di Edge/Chrome.
2. Klik ikon "Instal" di address bar (atau menu ⋮ → "Apps" → "Install this site as an app").
3. Setelah terinstal, klik kanan ikon di taskbar → "**Pin to taskbar**".
