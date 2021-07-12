
 window.onload = function(){  
const WIDTH = 500;
const HEIGHT = 500;

//
// 前準備。
//

// canvas要素を作る。
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

// コンテキストを取得しておく。
const context = canvas.getContext('2d');

// body要素に追加する。
document.body.appendChild(canvas);

//
// メイン処理。
//

// 表示する円を管理する配列を作成しておく。
// 少ない場合（1個とか2個とか）はいらないかも。
const circles = [];

// 円を追加する。
// ここでは円はx,y,radius（半径）を持ったオブジェクト。
// 単なるオブジェクトのかわりにCircleクラスを作っても良いかも。
circles.push({x:150, y:150, radius: 50});
circles.push({x:350, y:350, radius: 50});

// ループさせる関数。
// 前の描画を消す→オブジェクトの状態を更新する→オブジェクトを描画する→次のフレームに移る
// の繰り返し。
function loop(timestamp) {
  // 前の描画を消す。
  // 背景色が欲しい場合はかわりにfillRectを使い、
  //    context.fillStyle = 'rgb(255, 0, 0)';
  //    context.fillRect(0, 0, WIDTH, HEIGHT);
  // のようにする。
  context.clearRect(0, 0, WIDTH, HEIGHT);
  
  // 各円の状態を更新する。
  for(const c of circles) {
    if(c.radius < 100) { c.radius ++; } // どんどん大きくなって…
    else { c.radius = 50; } // しぼむ
  }

  // 各円を描画する。
  for(const c of circles) {
    context.beginPath();
    context.fillStyle = 'rgb(0, 0, 0)'; // 黒色
    context.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
    context.fill();
  }
  
  // requestAnimationFrameを呼び出す。
  // requestAnimationFrameは1度の呼び出しで1回しか実行してくれないため
  // 毎回呼び出す必要がある。
  window.requestAnimationFrame((ts) => loop(ts));
}

// requestAnimationFrameを1回だけ呼び出す。
// あとはloop関数の中でrequestAnimationFrameが呼び出され
// その中でloop関数が実行され、そのloop関数の中でrequestAnimationFrameが…
// となるので永遠にアニメーションが続く。
window.requestAnimationFrame((ts) => loop(ts));


}



    
