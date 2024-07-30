# Yacht ダイスゲーム

Yachtは、人気のあるゲームYahtzeeに似たダイスゲームです。このREADMEは、ゲームの概要、遊び方、ルールについて説明します。

## 目次
1. [概要](#概要)
2. [遊び方](#遊び方)
3. [ルール](#ルール)
4. [得点計算](#得点計算)
5. [使用方法](#使用方法)

## 概要
Yachtは、5つの6面ダイスを使用してプレイするゲームです。プレイヤーはダイスを最大3回まで振り、ポイントを最大化するために特定の組み合わせを目指します。
今回は、一人用モードを実装しました。

## 遊び方
1. 5つのダイスをすべて振ります。
2. キープするダイスを選び、残りを再度振ります。
3. ダイスをもう2回まで振り直すことができます。
4. 得点カテゴリーを選び、スコアを計算します。
5. すべてのカテゴリーが埋まったらゲーム終了です。

## ルール
- プレイヤーは各ターンでダイスを最大3回まで振ることができます。
- 最初と2回目の振りの後、プレイヤーは任意の数のダイスをキープし、残りを再度振ることができます。
- 3回目の振りの後、プレイヤーは得点カテゴリーを選び、スコアを記録しなければなりません。
- 各得点カテゴリーはゲームごとに1回しか使用できません。

## 得点計算
ゲームは12の得点カテゴリーで構成されています：
1. **エース**: 1の目の合計。
2. **デュース**: 2の目の合計。
3. **スリー**: 3の目の合計。
4. **フォー**: 4の目の合計。
5. **ファイブ**: 5の目の合計。
6. **シックス**: 6の目の合計。
7. **フルハウス**: 同じ目が3つと2つ（例：3-3-3-2-2）、スコア：ダイスの合計。
8. **フォーダイス**: 同じ目が4つ、スコア：ダイスの合計。
9. **ショートストレート**: 4つの目の連続（例：1-2-3-4）、スコア：30点。
10. **ビッグストレート**: 5つの目の連続（例：2-3-4-5-6）、スコア：30点。
11. **チョイス**: 任意のダイスの組み合わせ、スコア：ダイスの合計。
12. **ヨット**: 5つのダイスすべてが同じ目、スコア：50点。

## 使用方法
1. プロジェクトディレクトリに移動します。
2. `yacht.html`ファイルをブラウザで開きます。
3. 画面右側の「振る」をクリックしてスタートです。