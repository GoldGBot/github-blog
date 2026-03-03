document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.post-card, .topic-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    document.querySelectorAll('.code-block').forEach(block => {
        // Only add copy button if there's no heading (to avoid conflicts)
        const parent = block.parentElement;
        if (!parent.querySelector('h4')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = 'Copy';
            copyBtn.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                padding: 4px 12px;
                font-size: 0.75rem;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                color: var(--text-secondary);
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;
            
            block.style.position = 'relative';
            block.appendChild(copyBtn);
            
            block.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });
            
            block.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });
            
            copyBtn.addEventListener('click', async () => {
                const code = block.querySelector('code')?.textContent || block.textContent;
                try {
                    await navigator.clipboard.writeText(code);
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.color = 'var(--accent-primary)';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                        copyBtn.style.color = 'var(--text-secondary)';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        }
    });
    // Homepage category filter & date sort
    const postsGrid = document.querySelector('.posts-grid');
    const categoryTabs = document.querySelectorAll('.category-tab');

    if (postsGrid) {
        const cards = Array.from(postsGrid.querySelectorAll('.post-card'));

        // Sort by data-date (newest first)
        cards
            .sort((a, b) => {
                const da = a.dataset.date || '';
                const db = b.dataset.date || '';
                return db.localeCompare(da);
            })
            .forEach(card => postsGrid.appendChild(card));

        // Category filter
        if (categoryTabs.length) {
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const current = tab.dataset.category;
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    cards.forEach(card => {
                        const cat = card.dataset.category || 'all';
                        card.style.display =
                            current === 'all' || current === cat ? '' : 'none';
                    });
                });
            });
        }
    }

    // One-click share (homepage cards + post pages)
    function buildAbsoluteUrl(relativePath) {
        try {
            return new URL(relativePath, window.location.href).href;
        } catch {
            return window.location.href;
        }
    }

    async function handleShareClick(btn) {
        const explicitUrl = btn.getAttribute('data-url');
        const explicitTitle = btn.getAttribute('data-title');

        const url = explicitUrl ? buildAbsoluteUrl(explicitUrl) : window.location.href;
        const title = explicitTitle || document.title;

        try {
            if (navigator.share) {
                await navigator.share({ title, url });
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                const original = btn.textContent;
                btn.textContent = '链接已复制';
                btn.style.color = 'var(--accent-primary)';
                setTimeout(() => {
                    btn.textContent = original;
                    btn.style.color = '';
                }, 2000);
            }
        } catch (e) {
            console.error('Share failed', e);
        }
    }

    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => handleShareClick(btn));
    });
});
