// =========================================
// 設定區
// =========================================
const GITHUB_USERNAME = 'shyutw';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// =========================================
// 負責「組裝單張卡片」的函式
// =========================================
function createRepoCard(repo) {
    const desc = repo.description || '這個專案還沒有寫說明。';
    const language = repo.language || 'Markdown/Other';
    
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.setAttribute('data-aos', 'fade-up'); // 綁定動畫

    card.innerHTML = `
        <div class="repo-name">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </div>
        <div class="repo-desc">${desc}</div>
        <div class="repo-meta">
            <span><span class="language-dot"></span>${language}</span>
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
        </div>
    `;
    return card;
}

// =========================================
// 主程式：抓取資料並渲染 (使用現代 async/await)
// =========================================
async function renderRepositories() {
    const container = document.getElementById('repo-container');

    try {
        // 1. 抓取資料
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API 讀取失敗');
        const repos = await response.json();

        // 2. 清空「載入中」文字
        container.innerHTML = ''; 

        // 3. 處理資料並產生卡片
        repos.forEach(repo => {
            if (!repo.fork) { // 排除別人那裡複製過來的專案
                const card = createRepoCard(repo);
                container.appendChild(card);
            }
        });

    } catch (error) {
        // 錯誤處理
        console.error('讀取發生錯誤:', error);
        container.innerHTML = '<p class="status-msg" style="color: #ff7b72;">讀取專案失敗，請稍後再試。</p>';
    }
}

// =========================================
// 啟動程式
// =========================================
renderRepositories();
