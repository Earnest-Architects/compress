# Kikaku Platform

画像圧縮を「メイン」に、複数のツールをタブで切り替えて使えるWebアプリです。ビルド手順は不要で、静的サイト（GitHub Pages、Netlify、Vercel など）としてそのままデプロイできます。

## タブ

|タブ|内容|ファイル|
|-|-|-|
|画像圧縮|Squish。ブラウザ内で JPEG / PNG / WebP を圧縮（アップロードなし）|`squish.html`|
|フォトエディター|Photopea を日本語表示で埋め込み|`editor.html`|
|Excelビューア|.xlsx / .xls / .csv などをブラウザで表示・印刷（外部送信なし）|`excel/index.html`|
|動画エディター|OpenCut（無料のオープンソース動画エディター）を埋め込み|`config.js` で URL を指定|

* `index.html` がタブの土台（メインページ）です。
* 各タブは最初に開いたときに読み込まれ、切り替えても状態（開いた画像・Excel など）は保持されます。
* `#squish` `#photo` `#excel` `#video` を URL の末尾に付けると、そのタブで直接開けます（例：`index.html#excel`）。
* 各ページは単体でも開けます（`squish.html`、`excel/index.html` など）。

## フォルダ構成

```
index.html        … タブの土台（メイン）
squish.html       … 画像圧縮
editor.html       … フォトエディター（Photopea）
excel/            … Excelビューア（独自の sw.js / manifest を含む）
config.js         … 動画エディターの URL 設定
logo.png, icon-\*.png, manifest.json, sw.js
```

## 動画エディター（OpenCut）の設定

`config.js` の `VIDEO\_EDITOR\_URL` を書き換えます。

```js
window.APP\_CONFIG = {
  VIDEO\_EDITOR\_URL: "https://opencut.app"   // 既定：公開版（classic）
};
```

* `https://opencut.app` … 公開されている安定版（classic）。既定値です。
* `https://new.opencut.app` … 書き直し中の新バージョン（開発中）。
* 自分でホスティングする場合は、[opencut-app/opencut-classic](https://github.com/opencut-app/opencut-classic) を取得して、その URL を指定します。
Next.js アプリで、データベース（PostgreSQL）と Redis が必要です。手順の概要：

  1. `cp apps/web/.env.example apps/web/.env.local`
  2. `docker compose up -d db redis serverless-redis-http`
  3. `bun install` → `bun dev:web`（`http://localhost:3000`）
  4. `VIDEO\_EDITOR\_URL: "http://localhost:3000"` に変更

### 注意

* 外部サイトを iframe で表示するため、**相手側の設定によっては埋め込みが拒否される**ことがあります。その場合は、動画エディタータブ上部の「新しいタブで開く ↗」を使ってください。
* 埋め込み表示では、ブラウザの仕様により、保存されるプロジェクトのデータが opencut.app を直接開いた場合とは別扱いになることがあります。
* OpenCut は MIT ライセンスです。

## アプリ（PWA）として Windows にインストール

1. Edge/Chrome でサイトを開きます。
2. アドレスバーの「インストール」アイコンをクリックします（またはメニュー ⋮ →「アプリ」→「このサイトをアプリとしてインストール」）。
3. インストール後、アプリを開き、タスクバーのアイコンを右クリック →「**タスクバーにピン留めする**」。

