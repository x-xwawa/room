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
