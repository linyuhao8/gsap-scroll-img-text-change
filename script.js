gsap.registerPlugin(ScrollTrigger);

const texts = gsap.utils.toArray('.text');
const images = gsap.utils.toArray('.image');

// 初始化時隱藏所有圖片
images.forEach(img => gsap.set(img, { opacity: 0 }));

// 創建滾動觸發器
ScrollTrigger.create({
    trigger: ".content",
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
        gsap.to(text, { opacity: i === index ? 1 : 0.2, duration: 1,scale: i === index ? 1.3 : 1 });
    });
    images.forEach((img, i) => {
        gsap.to(img, { opacity: i === index ? 1 : 0, duration: 1 });
    });
}
