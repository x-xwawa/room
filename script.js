const modal = document.getElementById("modal");
const btnOnigiri = document.getElementById("btn-onigiri");

const btnOk = document.getElementById("btn-ok");
const btnCancel = document.getElementById("btn-cancel");
const btnClose = document.getElementById("btn-close");
const btnMin = document.getElementById("btn-min");

const loading = document.getElementById("loading");
const fadeLayer = document.getElementById("fade-layer");

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
    // 外部は新しいタブで開く（安全設定つき）
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
    // ページ先頭へ（スクロール禁止でも確実）
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

/* Escで閉じる（閉じるだけ。戻る演出にしたいならdarkLoadAndReturnに変更OK） */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("on")) {
    closeModal();
  }
});

/* 背景クリックで閉じる（不要なら消してOK） */
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
