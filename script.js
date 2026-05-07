const modal = document.getElementById("modal");
const btnOnigiri = document.getElementById("btn-onigiri");

const btnOk = document.getElementById("btn-ok");
const btnCancel = document.getElementById("btn-cancel");
const btnClose = document.getElementById("btn-close");
const btnMin = document.getElementById("btn-min");

const loading = document.getElementById("loading");
const fadeLayer = document.getElementById("fade-layer");

/* 最初の入力ウィンドウ */
const gate = document.getElementById("gate");
const gateWindow = document.getElementById("gate-window");
const gateInput = document.getElementById("gate-input");
const gateOk = document.getElementById("gate-ok");

/* ホーム表示後に出るランダム一言ウィンドウ */
const homeMessage = document.getElementById("home-message");
let homeMessageTimer = null;

/*
  7種類の一言ウィンドウ。
  left と top を変えると表示位置が変わります。
  width と height を変えると箱の大きさが変わります。
*/
const HOME_MESSAGES = [
  {
    text: "いつもありがとう！",
    left: "50vw",
    top: "43vh",
    width: "46vw",
    height: "96px",
    align: "center"
  },
  {
    text: "権威に盲従して\n生きたい！",
    left: "4.5vw",
    top: "52vh",
    width: "46vw",
    height: "108px",
    align: "left"
  },
  {
    text: "バスクチーズケーキじゃなくて\nサンセバスチャンチーズケーキ\nってよべ！",
    left: "3vw",
    top: "24vh",
    width: "46vw",
    height: "128px",
    align: "left"
  },
  {
    text: "エーーン\n(ノ_<)。・・°",
    left: "48vw",
    top: "61vh",
    width: "46vw",
    height: "106px",
    align: "center"
  },
  {
    text: "こんな時間まで\nなにしてるの？",
    left: "3vw",
    top: "57vh",
    width: "46vw",
    height: "106px",
    align: "left"
  },
  {
    text: "おはよう！\n早起きしてえらいね",
    left: "4vw",
    top: "25vh",
    width: "46vw",
    height: "108px",
    align: "left"
  },
  {
    text: "わたしも\nだいすきだよ",
    left: "18vw",
    top: "48vh",
    width: "46vw",
    height: "104px",
    align: "center"
  },

  /* 追加ぶん */
  {
    text: "お誕生日\nおめでとう ͈ᴖ ̫ᴖ ͈",
    left: "1.5vw",
    top: "37vh",
    width: "46vw",
    height: "110px",
    align: "left"
  },
  {
    text: "もっとたんぱく質を\n摂ろう",
    left: "50vw",
    top: "49vh",
    width: "46vw",
    height: "110px",
    align: "left"
  },
  {
    text: "おやすみ\nいっぱい寝るんだぞ",
    left: "42vw",
    top: "22vh",
    width: "46vw",
    height: "110px",
    align: "left"
  }
];

/* ランダム一言ウィンドウを表示 */
function showRandomHomeMessage(){
  if (!homeMessage) return;

  const item = HOME_MESSAGES[Math.floor(Math.random() * HOME_MESSAGES.length)];

  homeMessage.classList.remove("is-show");

  homeMessage.textContent = item.text;
  homeMessage.style.setProperty("--home-msg-left", item.left);
  homeMessage.style.setProperty("--home-msg-top", item.top);
  homeMessage.style.setProperty("--home-msg-width", item.width);
  homeMessage.style.setProperty("--home-msg-height", item.height);
  homeMessage.style.setProperty("--home-msg-align", item.align);

  homeMessage.setAttribute("aria-hidden", "false");

  /*
    同じ要素で何度もアニメーションを再生できるようにする処理。
  */
  void homeMessage.offsetWidth;

  homeMessage.classList.add("is-show");

  clearTimeout(homeMessageTimer);
  homeMessageTimer = setTimeout(() => {
    homeMessage.classList.remove("is-show");
    homeMessage.setAttribute("aria-hidden", "true");
  }, 2000);
}

/* 入力欄にフォーカス */
function focusGateInput(){
  if (!gate || gate.classList.contains("is-hidden")) return;
  if (!gateInput) return;

  gateInput.focus({ preventScroll: true });

  const len = gateInput.value.length;

  try{
    gateInput.setSelectionRange(len, len);
  }catch(error){
    /* 一部ブラウザでは不要 */
  }
}

/* ページ読み込み後にフォーカスを試す */
window.addEventListener("load", () => {
  setTimeout(focusGateInput, 300);
});

/* 戻る・再表示時にもフォーカスを試す */
window.addEventListener("pageshow", () => {
  setTimeout(focusGateInput, 300);
});

/*
  iPhone / X内ブラウザでは自動フォーカスが制限されることがあります。
  そのため、ウィンドウ内をタップした時にも入力欄へフォーカスします。
*/
gateWindow?.addEventListener("click", (e) => {
  if (e.target !== gateOk) {
    focusGateInput();
  }
});

gateWindow?.addEventListener("touchstart", (e) => {
  if (e.target !== gateOk) {
    setTimeout(focusGateInput, 0);
  }
}, { passive: true });

/* 入力欄に何か入っている時だけホームへ進む */
function enterHome(){
  if (!gateInput || gateInput.value.trim() === "") {
    focusGateInput();
    return;
  }

  if (!gate) return;

  gate.classList.add("is-hidden");
  gate.setAttribute("aria-hidden", "true");

  showRandomHomeMessage();
}

gateOk?.addEventListener("click", enterHome);

gateInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enterHome();
  }
});

/* Pixiv遷移先 */
const ONIGIRI_TARGET_URL = "https://www.pixiv.net/users/85762619";

/* モーダルを開く */
function openModal(){
  if (!modal) return;

  modal.classList.add("on");
  modal.setAttribute("aria-hidden", "false");
}

/* モーダルを閉じる */
function closeModal(){
  if (!modal) return;

  modal.classList.remove("on");
  modal.setAttribute("aria-hidden", "true");
}

/* 白フェードで外部リンクへ */
function fadeAndGoExternal(url){
  if (!fadeLayer) {
    window.open(url, "_blank", "noopener,noreferrer");
    closeModal();
    return;
  }

  fadeLayer.classList.add("on");

  setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");
    fadeLayer.classList.remove("on");
    closeModal();
  }, 350);
}

/* 暗転ロードしてトップへ戻る */
function darkLoadAndReturn(){
  closeModal();

  if (!loading) {
    window.location.hash = "#top";
    return;
  }

  loading.classList.add("on");
  loading.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    loading.classList.remove("on");
    loading.setAttribute("aria-hidden", "true");
    window.location.hash = "#top";
  }, 900);
}

/* おにぎりクリックでモーダル */
btnOnigiri?.addEventListener("click", openModal);

/* すすむ → Pixiv */
btnOk?.addEventListener("click", () => {
  fadeAndGoExternal(ONIGIRI_TARGET_URL);
});

/* やめる / × / － */
btnCancel?.addEventListener("click", darkLoadAndReturn);
btnClose?.addEventListener("click", darkLoadAndReturn);
btnMin?.addEventListener("click", darkLoadAndReturn);

/* Escで閉じる */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("on")) {
    closeModal();
  }
});

/* 背景クリックで閉じる */
modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
