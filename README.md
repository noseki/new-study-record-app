# 学習記録アプリ

エンジニアとしての学習時間は1000時間が必要と言われており、<br/>
日々勉強を頑張る方向けの学習内容と学習時間を記録できるWebアプリです。

## 機能概要

- 学習内容と学習時間を登録/削除できる
- 登録した記録は一覧表示される
- 学習時間の合計値が分かる

## 技術スタック

- **フロントエンド**: React 19
- **バックエンド**: Supabase
- **ビルドツール**: Vite
- **テスト**: Vitest, react-testing-library
- **デプロイ**: Firebase Hosting

## 環境設定

### 1. リポジトリをクローン

```bash
git clone https://github.com/noseki/new-study-record-app.git
cd new-study-record-app
```

### 2. 依存関係のインストール

前提：**Node.js**がインストールされている必要があります

```bash
npm install
```

### 3. 環境変数の設定

[Supabase](https://supabase.com)にてアカウントおよびプロジェクトを作成し、
.envファイルをプロジェクトルート下に作成し、以下の内容を記載してください。

```bash
# SupabaseのプロジェクトID（「Project Settings」>「Data API」内のAPI URL ）
VITE_SUPABASE_URL=https://XXXXXXXXXXXXXXX.supabase.co
# SupabaseのAPI KEY（「Project Settings」>「API Keys」>「Legacy anon, service_role API keys」タブ内のanon/public key）
VITE_SUPABASE_ANON_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Supabaseのプロジェクト内で下記内容の`study-record`テーブルを用意してください。

| カラム名 | 型 | 説明 |
|----------|-----|------|
| id | uuid | 主キー |
| title | text | 学習内容 |
| time | numeric | 学習時間（時間単位） |
| created_at | timestamp | 作成日時 |

### 4. 起動方法（開発サーバー）

```bash
npm run dev
```
