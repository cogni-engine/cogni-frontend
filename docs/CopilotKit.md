# CopilotKit

## CopilotTextarea

`@copilotkit/react-textarea`の`CopilotTextarea`コンポーネントは、AI補完機能付きのテキストエリアです。ユーザーが入力すると自動的に提案を表示し、Tabキーで受け入れることができます。また、Cmd/Ctrl+Kで表示されるホバリングエディタを使用して、プロンプトに基づいたテキストの挿入や編集が可能です。

## useCopilotReadable

`useCopilotReadable`は、アプリの状態や情報をCopilotKitのコンテキストに登録するReactフックです。`description`と`value`を指定して呼び出すと、その情報がAIのコンテキストに含まれ、CopilotTextareaの提案やチャットで参照されます。`categories`パラメータで分類することで、必要な箇所でのみ利用できます。

## Contextの扱い

CopilotKitは2種類のコンテキストを管理します：

1. **テキストコンテキスト**: `useCopilotReadable`で登録された文字列データ。階層構造（親子関係）を保持し、`categories`でフィルタリングされます。
2. **ドキュメントコンテキスト**: `DocumentPointer`形式で登録されたドキュメント。ファイル参照や検索に使用されます。

`getContextString()`と`getDocumentsContext()`は、指定されたカテゴリに一致するコンテキストを抽出し、AIのシステムプロンプトに組み込まれます。
