// 初始化 ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const texts = gsap.utils.toArray('.scroll-change-text');
const images = gsap.utils.toArray('.scroll-change-content-col');

// 初始化时隐藏所有图片
images.forEach(img => gsap.set(img, { opacity: 0 }));

// 创建滚动触发器
ScrollTrigger.create({
    trigger: ".scroll-change-text-and-img",
    start: "top top",  // 开始时顶部对齐
    end: () => "+=" + (window.innerHeight * texts.length/3),  // 根据文本数量来设置滚动范围
    pin: true,  // 固定内容
    scrub: 1,  // 平滑滚动
    markers: true,
    onUpdate: self => {
        let index = Math.floor(self.progress * texts.length);  // 根据滚动进度计算当前显示的内容
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
            scale: 1,
            opacity: i === index ? 1 : 0,
            duration: 1,
            display: i === index ? 'flex' : 'none', // 使用字符串
        });
    });
}

// 确保在页面加载时，第一个 .content-col 已经显示
document.addEventListener('DOMContentLoaded', () => {
    switchContent(0); // 设置初始状态
    ScrollTrigger.refresh(); // 初次载入时刷新 ScrollTrigger
});

// 记录当前窗口宽度
let currentWidth = window.innerWidth;

// 防抖动函数
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 在窗口大小变化时，检查宽度变化并重新加载页面
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth !== currentWidth) {
        location.reload();  // 重新加载页面
    }
}, 1000));  // 设置200毫秒的延迟


// 计算滚动范围并设置 footer 位置
const scrollRange = window.innerHeight * texts.length/3;  // 计算滚动范围
const footer = document.querySelector('#home-section6');
footer.style.marginTop = `${scrollRange}px`;  // 根据滚动范围设置 footer 的 margin-top
