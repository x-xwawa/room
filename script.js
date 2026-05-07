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
const gateInput = document.getElementById("gate-input");
const gateOk = document.getElementById("gate-ok");

window.addEventListener("load", () => {
  gateInput?.focus();
});

/* 入力欄に何か入っている時だけホームへ進む */
function enterHome(){
  if (!gateInput || gateInput.value.trim() === "") {
    gateInput?.focus();
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

/* pixivの遷移先 */
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

/* ふわっと遷移 */
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

/* すすむ → pixivへ */
btnOk?.addEventListener("click", () => {
  fadeAndGoExternal(ONIGIRI_TARGET_URL);
});

/* やめる / × / － → 暗転ロードして戻る */
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
