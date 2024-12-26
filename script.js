document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded");

    // 初始化 ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const texts = gsap.utils.toArray('.scroll-change-text');
    const images = gsap.utils.toArray('.scroll-change-content-col');

    function initScrollTrigger() {
        // 清除之前的 ScrollTrigger
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // 创建滚动触发器
        ScrollTrigger.create({
            trigger: ".gsap-scroll-img-text-change-container",
            start: () => window.innerWidth <= 768 ? "-70px top" : "top top",
            end: () => "+=" + (window.innerHeight * texts.length),
            pin: true,
            scrub: true,
            markers: false,
            onUpdate: self => {
                let index = Math.floor(self.progress * texts.length);
                switchContent(index);
            }
        });

        // 计算滚动范围并设置 footer 位置
        const scrollRange = window.innerHeight * texts.length;
        const footer = document.querySelector('#home-section6');
        if (footer) {
            footer.style.marginTop = `${scrollRange}px`;
        }

        ScrollTrigger.refresh(); // 刷新 ScrollTrigger
    }

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
                display: i === index ? 'flex' : 'none',
            });
        });
    }

    // 初始化 ScrollTrigger
    initScrollTrigger();
    switchContent(0);

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

    // 在窗口大小变化时，重新初始化 ScrollTrigger
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth !== currentWidth) {
            currentWidth = window.innerWidth; // 更新当前宽度
            initScrollTrigger(); // 重新初始化 ScrollTrigger
        }
    }, 500)); // 设定500毫秒的延迟

});
