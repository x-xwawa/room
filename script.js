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

function enterHome(){
  if (!gateInput || gateInput.value.trim() === "") {
    gateInput?.focus();
    return;
  }

  gate.classList.add("is-hidden");
  gate.setAttribute("aria-hidden", "true");
}

gateOk?.addEventListener("click", enterHome);

gateInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enterHome();
  }
});

/* ①「すすむ」の遷移先（Pixiv） */
const ONIGIRI_TARGET_URL = "https://www.pixiv.net/users/85762619";

/* 開閉 */
function openModal(){
  modal.classList.add("on");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(){
  modal.classList.remove("on");
  modal.setAttribute("aria-hidden", "true");
}

/* ふわっと遷移（白フェード） */
function fadeAndGoExternal(url){
  fadeLayer.classList.add("on");
  setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");
    fadeLayer.classList.remove("on");
    closeModal();
  }, 350);
}

/* 暗転→ロード→トップへ戻る */
function darkLoadAndReturn(){
  closeModal();
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

/* すすむ → Pixivへ */
btnOk?.addEventListener("click", () => fadeAndGoExternal(ONIGIRI_TARGET_URL));

/* やめる / × / － → 暗転ロードして戻る */
btnCancel?.addEventListener("click", darkLoadAndReturn);
btnClose?.addEventListener("click", darkLoadAndReturn);
btnMin?.addEventListener("click", darkLoadAndReturn);

/* Escで閉じる */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("on")) {
    closeModal();
  }
});

/* 背景クリックで閉じる */
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
