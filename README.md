# dendenAR
自分個人のARカードと褒めたもんのARカードのためのリポジトリ

`assets/qrcode/mycard_denden.png` のマーカーをカメラにかざすと、アイコンの周りに各種リンクが表示されます。

## 技術スタック
- [A-Frame](https://aframe.io/) 1.6.0
- [AR.js](https://github.com/AR-js-org/AR.js) 3.4.8（マーカーベース）

どちらも CDN から読み込むのでビルドは不要です。

## ローカルで動かす
カメラを使うため `localhost` か HTTPS で配信する必要があります。

```sh
npx serve .
```

リンクの追加・変更は `main.js` の `LINKS` を編集してください。
