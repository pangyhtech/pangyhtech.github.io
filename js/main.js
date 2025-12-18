// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 表单提交处理
document.querySelector('.contact-form form').addEventListener('submit', function(e) {  // Changed selector to target the form
    e.preventDefault();
    
    const contact = document.querySelector('input[type="text"]').value;
    const message = document.querySelector('textarea').value;
    
    if (!contact || !message) {
        alert('请填写所有字段');
        return;
    }
    
    // 清空表单
    this.reset();
    alert('Sending an email directly is more efficient！');
});

// 汉堡菜单交互
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// =
=================== MY STORY SECTION ANIMATIONS ====================

// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            element.classList.add('animated');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for Story Section
const storySection = document.querySelector('#Story');
let countersAnimated = false;

if (storySection) {
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                // Animate counters
                const counters = document.querySelectorAll('.city-counter');
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 300);
                });
                countersAnimated = true;
            }
        });
    }, {
        threshold: 0.3
    });
    
    storyObserver.observe(storySection);
}

// Add sparkle effects to story section
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'story-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Periodically add sparkles to story section
if (storySection) {
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            createSparkle(storySection);
        }
    }, 800);
}
