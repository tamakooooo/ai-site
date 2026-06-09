const TYPE_LABELS = {
  general: "产品规划 / 工业化 / 机加",
  development: "研发 / 试制 / 验证",
  "supply-chain": "采购 / 供应链 / 物流计划",
  manufacturing: "冲压 / 焊装 / 涂装 / 总装 / 终检",
  "new-energy": "PACK / 电驱 / 一体压铸",
  support: "质量 / 设备 / EHS / 数字化 / 生产运营",
};

const LEVEL_LABELS = {
  engineer: "工程/专业岗",
  management: "管理/计划岗",
  general: "综合职能岗",
  operator: "技工/操作岗",
};

const state = {
  query: "",
  process: "all",
  level: "all",
  type: "all",
  highFrequencyOnly: false,
  newEnergyOnly: false,
  activeSection: "all",
};

const elements = {
  heroStats: document.getElementById("hero-stats"),
  overview: document.getElementById("overview"),
  nav: document.getElementById("section-nav"),
  sections: document.getElementById("sections-container"),
  summary: document.getElementById("results-summary"),
  empty: document.getElementById("empty-state"),
  search: document.getElementById("search-input"),
  process: document.getElementById("process-filter"),
  level: document.getElementById("level-filter"),
  type: document.getElementById("type-filter"),
  highFrequency: document.getElementById("high-frequency-filter"),
  newEnergy: document.getElementById("new-energy-filter"),
  reset: document.getElementById("reset-filters"),
  dialog: document.getElementById("job-dialog"),
  dialogSection: document.getElementById("dialog-section"),
  dialogTitle: document.getElementById("dialog-title"),
  dialogDescription: document.getElementById("dialog-description"),
  dialogKeywords: document.getElementById("dialog-keywords"),
  dialogMeta: document.getElementById("dialog-meta"),
  closeDialog: document.getElementById("close-dialog"),
};

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function flattenJobs() {
  return JOB_DATA.flatMap((section) =>
    section.jobs.map((job) => ({
      ...job,
      sectionId: section.id,
      sectionName: section.section,
      sectionType: section.type,
    }))
  );
}

function getCounts() {
  const jobs = flattenJobs();
  return {
    sections: JOB_DATA.length,
    jobs: jobs.length,
    highFrequency: jobs.filter((job) => job.isHighFrequency).length,
    newEnergy: jobs.filter((job) => job.isNewEnergy).length,
  };
}

function fillHeroStats() {
  const counts = getCounts();
  const cards = [
    { value: counts.sections, label: "流程模块" },
    { value: counts.jobs, label: "岗位条目" },
    { value: counts.highFrequency, label: "高频招聘岗位" },
    { value: counts.newEnergy, label: "新能源特色岗位" },
  ];

  elements.heroStats.innerHTML = cards
    .map(
      (card) => `
        <article class="stat-card">
          <strong>${card.value}</strong>
          <span>${card.label}</span>
        </article>
      `
    )
    .join("");
}

function fillProcessFilter() {
  const options = JOB_DATA.map(
    (section) => `<option value="${section.id}">${section.section}</option>`
  ).join("");
  elements.process.insertAdjacentHTML("beforeend", options);
}

function renderOverview() {
  const cards = JOB_DATA.map((section) => {
    const keywords = new Set(
      section.jobs.flatMap((job) => job.keywords).slice(0, 4)
    );

    return `
      <button class="flow-card ${state.process === section.id ? "is-active" : ""}" data-process="${section.id}" type="button">
        <h3>${section.section}</h3>
        <p>${Array.from(keywords).slice(0, 3).join(" / ") || "岗位学习地图"}</p>
        <div class="flow-meta">
          <span>${TYPE_LABELS[section.type]}</span>
          <strong>${section.jobs.length} 岗位</strong>
        </div>
      </button>
    `;
  }).join("");

  elements.overview.innerHTML = `
    <div class="overview-header">
      <div>
        <h2>流程总览</h2>
        <p>按造车流程快速定位岗位密集区。点击任意流程可直接筛选。</p>
      </div>
    </div>
    <div class="flow-strip">${cards}</div>
  `;

  elements.overview.querySelectorAll("[data-process]").forEach((button) => {
    button.addEventListener("click", () => {
      state.process = button.dataset.process;
      elements.process.value = state.process;
      state.activeSection = state.process;
      render();
      scrollToSection(state.process);
    });
  });
}

function filterSection(section) {
  const query = normalize(state.query);

  const jobs = section.jobs.filter((job) => {
    if (state.level !== "all" && job.level !== state.level) {
      return false;
    }

    if (state.type !== "all" && section.type !== state.type) {
      return false;
    }

    if (state.highFrequencyOnly && !job.isHighFrequency) {
      return false;
    }

    if (state.newEnergyOnly && !job.isNewEnergy) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      section.id,
      section.section,
      job.name,
      job.description,
      ...(job.keywords || []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  return {
    ...section,
    jobs,
  };
}

function getFilteredSections() {
  return JOB_DATA
    .filter((section) => state.process === "all" || section.id === state.process)
    .map(filterSection)
    .filter((section) => section.jobs.length > 0);
}

function renderNav(sections) {
  elements.nav.innerHTML = sections
    .map(
      (section) => `
        <a href="#${encodeURIComponent(section.id)}" class="nav-link ${
          state.activeSection === section.id ? "is-active" : ""
        }" data-nav="${section.id}">
          <span>${section.section}</span>
          <small>${section.jobs.length}</small>
        </a>
      `
    )
    .join("");

  elements.nav.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const { nav } = link.dataset;
      state.activeSection = nav;
      highlightActiveNav();
      scrollToSection(nav);
    });
  });
}

