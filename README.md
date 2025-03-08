# tcu-dc-web

東京都市大学デジタルコンテンツ研究会 公式サイトのソースコードです。

## サイト更新マニュアル

サイト更新のためのマニュアルは以下のリンクからアクセスできます。

- https://tcu-dc.github.io/docs/website/readme.html

## 使用技術

| 言語 | 開発環境 | ヘッドレスCMS | デプロイ |
| - | - | - | - |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)<br>![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)<br>![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | ![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)<br>![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)<br>![Stylelint](https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white)<br>![Github Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) | ![MicroCMS](https://img.shields.io/badge/microcms-000000?style=for-the-badge) | ![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=Cloudflare%20Pages&logoColor=white) |

## コンテンツ管理（ヘッドレスCMS）

サイト内コンテンツの管理には、[microCMS](https://microcms.io/) を利用しています。

以下のリンクから microCMS の管理画面にアクセスできます。

- https://app.microcms.io/signin

## デプロイ

本リポジトリの `main` ブランチに push もしくは microCMS のコンテンツを更新すると、[Cloudflare Pages](https://pages.cloudflare.com/) に自動デプロイされます。

ビルド時に静的な HTML ファイルを生成する（SSG）ため、サイトに更新が反映されるまで数分かかります。

Next.js プロジェクトを Cloudflare Pages にデプロイするために、[@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages) を利用しています。

本プロジェクトは Cloudflare Pages にデプロイ済みですが、現在の設定を削除し再デプロイする場合には以下の設定が必要です。

- `設定 > 変数とシークレット` にて、環境変数を追加（設定内容は `.env.example` 参照）

- `設定 > ランタイム > 互換性フラグ` にて `nodejs_compat` を追加して保存

## Getting Started

### 環境構築

ローカルでの開発に加えて、 Devcontainer の利用が可能です。

#### ローカルで環境構築を行う場合

##### 推奨環境

- Node `22.1.0`
- npm `10.7.0`

##### 手順

1. リポジトリのクローン

```
git clone https://github.com/TCU-DC/tcu-dc-web.git
cd tcu-dc-web
```

2. 依存関係のインストール

```
npm install
```

3. 環境変数を設定

ルートに `.env.local` を作成し、 `.env.example` の説明通りに変数を設定してください。

```
BASE_URL=your-base-url
MICROCMS_SERVICE_DOMAIN=your-microcms-service-domain
MICROCMS_API_KEY=your-microcms-api-key
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### Devcontainer を利用する場合

##### 必要環境

- Visual Studio Code (VSCode) 
- Docker

##### 手順

1. VSCode の拡張機能 [Dev Containers](vscode:extension/ms-vscode-remote.remote-containers) をインストール
2. リポジトリのクローン
3. VSCode でコンテナを実行
4. Docker イメージのダウンロード、依存関係のインストール完了を待つ
5. 環境変数を設定

### 開発方法

下記コマンドを実行すると開発サーバーが起動します。

 `http://localhost:3000` にアクセスすると、サイトが表示されます。

```
npm run dev
```

## microCMS の API スキーマを更新した場合


1. `microcms/api-schema` に microCMS からエクスポートした json を格納
2. 下記コマンドの実行で、 `src/types/microcms` に型定義が出力される

```
npx microcms-generate-types microcms/api-schema src/types/microcms
```

3. 状況に応じて、 `src/types/microcms` 以下のファイルを編集

## Contact

作成者の連絡先です。何かあれば連絡してください。

- info[at]shotaro.jp
