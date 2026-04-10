/**
 * 💡 專家提示：修改此處的 USERNAME 即可切換顯示的帳號
 */
const CONFIG = {
    USERNAME: 'shyutw', // ⬅️ 請填入你的 GitHub 帳號
    REPO_COUNT: 6           // 想要顯示的專案數量
};

async function initPortfolio() {
    const listElement = document.getElementById('repo-list');
    
    try {
        const response = await fetch(
            `https://api.github.com/users/${CONFIG.USERNAME}/repos?sort=updated&per_page=${CONFIG.REPO_COUNT}`
        );
        
        if (!response.ok) throw new Error('API 連線失敗');
        
        const repos = await response.json();

        // 使用現代 Map 語法渲染 HTML
        listElement.innerHTML = repos.map(repo => `
            <article class="repo-card">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <p>${repo.description || '這個專案還在醞釀更有趣的描述...'}</p>
                <div class="meta">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>🏷️ ${repo.language || 'Plain Text'}</span>
                </div>
            </article>
        `).join('');

    } catch (error) {
        listElement.innerHTML = `<p class="loading">⚠️ 載入失敗：請確認帳號名稱是否正確或稍後再試。</p>`;
        console.error(error);
    }
}

// 執行初始化
initPortfolio();