function renderSections(sections) {
  elements.sections.innerHTML = sections
    .map((section) => {
      const cards = section.jobs
        .map(
          (job) => `
            <article class="job-card" tabindex="0" data-job='${escapeAttribute(
              JSON.stringify({
                ...job,
                sectionName: section.section,
                sectionType: section.type,
              })
            )}'>
              <div class="job-topline">
                <span class="job-level">${LEVEL_LABELS[job.level] || "岗位"}</span>
                <div class="job-flags">
                  ${job.isHighFrequency ? '<span class="job-flag hot">高频</span>' : ""}
                  ${job.isNewEnergy ? '<span class="job-flag energy">新能源</span>' : ""}
                </div>
              </div>
              <h4>${job.name}</h4>
              <p>${job.description}</p>
              <div class="keyword-row">
                ${(job.keywords || [])
                  .slice(0, 5)
                  .map(
                    (keyword) =>
                      `<button type="button" class="keyword-chip" data-keyword="${keyword}">${keyword}</button>`
                  )
                  .join("")}
              </div>
            </article>
          `
        )
        .join("");

      return `
        <section class="section-block" id="${encodeURIComponent(section.id)}">
          <div class="section-head">
            <div>
              <h3>${section.section}</h3>
              <p>${section.jobs.length} 个岗位，覆盖 ${TYPE_LABELS[section.type]}</p>
            </div>
            <span class="section-tag">${TYPE_LABELS[section.type]}</span>
          </div>
          <div class="job-grid">${cards}</div>
        </section>
      `;
    })
    .join("");

  elements.sections.querySelectorAll(".job-card").forEach((card) => {
    const open = () => openDialog(JSON.parse(card.dataset.job));
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-keyword]")) {
        return;
      }
      open();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  elements.sections.querySelectorAll("[data-keyword]").forEach((chip) => {
    chip.addEventListener("click", (event) => {
      event.stopPropagation();
      state.query = chip.dataset.keyword;
      elements.search.value = state.query;
      render();
    });
  });
}

function renderSummary(sections) {
  const jobCount = sections.reduce((total, section) => total + section.jobs.length, 0);
  elements.summary.textContent = `当前展示 ${sections.length} 个流程，共 ${jobCount} 个岗位`;
  elements.empty.hidden = jobCount !== 0;
}

function openDialog(job) {
  elements.dialogSection.textContent = job.sectionName;
  elements.dialogTitle.textContent = job.name;
  elements.dialogDescription.textContent = job.description;
  elements.dialogKeywords.innerHTML = (job.keywords || [])
    .map((keyword) => `<button type="button" class="keyword-chip" data-keyword="${keyword}">${keyword}</button>`)
    .join("");

  const meta = [
    LEVEL_LABELS[job.level] || "岗位",
    TYPE_LABELS[job.sectionType] || "",
    job.isHighFrequency ? "高频招聘" : "",
    job.isNewEnergy ? "新能源特色" : "",
  ].filter(Boolean);

  elements.dialogMeta.innerHTML = meta
    .map((item) => `<span class="meta-pill">${item}</span>`)
    .join("");

  elements.dialog.showModal();

  elements.dialogKeywords.querySelectorAll("[data-keyword]").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.query = chip.dataset.keyword;
      elements.search.value = state.query;
      elements.dialog.close();
      render();
    });
  });
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("'", "&apos;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function scrollToSection(sectionId) {
  const target = document.getElementById(encodeURIComponent(sectionId));
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function highlightActiveNav() {
  elements.nav.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === state.activeSection);
  });
}

function bindInputs() {
  elements.search.addEventListener("input", () => {
    state.query = elements.search.value.trim();
    render();
  });

  elements.process.addEventListener("change", () => {
    state.process = elements.process.value;
    state.activeSection = state.process === "all" ? "all" : state.process;
    render();
  });

  elements.level.addEventListener("change", () => {
    state.level = elements.level.value;
    render();
  });

  elements.type.addEventListener("change", () => {
    state.type = elements.type.value;
    render();
  });

  elements.highFrequency.addEventListener("change", () => {
    state.highFrequencyOnly = elements.highFrequency.checked;
    render();
  });

  elements.newEnergy.addEventListener("change", () => {
    state.newEnergyOnly = elements.newEnergy.checked;
    render();
  });

  elements.reset.addEventListener("click", () => {
    state.query = "";
    state.process = "all";
    state.level = "all";
    state.type = "all";
    state.highFrequencyOnly = false;
    state.newEnergyOnly = false;
    state.activeSection = "all";

    elements.search.value = "";
    elements.process.value = "all";
    elements.level.value = "all";
    elements.type.value = "all";
    elements.highFrequency.checked = false;
    elements.newEnergy.checked = false;

    render();
  });

  elements.closeDialog.addEventListener("click", () => elements.dialog.close());
  elements.dialog.addEventListener("click", (event) => {
    const rect = elements.dialog.getBoundingClientRect();
    const inside =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!inside) {
      elements.dialog.close();
    }
  });
}

function render() {
  renderOverview();
  const sections = getFilteredSections();
  renderNav(sections);
  renderSections(sections);
  renderSummary(sections);
}

fillHeroStats();
fillProcessFilter();
bindInputs();
render();
