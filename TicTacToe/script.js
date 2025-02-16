// 先攻のマーク
const firstMark = '〇';

// 後攻のマーク
const nextMark = '×';

// ターン数
let count = 1;

// ゲーム実行中のフラグ
let isRun = true;

// マス目のIDリスト
const IDs = [
  ['b1', 'b2', 'b3'],
  ['b4', 'b5', 'b6'],
  ['b7', 'b8', 'b9']
];

// IDからオブジェクトを取得する
function $(id) {
  return document.getElementById(id);
}

// 先攻のターンかどうかを判定する
function isFirstMove () {
  let isFirst = count % 2;

  return isFirst == 1;
}

// ターン表示を切り替える
function changeDisplayCount() {
  if (isFirstMove()) {
    // 先攻のターン表示
    $('displayCount').innerHTML = firstMark + "の番";
  } else {
    // 後攻のターン表示
    $('displayCount').innerHTML = nextMark + "の番";
  }
}

// ゲーム終了の判定
function judgeEnd() {
let isEnd = false;

  // 横3マスが同じマークか判定する
  for (let row = 0; row < 3; row++) {
    // 勝敗を判定する
    isEnd = isWin(IDs[row][0], IDs[row][1], IDs[row][2]);
    if (isEnd) {
      displayResult ($(IDs[row][0]).value + "の勝ち！");
      return true;
    }
  }

  // 縦3マスが同じマークか判定する
  for (let col = 0; col < 3; col++) {
    // 勝敗を判定する
    isEnd = isWin(IDs[0][col], IDs[1][col], IDs[2][col]);
    if (isEnd) {
      displayResult ($(IDs[0][col]).value + "の勝ち！");
      return true;
    }
  }

  // 斜め3マスが同じマークか判定する（右下がり）
  isEnd = isWin(IDs[0][0], IDs[1][1], IDs[2][2]);
  if (isEnd) {
    displayResult ($(IDs[0][0]).value + "の勝ち！");
    return true;
  }

  // 斜め3マスが同じマークか判定する（左下がり）
  isEnd = isWin(IDs[0][2], IDs[1][1], IDs[2][0]);
  if (isEnd) {
    displayResult ($(IDs[0][2]).value + "の勝ち！");
    return true;
  }

  // 引き分けの判定
  if (9 <= count) {
    displayResult ("引き分け");
    return true;
  }

  // ゲームが続行する場合はfalseを返す
  return false;
}

// 勝敗を判定する
function isWin (firstId, secondId, thirdId) {
  // 1つ目のマス目が空の場合は終了する
  if ($(firstId).value == '') {
    return false;
  }

  // 2つ目のマス目が空の場合は終了する
  if ($(secondId).value == '') {
    return false;
  }

  // 3つ目のマス目が空の場合は終了する
  if ($(thirdId).value == '') {
    return false;
  }

  // 3つのマス目が同じマークの時は勝利
  if($(firstId).value == $(secondId).value && $(secondId).value == $(thirdId).value) {
    return true;
  }

  //　3つのマークが同じマークじゃない時は勝利ではない
  return false;
}

// 勝敗の結果を表示する
function displayResult(message) {
  $("displayResult").innerHTML = message;
  isRun = false;

  // もう一度遊ぶボタンを表示する
  $('reset').style.display = '';
}

// マスを選択するアクション
function clickAction(event) {
  // ゲーム実行中でなければ何もせずに終了
  if (!isRun) {
    return;
  }

  // イベントからクリックされたマス目のIDを取得する
  let id = event.target.id;

  // IDからオブジェクトを取得する
  let object = $(id);

  // すでにマークが設定されている時はスキップ
  if (object.value != '') {
    return;
  }

  // オブジェクト（マス目）にマークを設定する
  if(isFirstMove()) {
    object.value = firstMark;
  } else {
    object.value = nextMark;
  }

  // ゲーム終了判定
  if (judgeEnd()) {
    return;
  }

  // ターンを+1する
  count++;

  // ターン表示を切り替える
  changeDisplayCount();
}

// もう一度遊ぶボタンが押されたとき
function resetAction() {
  // ターンを1に戻す
  count = 1;
  changeDisplayCount();

  // マス目を空にする
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      $(IDs[row][col]).value = "";
    }
  }

  // 結果の表示をリセットする
  displayResult('');

  // ゲームを実行中に戻す
  isRun = true;

  // もう一度遊ぶボタンを非表示にする
  $('reset').style.display = 'none';
}

// 画面を読み込んだ時の処理
function onloadAction() {
  // マス目にイベントを設定する
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      $(IDs[row][col]).onclick = clickAction;
    }
  }

  // もう一度遊ぶボタンにイベントを設定する
  $('reset').onclick = resetAction;

  // リセットアクションを実行
  resetAction();
}

// 画面読み込み時のイベントを設定
window.onload = onloadAction;