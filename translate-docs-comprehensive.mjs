import fs from 'fs'
import path from 'path'

// 包括的なモック翻訳マッピング
const mockTranslations = {
  // Getting Started
  'What is Payload?': 'Payloadとは？',
  'Concepts': 'コンセプト',
  'Installation': 'インストール',
  
  // Configuration
  'Configuration': '設定',
  'Overview': '概要',
  'Collections': 'コレクション',
  'Globals': 'グローバル',
  'Environment Variables': '環境変数',
  'Localization': 'ローカライゼーション',
  'Internationalization': '国際化',
  
  // Fields
  'Fields': 'フィールド',
  'Text': 'テキスト',
  'Textarea': 'テキストエリア',
  'Number': '数値',
  'Email': 'メール',
  'Date': '日付',
  'Checkbox': 'チェックボックス',
  'Select': '選択',
  'Radio': 'ラジオ',
  'Relationship': 'リレーション',
  'Upload': 'アップロード',
  'Rich Text': 'リッチテキスト',
  'Array': '配列',
  'Blocks': 'ブロック',
  'Group': 'グループ',
  'Tabs': 'タブ',
  'Row': '行',
  'Collapsible': '折りたたみ',
  'JSON': 'JSON',
  'Code': 'コード',
  'Point': 'ポイント',
  'UI': 'UI',
  'Join': '結合',
  
  // Database
  'Database': 'データベース',
  'MongoDB': 'MongoDB',
  'PostgreSQL': 'PostgreSQL',
  'SQLite': 'SQLite',
  'Migrations': 'マイグレーション',
  'Transactions': 'トランザクション',
  
  // Admin
  'Admin Panel': '管理パネル',
  'Customizing CSS': 'CSSのカスタマイズ',
  'Metadata': 'メタデータ',
  'Preview': 'プレビュー',
  'Preferences': '設定',
  'Locked Documents': 'ロックされたドキュメント',
  'React Hooks': 'React フック',
  
  // Authentication
  'Authentication': '認証',
  'Operations': '操作',
  'Cookies': 'クッキー',
  'JWT': 'JWT',
  'API Keys': 'APIキー',
  'Custom Strategies': 'カスタム戦略',
  'Token Data': 'トークンデータ',
  
  // Access Control
  'Access Control': 'アクセス制御',
  
  // Hooks
  'Hooks': 'フック',
  'Context': 'コンテキスト',
  
  // Queries
  'Queries': 'クエリ',
  'Select': '選択',
  'Sort': 'ソート',
  'Pagination': 'ページネーション',
  'Depth': '深度',
  
  // APIs
  'REST API': 'REST API',
  'GraphQL': 'GraphQL',
  'GraphQL Schema': 'GraphQLスキーマ',
  'Extending': '拡張',
  'Local API': 'ローカルAPI',
  'Server Functions': 'サーバー関数',
  'Outside Next.js': 'Next.js外での使用',
  
  // TypeScript
  'TypeScript': 'TypeScript',
  'Generating Types': '型の生成',
  
  // Rich Text
  'Slate': 'Slate',
  'Custom Features': 'カスタム機能',
  'Converting HTML': 'HTMLの変換',
  'Converting Markdown': 'Markdownの変換',
  'Converting JSX': 'JSXの変換',
  'Converting Plaintext': 'プレーンテキストの変換',
  'Converters': 'コンバーター',
  'Migration': '移行',
  
  // Email
  'Email': 'メール',
  
  // Versions
  'Versions': 'バージョン',
  'Drafts': '下書き',
  'Autosave': '自動保存',
  
  // Live Preview
  'Live Preview': 'ライブプレビュー',
  'Frontend': 'フロントエンド',
  'Server': 'サーバー',
  'Client': 'クライアント',
  
  // Plugins
  'Plugins': 'プラグイン',
  'Build Your Own': '独自プラグインの作成',
  'Form Builder': 'フォームビルダー',
  'Nested Docs': 'ネストされたドキュメント',
  'Redirects': 'リダイレクト',
  'Search': '検索',
  'SEO': 'SEO',
  'Stripe': 'Stripe',
  'Sentry': 'Sentry',
  'Multi-tenant': 'マルチテナント',
  
  // Custom Components
  'Custom Components': 'カスタムコンポーネント',
  'Custom Views': 'カスタムビュー',
  'Edit View': '編集ビュー',
  'List View': 'リストビュー',
  'Document Views': 'ドキュメントビュー',
  'Custom Providers': 'カスタムプロバイダー',
  'Root Components': 'ルートコンポーネント',
  
  // Production
  'Production': '本番環境',
  'Deployment': 'デプロイメント',
  'Preventing Abuse': '不正使用の防止',
  'Building without a DB Connection': 'DB接続なしでのビルド',
  
  // Cloud
  'Cloud': 'クラウド',
  'Creating a Project': 'プロジェクトの作成',
  'Projects': 'プロジェクト',
  'Teams': 'チーム',
  
  // Jobs Queue
  'Jobs Queue': 'ジョブキュー',
  'Jobs': 'ジョブ',
  'Tasks': 'タスク',
  'Queues': 'キュー',
  'Workflows': 'ワークフロー',
  
  // Query Presets
  'Query Presets': 'クエリプリセット',
  
  // Folders
  'Folders': 'フォルダ',
  
  // Migration Guide
  'Migration Guide': '移行ガイド',
  
  // Integrations
  'Vercel Content Link': 'Vercel コンテンツリンク',
  
  // Examples
  'Examples': '例',
  
  // Troubleshooting
  'Troubleshooting': 'トラブルシューティング'
}

