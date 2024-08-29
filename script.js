gsap.registerPlugin(ScrollTrigger);

const texts = gsap.utils.toArray('.text');
const images = gsap.utils.toArray('.content-col');

// 初始化時隱藏所有圖片
images.forEach(img => gsap.set(img, { opacity: 0 }));

// 創建滾動觸發器
ScrollTrigger.create({
    trigger: ".scroll-change-text-and-img",
    start: "top top",  // 開始時頂部對齊
    end: () => "+=" + (window.innerHeight * texts.length),  // 根據文本數量來設置滾動範圍
    pin: true,  // 固定內容
    scrub: 1,  // 平滑滾動
    onUpdate: self => {
        let index = Math.floor(self.progress * texts.length);  // 根據滾動進度計算當前顯示的內容
        switchContent(index);
    }
});

function switchContent(index) {
    texts.forEach((text, i) => {
        gsap.to(text, {
            opacity: i === index ? 1 : 0.2,
            duration: 1,
            scale: i === index ? 1 : 0.8,
        });
    });
    images.forEach((col, i) => {
        gsap.to(col, {
            scale:1,
            opacity: i === index ? 1 : 0,
            duration: 1,
        });
    });
}
// 確保在頁面加載時，第一個 .content-col 已經顯示
document.addEventListener('DOMContentLoaded', () => {
    switchContent(0); // 設置初始狀態
});
// 計算滾動範圍並設置 footer 位置
const scrollRange = window.innerHeight * texts.length;  // 計算滾動範圍
const footer = document.querySelector('.footer');
footer.style.marginTop = `${scrollRange}px`;  // 根據滾動範圍設置 footer 的 margin-top