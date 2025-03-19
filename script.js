/**
 * 全球网络RTK与PPP服务平台 - 主脚本文件
 * 添加各种交互效果和功能，增强用户体验
 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    // 滚动监听
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 视差滚动效果
        applyParallax();
    });
    
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            authButtons.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 状态点悬停效果
    const statusPoints = document.querySelectorAll('.status-point');
    
    statusPoints.forEach(point => {
        // 创建提示框元素
        const tooltip = document.createElement('div');
        tooltip.className = 'status-tooltip';
        
        // 根据状态设置不同的提示内容
        const status = point.getAttribute('data-status');
        let locationName = '';
        let statusText = '';
        
        // 这里可以根据位置设置不同的地点名称
        switch(true) {
            case (point.style.top === '25%' && point.style.left === '30%'):
                locationName = '欧洲中部网络';
                break;
            case (point.style.top === '40%' && point.style.left === '65%'):
                locationName = '亚洲东部网络';
                break;
            case (point.style.top === '60%' && point.style.left === '45%'):
                locationName = '南美洲网络';
                break;
            case (point.style.top === '35%' && point.style.left === '80%'):
                locationName = '亚太网络';
                break;
            default:
                locationName = '全球网络节点';
        }
        
        // 根据状态设置描述
        switch(status) {
            case 'excellent':
                statusText = '运行状态优秀，延迟<10ms';
                break;
            case 'good':
                statusText = '运行状态良好，延迟<50ms';
                break;
            case 'average':
                statusText = '运行状态一般，延迟<100ms';
                break;
            case 'poor':
                statusText = '运行状态较差，延迟>100ms';
                break;
            default:
                statusText = '状态未知';
        }
        
        tooltip.innerHTML = `
            <h4>${locationName}</h4>
            <p>${statusText}</p>
        `;
        
        // 将提示框添加到状态点中
        point.appendChild(tooltip);
        
        // 添加鼠标事件
        point.addEventListener('mouseenter', function() {
            tooltip.style.display = 'block';
        });
        
        point.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });
    
    // 价格卡片悬停效果增强
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== card) c.classList.add('dimmed');
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.classList.remove('dimmed');
            });
        });
    });
    
    // 全局动画效果
    animateOnScroll();
    
    // 初始化动态数据 - 这里可以模拟或连接到实际API
    initializeDynamicData();
});

// 动态数据初始化（模拟）
function initializeDynamicData() {
    // 这里可以添加API调用来获取实时数据
    console.log('动态数据初始化');
    
    // 模拟客户徽标加载
    const clientLogos = document.querySelectorAll('.client-logo');
    const logoUrls = [
        'https://via.placeholder.com/150x70/1a253c/ffffff?text=客户A',
        'https://via.placeholder.com/150x70/1a253c/ffffff?text=客户B',
        'https://via.placeholder.com/150x70/1a253c/ffffff?text=客户C',
        'https://via.placeholder.com/150x70/1a253c/ffffff?text=客户D',
        'https://via.placeholder.com/150x70/1a253c/ffffff?text=客户E',
        'https://via.placeholder.com/150x70/1a253c/ffffff?text=客户F'
    ];
    
    clientLogos.forEach((logo, index) => {
        if (index < logoUrls.length) {
            logo.style.backgroundImage = `url(${logoUrls[index]})`;
            logo.style.backgroundSize = 'contain';
            logo.style.backgroundPosition = 'center';
            logo.style.backgroundRepeat = 'no-repeat';
        }
    });
}

// 视差滚动效果
function applyParallax() {
    const scrollPosition = window.pageYOffset;
    
    // 为不同元素应用不同的视差效果
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
    
    // 为地球添加视差效果
    const globe = document.querySelector('.globe-animation');
    if (globe) {
        globe.style.transform = `rotate(${scrollPosition * 0.05}deg)`;
    }
}

// 滚动显示动画
function animateOnScroll() {
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .client-logo, .section-header');
    
    // 创建一个Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 观察每个元素
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// 添加CSS样式表以支持JS效果
function addDynamicStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* 导航栏滚动效果 */
        header.scrolled {
            background: rgba(5, 10, 20, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* 移动菜单激活状态 */
        @media screen and (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--color-bg-darker);
                padding: 1rem 0;
                text-align: center;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                z-index: 100;
            }
            
            .auth-buttons.active {
                display: flex;
                justify-content: center;
                margin-top: 1rem;
            }
            
            .menu-toggle.active i::before {
                content: '\\f00d';
            }
        }
        
        /* 状态点提示框 */
        .status-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(12, 18, 33, 0.9);
            padding: 0.75rem 1rem;
            border-radius: var(--border-radius-md);
            width: 200px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 10;
            display: none;
            pointer-events: none;
            margin-bottom: 10px;
        }
        
        .status-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: rgba(12, 18, 33, 0.9) transparent transparent transparent;
        }
        
        .status-tooltip h4 {
            margin-bottom: 0.25rem;
            font-size: 0.9rem;
        }
        
        .status-tooltip p {
            margin-bottom: 0;
            font-size: 0.8rem;
            color: var(--color-text-muted);
        }
        
        /* 价格卡片效果 */
        .pricing-card.dimmed {
            opacity: 0.5;
            transform: scale(0.98);
            filter: grayscale(0.5);
        }
        
        /* 滚动动画 */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(styleSheet);
}

// 添加动态样式
addDynamicStyles(); 