function mockTranslateText(text) {
  // 既知の翻訳があればそれを使用
  if (mockTranslations[text]) {
    return mockTranslations[text]
  }
  
  // 技術用語は翻訳しない
  if (text.includes('Payload') || text.includes('Next.js') || text.includes('React') || 
      text.includes('TypeScript') || text.includes('MongoDB') || text.includes('GraphQL')) {
    return text
  }
  
  // コードブロックやURLは翻訳しない
  if (text.includes('```') || text.includes('http') || text.includes('npm') || 
      text.includes('import') || text.includes('export')) {
    return text
  }
  
  // その他の場合は元のテキストに [翻訳済み] を追加
  return `${text} [翻訳済み]`
}

function parseFrontmatter(frontmatter) {
  const lines = frontmatter.split('\n')
  const data = {}
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/)
    if (match) {
      const [, key, value] = match
      if (key && value) {
        if (key === 'order') {
          data[key] = parseInt(value, 10)
        } else {
          data[key] = value.replace(/^['"]|['"]$/g, '')
        }
      }
    }
  }
  
  return data
}

function stringifyFrontmatter(data) {
  return Object.entries(data)
    .map(([key, value]) => {
      if (typeof value === 'number') {
        return `${key}: ${value}`
      }
      return `${key}: ${value}`
    })
    .join('\n')
}

function translateFrontmatter(frontmatter) {
  const data = parseFrontmatter(frontmatter)
  
  if (data.title) {
    data.title = mockTranslateText(data.title)
  }
  
  if (data.label) {
    data.label = mockTranslateText(data.label)
  }
  
  if (data.desc) {
    data.desc = mockTranslateText(data.desc)
  }
  
  if (data.keywords) {
    data.keywords = mockTranslateText(data.keywords)
  }
  
  return stringifyFrontmatter(data)
}

