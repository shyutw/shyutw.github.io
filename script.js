// =========================================
// 設定區
// =========================================
const GITHUB_USERNAME = 'shyutw';
const REPO_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// 針對 shyutw.github.io 的「內容 API」路徑
const TEEC_REPO_NAME = 'shyutw.github.io';
const FOLDERS_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${TEEC_REPO_NAME}/contents/`;

// 隱藏不需要顯示的系統資料夾或檔案 (可自行增減)
const IGNORE_FOLDERS = ['.git', '.github', 'css', 'js', 'assets', 'images'];

// =========================================
// 功能 1：渲染標準 GitHub Repositories
// =========================================
async function renderRepositories() {
    const container = document.getElementById('repo-container');
    try {
        const response = await fetch(REPO_API_URL);
        if (!response.ok) throw new Error('API 讀取失敗');
        const repos = await response.json();
        container.innerHTML = ''; 

        repos.forEach(repo => {
            if (!repo.fork && repo.name !== TEEC_REPO_NAME) { // 排除 fork 與主網域專案本身
                const card = document.createElement('div');
                card.className = 'repo-card';
                card.setAttribute('data-aos', 'fade-up');
                
                const desc = repo.description || '這個專案還沒有寫說明。';
                const language = repo.language || 'Code';

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
                container.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Repos 讀取錯誤:', error);
        container.innerHTML = '<p class="status-msg" style="color: #ff7b72;">讀取專案失敗。</p>';
    }
}

// =========================================
// 功能 2：渲染 shyutw.github.io 內的資料夾專案
// =========================================
async function renderFolderProjects() {
    const container = document.getElementById('teec-container');
    try {
        const response = await fetch(FOLDERS_API_URL);
        if (!response.ok) throw new Error('API 讀取失敗');
        const contents = await response.json();
        container.innerHTML = '';

        contents.forEach(item => {
            // 只篩選出「資料夾」(dir)，並且排除不想顯示的系統資料夾
            if (item.type === 'dir' && !IGNORE_FOLDERS.includes(item.name)) {
                
                const card = document.createElement('div');
                card.className = 'repo-card';
                card.setAttribute('data-aos', 'fade-up');

                // 資料夾沒有原生 description 和 star，我們自訂顯示內容
                // 網址直接指向你的靜態網頁路徑
                const projectUrl = `https://${TEEC_REPO_NAME}/${item.name}/`;

                card.innerHTML = `
                    <div class="repo-name">
                        <a href="${projectUrl}" target="_blank">📁 ${item.name}</a>
                    </div>
                    <div class="repo-desc">託管於 GitHub Pages 的靜態網頁專案。</div>
                    <div class="repo-meta">
                        <span><span class="language-dot" style="background-color: #e34c26;"></span>Web Page</span>
                    </div>
                `;
                container.appendChild(card);
            }
        });
        
        // 如果完全沒有符合的資料夾
        if (container.innerHTML === '') {
            container.innerHTML = '<p class="status-msg">目前沒有找到公開的網頁專案。</p>';
        }

    } catch (error) {
        console.error('Folders 讀取錯誤:', error);
        container.innerHTML = '<p class="status-msg" style="color: #ff7b72;">讀取資料夾失敗。</p>';
    }
}

// =========================================
// 啟動程式 (同時執行兩隻 API)
// =========================================
renderRepositories();
renderFolderProjects();
