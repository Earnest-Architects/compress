// ---------------------------------------------------------------
//  設定ファイル
// ---------------------------------------------------------------
window.APP_CONFIG = {
  // 「動画エディター」タブに表示する OpenCut の URL。
  //   https://opencut.app      … 公開版（安定版 / classic）。既定値
  //   https://new.opencut.app  … 書き直し中の新バージョン（開発中）
  //   http://localhost:3000    … 自分で動かした OpenCut（README を参照）
  VIDEO_EDITOR_URL: "https://opencut.app",

  // 「Office」タブ（ONLYOFFICE / WASM）の x2t 変換エンジンの URL（x2t.js と x2t.wasm を置いたフォルダ）。
  //   空なら公開 CDN を使用。自分のサーバーに置く場合は例: "/office/x2t"
  OFFICE_X2T_URL: ""
};