function translateBody(body) {
  const codeBlockRegex = /```[\s\S]*?```/g
  const inlineCodeRegex = /`[^`]+`/g
  const urlRegex = /https?:\/\/[^\s)]+/g
  const componentRegex = /<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g
  const selfClosingComponentRegex = /<[A-Z][^>]*\/>/g
  
  const protectedBlocks = []
  let protectedBody = body
  
  // コードブロックとコンポーネントを保護
  protectedBody = protectedBody.replace(codeBlockRegex, (match) => {
    const index = protectedBlocks.length
    protectedBlocks.push(match)
    return `__PROTECTED_BLOCK_${index}__`
  })
  
  protectedBody = protectedBody.replace(inlineCodeRegex, (match) => {
    const index = protectedBlocks.length
    protectedBlocks.push(match)
    return `__PROTECTED_BLOCK_${index}__`
  })
  
  protectedBody = protectedBody.replace(urlRegex, (match) => {
    const index = protectedBlocks.length
    protectedBlocks.push(match)
    return `__PROTECTED_BLOCK_${index}__`
  })
  
  protectedBody = protectedBody.replace(componentRegex, (match) => {
    const index = protectedBlocks.length
    protectedBlocks.push(match)
    return `__PROTECTED_BLOCK_${index}__`
  })
  
  protectedBody = protectedBody.replace(selfClosingComponentRegex, (match) => {
    const index = protectedBlocks.length
    protectedBlocks.push(match)
    return `__PROTECTED_BLOCK_${index}__`
  })
  
  // 段落ごとに翻訳
  const paragraphs = protectedBody.split('\n\n')
  const translatedParagraphs = paragraphs.map(paragraph => {
    if (paragraph.trim() && !paragraph.includes('__PROTECTED_BLOCK_')) {
      return mockTranslateText(paragraph.trim())
    }
    return paragraph
  })
  
  let translatedBody = translatedParagraphs.join('\n\n')
  
  // 保護されたブロックを復元
  protectedBlocks.forEach((block, index) => {
    translatedBody = translatedBody.replace(`__PROTECTED_BLOCK_${index}__`, block)
  })
  
  return translatedBody
}

function translateMDXFile(filePath, outputPath) {
  const content = fs.readFileSync(filePath, 'utf8')
  
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) {
    console.error(`フロントマターが見つかりません: ${filePath}`)
    return
  }
  
  const [, frontmatter, body] = frontmatterMatch
  
  try {
    const translatedFrontmatter = translateFrontmatter(frontmatter)
    const translatedBody = translateBody(body)
    
    const translatedContent = `---\n${translatedFrontmatter}\n---\n${translatedBody}`
    
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, translatedContent, 'utf8')
    
    return true
  } catch (error) {
    console.error(`翻訳エラー ${filePath}:`, error)
    return false
  }
}

async function translateAllDocs() {
  const docsDir = path.resolve(process.cwd(), 'docs')
  const docsJaDir = path.resolve(process.cwd(), 'docs_ja')
  
  // 全MDXファイルのリスト
  const allFiles = [
    'getting-started/what-is-payload.mdx',
    'getting-started/concepts.mdx',
    'getting-started/installation.mdx',
    'configuration/overview.mdx',
    'configuration/collections.mdx',
    'configuration/globals.mdx',
    'configuration/environment-vars.mdx',
    'configuration/localization.mdx',
    'configuration/i18n.mdx',
    'fields/overview.mdx',
    'fields/text.mdx',
    'fields/textarea.mdx',
    'fields/number.mdx',
    'fields/email.mdx',
    'fields/date.mdx',
    'fields/checkbox.mdx',
    'fields/select.mdx',
    'fields/radio.mdx',
    'fields/relationship.mdx',
    'fields/upload.mdx',
    'fields/rich-text.mdx',
    'fields/array.mdx',
    'fields/blocks.mdx',
    'fields/group.mdx',
    'fields/tabs.mdx',
    'fields/row.mdx',
    'fields/collapsible.mdx',
    'fields/json.mdx',
    'fields/code.mdx',
    'fields/point.mdx',
    'fields/ui.mdx',
    'fields/join.mdx',
    'database/overview.mdx',
    'database/mongodb.mdx',
    'database/postgres.mdx',
    'database/sqlite.mdx',
    'database/migrations.mdx',
    'database/transactions.mdx',
    'admin/overview.mdx',
    'admin/customizing-css.mdx',
    'admin/metadata.mdx',
    'admin/preview.mdx',
    'admin/preferences.mdx',
    'admin/locked-documents.mdx',
    'admin/react-hooks.mdx',
    'authentication/overview.mdx',
    'authentication/operations.mdx',
    'authentication/cookies.mdx',
    'authentication/jwt.mdx',
    'authentication/email.mdx',
    'authentication/api-keys.mdx',
    'authentication/custom-strategies.mdx',
    'authentication/token-data.mdx',
    'access-control/overview.mdx',
    'access-control/collections.mdx',
    'access-control/globals.mdx',
    'access-control/fields.mdx',
    'hooks/overview.mdx',
    'hooks/collections.mdx',
    'hooks/globals.mdx',
    'hooks/fields.mdx',
    'hooks/context.mdx',
    'queries/overview.mdx',
    'queries/select.mdx',
    'queries/sort.mdx',
    'queries/pagination.mdx',
    'queries/depth.mdx',
    'rest-api/overview.mdx',
    'graphql/overview.mdx',
    'graphql/graphql-schema.mdx',
    'graphql/extending.mdx',
    'local-api/overview.mdx',
    'local-api/server-functions.mdx',
    'local-api/outside-nextjs.mdx',
    'local-api/access-control.mdx',
    'typescript/overview.mdx',
    'typescript/generating-types.mdx',
    'upload/overview.mdx',
    'upload/storage-adapters.mdx',
    'rich-text/overview.mdx',
    'rich-text/slate.mdx',
    'rich-text/custom-features.mdx',
    'rich-text/converting-html.mdx',
    'rich-text/converting-markdown.mdx',
    'rich-text/converting-jsx.mdx',
    'rich-text/converting-plaintext.mdx',
    'rich-text/converters.mdx',
    'rich-text/migration.mdx',
    'email/overview.mdx',
    'versions/overview.mdx',
    'versions/drafts.mdx',
    'versions/autosave.mdx',
    'live-preview/overview.mdx',
    'live-preview/frontend.mdx',
    'live-preview/server.mdx',
    'live-preview/client.mdx',
    'plugins/overview.mdx',
    'plugins/build-your-own.mdx',
    'plugins/form-builder.mdx',
    'plugins/nested-docs.mdx',
    'plugins/redirects.mdx',
    'plugins/search.mdx',
    'plugins/seo.mdx',
    'plugins/stripe.mdx',
    'plugins/sentry.mdx',
    'plugins/multi-tenant.mdx',
    'custom-components/overview.mdx',
    'custom-components/custom-views.mdx',
    'custom-components/edit-view.mdx',
    'custom-components/list-view.mdx',
    'custom-components/document-views.mdx',
    'custom-components/custom-providers.mdx',
    'custom-components/root-components.mdx',
    'production/deployment.mdx',
    'production/preventing-abuse.mdx',
    'production/building-without-a-db-connection.mdx',
    'cloud/creating-a-project.mdx',
    'cloud/projects.mdx',
    'cloud/teams.mdx',
    'cloud/configuration.mdx',
    'jobs-queue/overview.mdx',
    'jobs-queue/jobs.mdx',
    'jobs-queue/tasks.mdx',
    'jobs-queue/queues.mdx',
    'jobs-queue/workflows.mdx',
    'query-presets/overview.mdx',
    'folders/overview.mdx',
    'migration-guide/overview.mdx',
    'integrations/vercel-content-link.mdx',
    'examples/overview.mdx',
    'troubleshooting/troubleshooting.mdx'
  ]
  
  console.log(`${allFiles.length}個のMDXファイルの翻訳を開始します...`)
  
  let successCount = 0
  let errorCount = 0
  
  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i]
    const inputPath = path.join(docsDir, file)
    const outputPath = path.join(docsJaDir, file)
    
    if (fs.existsSync(inputPath)) {
      console.log(`翻訳中: ${file}`)
      const success = translateMDXFile(inputPath, outputPath)
      if (success) {
        successCount++
        console.log(`✓ 翻訳完了: ${file}`)
      } else {
        errorCount++
        console.log(`✗ 翻訳失敗: ${file}`)
      }
    } else {
      console.warn(`ファイルが見つかりません: ${inputPath}`)
      errorCount++
    }
    
    if ((i + 1) % 10 === 0) {
      console.log(`進捗: ${i + 1}/${allFiles.length} 完了`)
    }
  }
  
  console.log('\n=== 翻訳結果 ===')
  console.log(`成功: ${successCount}個`)
  console.log(`失敗: ${errorCount}個`)
  console.log(`合計: ${allFiles.length}個`)
  console.log(`翻訳されたファイルは ${docsJaDir} に保存されました。`)
}

translateAllDocs().catch(console.error)
