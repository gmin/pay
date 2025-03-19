// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 登录注册模态框控制
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    const closeBtns = document.querySelectorAll('.close-btn');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // 打开登录模态框
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });
    
    // 打开注册模态框
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'block';
    });
    
    // 关闭所有模态框
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    // 切换到注册
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    // 切换到登录
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target == registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    // 价格切换（月/年）
    const pricingToggle = document.getElementById('pricing-toggle');
    const pricingAmounts = document.querySelectorAll('.amount');
    const pricingPeriods = document.querySelectorAll('.period');
    
    // 存储月度价格
    const monthlyPrices = Array.from(pricingAmounts).map(el => el.textContent);
    
    pricingToggle.addEventListener('change', function() {
        if (this.checked) {
            // 年度价格（月度价格 * 10 = 2个月免费）
            pricingAmounts.forEach((el, index) => {
                const yearlyPrice = Math.round(parseInt(monthlyPrices[index]) * 10);
                el.textContent = yearlyPrice;
            });
            pricingPeriods.forEach(el => {
                el.textContent = '/年';
            });
        } else {
            // 恢复月度价格
            pricingAmounts.forEach((el, index) => {
                el.textContent = monthlyPrices[index];
            });
            pricingPeriods.forEach(el => {
                el.textContent = '/月';
            });
        }
    });
    
    // 创建虚拟站点指示器 - 在地图上添加闪烁点
    const stationIndicators = document.querySelector('.station-indicators');
    
    // 只有在页面中存在地图元素时才执行
    if (stationIndicators) {
        // 创建50个随机分布的站点指示器
        for (let i = 0; i < 50; i++) {
            createStationIndicator();
        }
    }
    
    function createStationIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('station-indicator');
        
        // 设置随机位置
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // 设置随机闪烁频率
        const animationDuration = 1.5 + Math.random() * 3;
        
        // 设置站点样式
        indicator.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${top}%;
            width: 6px;
            height: 6px;
            background-color: var(--tech-cyan);
            border-radius: 50%;
            box-shadow: 0 0 5px var(--tech-cyan), 0 0 10px var(--tech-cyan);
            opacity: 0.8;
            animation: pulse-station ${animationDuration}s infinite alternate;
        `;
        
        stationIndicators.appendChild(indicator);
    }
    
    // 添加脉动动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-station {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
    
    // 表单提交处理
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加AJAX请求发送登录数据到服务器
            alert('登录功能尚未实现 - 将连接到后端API');
            loginModal.style.display = 'none';
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的客户端密码匹配验证
            const password = document.getElementById('reg-password').value;
            const passwordConfirm = document.getElementById('reg-password-confirm').value;
            
            if (password !== passwordConfirm) {
                alert('两次输入的密码不匹配，请重新输入！');
                return;
            }
            
            // 这里可以添加AJAX请求发送注册数据到服务器
            alert('注册功能尚未实现 - 将连接到后端API');
            registerModal.style.display = 'none';
        });
    }
    
    // 为服务状态添加数据更新模拟效果
    const progressBars = document.querySelectorAll('.progress');
    const metricValues = document.querySelectorAll('.metric-value');
    
    if (progressBars.length > 0) {
        // 每隔30秒更新一次状态数据（模拟实时监控）
        setInterval(function() {
            progressBars.forEach((bar, index) => {
                // 在95-100%之间随机变化，模拟高可用系统的波动
                const newValue = 95 + Math.random() * 5;
                bar.style.width = `${newValue}%`;
                
                if (metricValues[index]) {
                    metricValues[index].textContent = `${newValue.toFixed(1)}%`;
                }
            });
        }, 30000);
    }
    
    // 添加滚动动画效果
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .client-card');
    
    // 创建观察器实例
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    
    // 添加初始隐藏类和动画样式
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        .service-card, .pricing-card, .client-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(fadeStyle);
    
    // 观察每个元素
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // 模拟更新服务状态数据
    simulateServiceUpdates();
});

// 模拟服务状态更新
function simulateServiceUpdates() {
    // 模拟服务连接状态改变
    const statusBadge = document.querySelector('.status-badge');
    
    if (statusBadge) {
        // 服务状态有98%的时间是正常的，1%警告，1%错误（随机模拟）
        setInterval(function() {
            const rand = Math.random() * 100;
            
            if (rand > 98) {
                // 临时服务问题
                statusBadge.textContent = '部分区域服务延迟';
                statusBadge.className = 'status-badge warning';
                
                // 5秒后恢复
                setTimeout(function() {
                    statusBadge.textContent = '运行良好';
                    statusBadge.className = 'status-badge optimal';
                }, 5000);
            } else if (rand > 99) {
                // 严重问题（极少发生）
                statusBadge.textContent = '服务中断';
                statusBadge.className = 'status-badge critical';
                
                // 3秒后恢复
                setTimeout(function() {
                    statusBadge.textContent = '运行良好';
                    statusBadge.className = 'status-badge optimal';
                }, 3000);
            }
        }, 60000); // 每分钟检查一次
    }
} 