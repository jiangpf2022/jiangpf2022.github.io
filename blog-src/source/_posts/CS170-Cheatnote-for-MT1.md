---
title: test1
date: 2024-11-13 15:38:22
tags:
mathjax: true
# password: jiangpf2022
wrong_pass_message: Please contact the author for the password.
published : false
---
{% raw %}
<!-- [Cheatnote](files/cs170-cheatnote-mt2.pdf) -->
可下载版本
<embed src="https://jiangpf2022.github.io/blog/files/cs170-cheatnote-mt2.pdf" width="100%" height="600px" type="application/pdf">
不可下载版本
<div style="position: relative; width: 100%; height: 1400px;">
    <iframe src="/blog/files/cs170-cheatnote-mt2.pdf" width="100%" height="1400px" style="border: none;"></iframe>
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0);"></div>
</div>

<!-- 前半部分可见内容 -->
<p>这是前半部分的内容，所有用户都可以看到。</p>

<!-- 加密内容 -->
<div id="locked-content" class="blurred">
    <!-- 不可操作的前10%覆盖层 -->
    <div class="overlay"></div>

    <p>这是后半部分的内容，输入密码后可见。</p>
    <embed src="https://jiangpf2022.github.io/blog/files/cs170-cheatnote-mt2.pdf" width="100%" height="600px" type="application/pdf">
</div>

<!-- 密码输入框 -->
<div id="password-area">
    <label for="password-input">输入密码查看剩余内容：</label>
    <input type="password" id="password-input">
    <button onclick="unlockContent()">解锁</button>
    <p id="error-message" style="color: red; display: none;">密码错误，请重试。</p>
</div>

<script>
    function unlockContent() {
        const correctPassword = 'jiangpf2022';
        const userInput = document.getElementById('password-input').value;
        const lockedContent = document.getElementById('locked-content');
        const overlay = document.querySelector('.overlay');
        const errorMessage = document.getElementById('error-message');

        if (userInput === correctPassword) {
            // 移除模糊效果并确保显示内容
            lockedContent.classList.remove('blurred');
            lockedContent.classList.add('clear');
            document.getElementById('password-area').style.display = 'none';
            
            // 隐藏覆盖层
            overlay.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        }
    }
</script>

<style>
    .blurred {
        filter: blur(8px);
        transition: filter 0.3s ease;
        position: relative;
    }

    .clear {
        filter: none;
    }

    /* 前30%的覆盖层 */
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30%; /* 覆盖前30%区域 */
        background-color: rgba(255, 255, 255, 0); /* 透明 */
        pointer-events: all; /* 禁止鼠标操作 */
        z-index: 1; /* 保证覆盖在内容上方 */
    }
</style>
{% endraw %}