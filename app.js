const personas = {
  student: {
    number: "01", title: "效率敏感型学生", subtitle: "高频学习 · 低至中预算 · 愿意尝鲜", color: "var(--yellow)",
    quote: "“别直接替我写答案，帮我更快理解、整理和复习。”",
    scenes: ["课件与论文速读", "课堂录音整理", "语言学习与备考"],
    needs: ["结果可追溯", "降低理解门槛", "跨设备随时使用"],
    concerns: ["免费额度与订阅价格", "引用真实性", "学术诚信边界"],
    priorities: ["拍照/文档识别", "知识点解释", "个性化复习推荐"]
  },
  professional: {
    number: "02", title: "结果导向型职场人", subtitle: "高频办公 · 中预算 · 重视可靠性", color: "color-mix(in oklch, var(--green) 55%, white)",
    quote: "“少做重复工作，但输出必须可控、可编辑、能协作。”",
    scenes: ["会议纪要与待办", "报告/邮件初稿", "资料检索与汇总"],
    needs: ["节省流程时间", "融入现有工具", "多人协作与版本管理"],
    concerns: ["数据安全", "内容准确率", "格式与品牌一致性"],
    priorities: ["多模态识别", "结构化生成", "企业知识库检索"]
  },
  consumer: {
    number: "03", title: "体验驱动型年轻消费者", subtitle: "碎片化生活 · 弹性预算 · 重视新鲜感", color: "color-mix(in oklch, var(--purple) 35%, white)",
    quote: "“要懂我的偏好，但别替我做决定，也别打扰我。”",
    scenes: ["旅行与消费决策", "内容创作与分享", "耳机/眼镜等智能硬件"],
    needs: ["低学习成本", "自然有趣的交互", "跨场景连续体验"],
    concerns: ["隐私与监听感", "推荐同质化", "硬件续航和兼容性"],
    priorities: ["语音/视觉交互", "创意内容生成", "情境化推荐"]
  }
};

const features = [
  ["识别", "把纸质/屏幕信息转为可处理内容", "OCR、语音转写、物体与场景识别", "减少手动录入，让现实信息成为任务起点", "识别准确率；纠错耗时"],
  ["识别", "从大量材料中找到关键信息", "文档解析、要点提取、实体识别", "缩短阅读路径，保留原文定位", "完成时间；引用点击率"],
  ["交互", "用自然方式表达复杂意图", "多轮对话、语音交互、追问澄清", "无需学习复杂命令，逐步收敛结果", "首轮成功率；平均轮次"],
  ["交互", "随时修改结果而非重新开始", "局部编辑、版本对比、可撤销操作", "提升控制感，降低试错成本", "编辑成功率；撤销率"],
  ["生成", "快速获得可用的内容初稿", "摘要、邮件、报告、图片与方案生成", "从零到一提速，把时间留给判断", "首次可用率；导出率"],
  ["生成", "让输出适配受众和渠道", "语气、长度、格式与品牌模板", "减少二次排版，保持表达一致", "修改幅度；模板复用率"],
  ["推荐", "在信息过载中做下一步选择", "基于目标、历史与情境的个性化推荐", "降低决策成本，及时发现相关内容", "采纳率；负反馈率"],
  ["推荐", "建立持续学习或工作节奏", "任务提醒、复习计划、智能工作流", "在合适时间推进任务，而非泛化打扰", "7 日复用率；关闭提醒率"]
];

function renderPersona(key) {
  const p = personas[key];
  document.querySelector("#persona-panel").innerHTML = `
    <div class="persona-identity" style="--persona-color:${p.color}">
      <span class="number">${p.number}</span><h3>${p.title}</h3><p>${p.subtitle}</p>
    </div>
    <div class="persona-details" style="--persona-color:${p.color}">
      <p class="persona-quote">${p.quote}</p>
      <div class="persona-grid">
        <div><h4>使用场景</h4><ul>${p.scenes.map(x => `<li>${x}</li>`).join("")}</ul></div>
        <div><h4>核心需求</h4><ul>${p.needs.map(x => `<li>${x}</li>`).join("")}</ul></div>
        <div><h4>决策关注</h4><ul>${p.concerns.map(x => `<li>${x}</li>`).join("")}</ul></div>
        <div><h4>功能优先级</h4>${p.priorities.map(x => `<span class="priority">${x}</span>`).join("")}</div>
      </div>
    </div>`;
}

function renderFeatures(filter = "all") {
  const rows = features.filter(row => filter === "all" || row[0] === filter);
  document.querySelector("#feature-rows").innerHTML = rows.map(row => `
    <tr><td><span class="capability">${row[0]}</span></td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td><small>${row[4]}</small></td></tr>`).join("");
}

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(x => { x.classList.remove("active"); x.setAttribute("aria-selected", "false"); });
  tab.classList.add("active"); tab.setAttribute("aria-selected", "true"); renderPersona(tab.dataset.persona);
}));
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(x => x.classList.remove("active")); button.classList.add("active"); renderFeatures(button.dataset.filter);
}));
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark"); localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && matchMedia("(prefers-color-scheme: dark)").matches)) document.body.classList.add("dark");

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); }), { threshold: .08 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
renderPersona("student"); renderFeatures();
