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

const PROCESS_DIAGRAM = {
  upstream: [
    "产品定义与项目管理",
    "整车研发",
    "试制、验证与新车型导入",
    "采购、供应链与供应商导入",
    "制造工程与工业化",
  ],
  mainline: [
    "冲压车间",
    "焊装车间",
    "涂装车间",
    "总装车间",
    "整车终检与交付放行",
  ],
  feeders: [
    "一体压铸",
    "机加与后处理",
    "电池 PACK / 模组制造",
    "电驱/电机/电控制造",
  ],
  support: [
    "质量管理",
    "设备维修与公辅保障",
    "计划、仓储与物流",
    "生产运营与现场管理",
    "EHS、环保与职业健康",
    "数字化制造与 OT/IT",
  ],
};

const SECTION_INTEL = {
  "产品定义与项目管理": {
    companies: ["主机厂产品规划中心", "新能源品牌战略部", "咨询/研究机构", "智能汽车项目管理团队"],
    directions: ["优先看有整车项目节奏和跨部门推进经验的人", "关注做过 SOP 节点管理、配置管理、成本分解的人", "可以从乘用车主机厂和新势力平台项目团队挖人"],
    questions: ["你负责过的车型或项目，关键里程碑怎么拆解和推进？", "当研发、采购、制造节点冲突时，你怎么拉齐优先级？"],
  },
  "整车研发": {
    companies: ["乘用车主机厂研发中心", "Tier1 系统供应商", "工程开发服务公司", "试验验证中心"],
    directions: ["重点找做过量产项目而不是纯概念开发的人", "优先看熟悉 DFMEA、DVP、问题闭环和工程变更的人", "可从车身、底盘、热管理、电子电器等系统团队平移"],
    questions: ["你参与过哪些量产开发项目，量产前解决过什么设计问题？", "研发输出怎样确保后续制造端可生产、可检测、可装配？"],
  },
  "试制、验证与新车型导入": {
    companies: ["主机厂试制车间", "新车型导入/NPI 团队", "样车中心", "验证与测量实验室"],
    directions: ["优先看打通过试制到 SOP 导入链路的人", "关注 SE、尺寸、测量、制造验证一体化经验", "可从样车试制、验证中心、车身测量团队挖人"],
    questions: ["你如何把试制阶段问题转成量产可执行的工艺动作？", "试制问题清单怎么分级、闭环和复盘？"],
  },
  "采购、供应链与供应商导入": {
    companies: ["主机厂采购中心", "SQE/供应商开发团队", "模具与设备采购团队", "零部件供应链管理团队"],
    directions: ["优先看做过项目采购和供应商导入的人", "关注成本、交付、质量三者平衡能力", "可从核心零部件供应商的项目/质量接口岗反向挖人"],
    questions: ["你导入过哪些关键供应商，风险点怎么控？", "当供应商质量和交付同时失控时，你先抓什么？"],
  },
  "制造工程与工业化": {
    companies: ["主机厂制造工程部", "工艺规划团队", "自动化集成商", "工装夹具与检具公司"],
    directions: ["优先找做过产线导入、节拍平衡、工艺验证的人", "PLC、电气、自动化、夹具检具背景可互相转化", "可以从设备商和集成商挖懂现场落地的工程师"],
    questions: ["你做过的工艺方案里，节拍、良率和投资是怎么平衡的？", "新线导入时你如何验证工装、夹具和程序的稳定性？"],
  },
  "冲压车间": {
    companies: ["整车冲压厂", "大型模具厂", "冲压件供应商", "压机与自动化厂商"],
    directions: ["优先找做过外覆盖件、侧围、门环等复杂件的人", "模具、成形、设备、换模背景之间可做相近挖掘", "可以从模具厂和冲压件 Tier1 补充冲压工艺人才"],
    questions: ["你处理过哪些开裂、起皱、回弹问题？怎么定位原因？", "换模和首件确认流程里，哪些点最容易影响 OEE？"],
  },
  "焊装车间": {
    companies: ["整车焊装车间", "白车身零部件厂", "机器人系统集成商", "焊接夹具与焊钳厂商"],
    directions: ["优先看车身连接、机器人调试、焊接质量稳定化经验", "设备商和集成商里懂机器人、PLC、工装调试的人可转入主机厂", "可从座椅骨架、车身件、门盖件焊接工厂挖人"],
    questions: ["你负责过哪些连接工艺，怎么保证焊点质量和尺寸稳定？", "机器人焊接参数、夹具定位和车身尺寸偏差之间怎么联动分析？"],
  },
  "涂装车间": {
    companies: ["整车涂装车间", "涂料材料公司", "喷涂机器人集成商", "环保与公辅设备供应商"],
    directions: ["重点看前处理、电泳、喷涂、密封全链路经验", "能同时理解工艺窗口、材料和设备的人稀缺", "可从家电喷涂、工程机械涂装、高端涂料厂补充部分能力"],
    questions: ["你处理过哪些颗粒、流挂、缩孔、色差问题？", "涂装良率异常时，你如何区分材料、环境和设备原因？"],
  },
  "总装车间": {
    companies: ["整车总装车间", "EOL 测试与诊断团队", "拧紧与加注设备商", "总成装配工厂"],
    directions: ["优先找熟悉装配工艺、防错、拧紧、EOL 测试的人", "整车诊断、下线测试背景对新能源车很有价值", "可从发动机/变速箱/电驱总成装配线平移部分人才"],
    questions: ["你如何设计总装工位的防错和异常拦截？", "下线不良高发时，你如何判断是来件、装配还是程序问题？"],
  },
  "整车终检与交付放行": {
    companies: ["整车 OQC/终检团队", "PDI/交付质检团队", "第三方检测机构", "试车场与道路测试团队"],
    directions: ["关注动态检测、淋雨、路试、交付放行经验", "有终检标准、缺陷判定和用户视角的人更适合交付质量岗位", "可从第三方检测与 PDI 团队补充检验人才"],
    questions: ["你如何定义终检放行红线？", "遇到批量外观或功能缺陷时，终检如何与制造和质量联动？"],
  },
  "电池 PACK / 模组制造": {
    companies: ["动力电池厂", "PACK 厂", "储能装配工厂", "激光焊与测试设备厂商"],
    directions: ["优先看电芯到模组再到 PACK 的完整制造经验", "关注激光焊、点胶、气密、EOL 测试和追溯系统背景", "可从动力电池、储能、电池设备商三类企业交叉挖人"],
    questions: ["你做过哪些 PACK 关键工序，如何控制气密和电性能一致性？", "电池产线异常时，你如何区分来料、工艺和设备问题？"],
  },
  "电驱/电机/电控制造": {
    companies: ["电驱总成厂", "电机厂", "逆变器/电控厂", "电驱测试与装配设备厂商"],
    directions: ["优先找懂绕组、装配、焊接、测试和 NVH 的人", "可从电机、电控、减速器、总成测试等相邻团队挖人", "设备厂里懂电驱测试台和自动化装配的人可补现场工程能力"],
    questions: ["你负责过哪些电驱关键工艺，如何保证一致性和测试通过率？", "电驱下线测试异常时，你怎么快速分层定位问题？"],
  },
  "一体压铸": {
    companies: ["一体压铸产线", "压铸件供应商", "模具厂", "熔炼与压铸设备厂商"],
    directions: ["重点看大型压铸、试模、模具、材料和后处理经验", "可从传统铸造转，但优先有高压压铸和结构件经验的人", "设备和模具厂的人适合补设备调试与工艺优化能力"],
    questions: ["你处理过哪些气孔、缩松、变形或粘模问题？", "大型压铸件良率和模具寿命通常怎么一起优化？"],
  },
  "机加与后处理": {
    companies: ["机加工厂", "CNC 产线", "刀具厂", "精密检测与三坐标实验室"],
    directions: ["优先找做过节拍、刀具寿命、尺寸能力优化的人", "CNC、刀具、夹具、三坐标背景可做互补挖掘", "可从汽车零部件机加和高精密加工行业平移人才"],
    questions: ["你如何平衡加工节拍、刀具寿命和尺寸稳定性？", "三坐标数据异常时，你如何回溯到工艺或设备原因？"],
  },
  "质量管理": {
    companies: ["主机厂质量中心", "Tier1 质量部", "SQE/IQE/PQE 团队", "第三方质量与认证机构"],
    directions: ["优先看懂 APQP、PPAP、8D、问题闭环和量产爬坡的人", "来料、过程、出货、项目质量之间可以按经验互转", "可从核心零部件厂补充问题解决能力强的质量人才"],
    questions: ["你主导过哪类质量问题闭环，证据链怎么建立？", "批量问题发生后，你如何推动跨部门真正收敛而不是临时围堵？"],
  },
  "设备维修与公辅保障": {
    companies: ["主机厂设备部", "自动化维保团队", "公辅运维团队", "设备 OEM 与集成商售后团队"],
    directions: ["优先找懂预防性维护、故障诊断和备件体系的人", "电气、机械、自动化、公辅可以按现场复杂度交叉挖掘", "设备厂售后和驻厂工程师往往有很强实操能力"],
    questions: ["你处理过最典型的停线故障是什么，定位思路是什么？", "TPM、备件和点检体系你具体落过哪些动作？"],
  },
  "计划、仓储与物流": {
    companies: ["主机厂 PMC/物流部", "仓储物流中心", "第三方物流", "包装与厂内物流方案商"],
    directions: ["优先看 JIT/JIS、齐套、拉动补料和库位设计经验", "生产计划、物料计划、物流工程之间可以相互转化", "可从汽车供应链、家电和 3PL 的精益物流团队挖人"],
    questions: ["你如何平衡主计划、物料齐套和产线缺件风险？", "厂内物流异常时，你如何判断是计划、仓储还是执行问题？"],
  },
  "生产运营与现场管理": {
    companies: ["主机厂制造运营团队", "车间管理团队", "精益生产团队", "技能培训与班组管理团队"],
    directions: ["优先找能带班组、抓指标、盯异常闭环的人", "线长、工段长、主管、制造经理适合按线体复杂度逐级 mapping", "培训和运营岗位可从成熟工厂体系化团队补充"],
    questions: ["你负责的产线通常盯哪些核心指标？", "当产量、质量和人员稳定性同时波动时，你先抓什么？"],
  },
  "EHS、环保与职业健康": {
    companies: ["主机厂 EHS 部门", "环保工程公司", "危废与水处理运维单位", "职业健康与安全咨询机构"],
    directions: ["优先看过制造工厂现场的人，不优先纯办公室合规背景", "能同时覆盖安全、环保、职业健康和承包商管理的人更稀缺", "可从化工、电子、电池等高风险制造行业挖人"],
    questions: ["你主导过哪些事故预防或隐患治理项目？", "面对高风险工序或外包施工，EHS 如何真正落到现场执行？"],
  },
  "数字化制造与 OT/IT": {
    companies: ["主机厂数字化工厂团队", "MES/WMS/SCADA 实施商", "工业自动化软件公司", "数据平台与 BI 团队"],
    directions: ["优先找既懂业务流程又能落系统的人", "MES、WMS、SCADA、OT 网络、数据分析背景可组合使用", "可从制造软件实施商补充交付经验，从主机厂补充业务理解"],
    questions: ["你落过哪些制造系统项目，业务价值如何衡量？", "现场系统上线失败时，通常是流程、数据还是组织问题？"],
  },
};

const COMPANY_GROUPS = {
  oem: ["比亚迪", "特斯拉", "理想汽车", "蔚来", "小鹏汽车", "极氪", "广汽埃安", "吉利汽车"],
  battery: ["宁德时代", "弗迪电池", "中创新航", "国轩高科", "亿纬锂能", "欣旺达动力"],
  edrive: ["汇川技术", "华为数字能源", "联合电子", "舍弗勒", "博格华纳", "精进电动"],
  supplier: ["延锋", "佛吉亚", "均胜电子", "敏实集团", "拓普集团", "宁波华翔"],
  robotics: ["发那科", "ABB", "库卡", "安川", "新松", "埃斯顿"],
  coating: ["PPG", "艾仕得", "立邦", "巴斯夫涂料", "杜尔", "艾森曼体系团队"],
  diecasting: ["文灿股份", "拓普集团", "鸿图科技", "旭升集团", "力劲", "伊之密"],
  machining: ["博世", "采埃孚", "舍弗勒", "耐世特", "爱信", "精锻科技"],
  logistics: ["安吉物流", "长久物流", "德马科技", "科捷智能", "京东物流工业团队", "顺丰供应链"],
  software: ["西门子", "达索系统", "罗克韦尔自动化", "和利时", "宝信软件", "鼎捷"],
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
  dialogKeywordGroups: document.getElementById("dialog-keyword-groups"),
  dialogSourceCompanies: document.getElementById("dialog-source-companies"),
  dialogPoachDirections: document.getElementById("dialog-poach-directions"),
  dialogInterviewQuestions: document.getElementById("dialog-interview-questions"),
  dialogSampleResume: document.getElementById("dialog-sample-resume"),
  resumeViewToggle: document.getElementById("resume-view-toggle"),
  dialogNote: document.getElementById("dialog-note"),
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

function getSectionByName(name) {
  return JOB_DATA.find((section) => section.section === name);
}

function renderProcessNode(sectionName, options = {}) {
  const section = getSectionByName(sectionName);
  if (!section) {
    return "";
  }

  const topJobs = getSectionSubtitles(section).slice(0, options.previewCount || 2);
  const hotCount = section.jobs.filter((job) => job.isHighFrequency).length;
  const energyCount = section.jobs.filter((job) => job.isNewEnergy).length;
  const sizeClass = options.sizeClass || "";
  const isActive = state.process === section.id;

  return `
    <button
      class="process-node ${sizeClass} ${isActive ? "is-active" : ""}"
      data-process="${section.id}"
      type="button"
    >
      <div class="process-node-head">
        <span class="process-node-type">${TYPE_LABELS[section.type]}</span>
        <span class="process-node-count">${section.jobs.length} 岗位</span>
      </div>
      <h3>${section.section}</h3>
      <p>${options.description || `适合从 ${topJobs.join(" / ") || "核心岗位"} 切入。`}</p>
      <div class="process-node-preview">
        ${topJobs.map((jobName) => `<span class="process-node-chip">${jobName}</span>`).join("")}
      </div>
      <div class="process-node-meta">
        <span>${hotCount} 高频</span>
        <strong>${energyCount} 新能源</strong>
      </div>
    </button>
  `;
}

function renderOverview() {
  const upstreamNodes = PROCESS_DIAGRAM.upstream
    .map((name) =>
      renderProcessNode(name, {
        sizeClass: "process-node--compact",
      })
    )
    .join("");

  const mainlineNodes = PROCESS_DIAGRAM.mainline
    .map((name, index) =>
      renderProcessNode(name, {
        sizeClass: index === 3 ? "process-node--wide" : "",
        previewCount: 3,
      })
    )
    .join("");

  const feederNodes = PROCESS_DIAGRAM.feeders
    .map((name) =>
      renderProcessNode(name, {
        sizeClass: "process-node--compact",
      })
    )
    .join("");

  const supportNodes = PROCESS_DIAGRAM.support
    .map((name) =>
      renderProcessNode(name, {
        sizeClass: "process-node--support",
        previewCount: 2,
      })
    )
    .join("");

  elements.overview.innerHTML = `
    <div class="overview-header">
      <div>
        <h2>流程总览</h2>
        <p>按真实造车节奏查看：前端定义与开发先行，工业化完成导入，主线经过冲压、焊装、涂装、总装和终检交付，新能源支路与全流程支持模块并行协同。</p>
      </div>
    </div>
    <div class="process-diagram">
      <section class="diagram-lane">
        <div class="diagram-lane-head">
          <span class="diagram-lane-label">前端开发与工业化</span>
          <p>决定车型、设计方案、验证路径、供应商导入与产线落地方式。</p>
        </div>
        <div class="diagram-track diagram-track--upstream">${upstreamNodes}</div>
      </section>

      <section class="diagram-lane">
        <div class="diagram-lane-head">
          <span class="diagram-lane-label">整车制造主线</span>
          <p>白车身成形与连接后进入表面处理、总装集成，最后完成终检与交付放行。</p>
        </div>
        <div class="diagram-track diagram-track--mainline">${mainlineNodes}</div>
      </section>

      <section class="diagram-lane">
        <div class="diagram-lane-head">
          <span class="diagram-lane-label">新能源与零部件支路</span>
          <p>压铸、机加、电池 PACK、电驱制造等模块与主线并行，最终向总装集成供给总成与结构件。</p>
        </div>
        <div class="diagram-track diagram-track--feeders">${feederNodes}</div>
      </section>

      <section class="diagram-lane">
        <div class="diagram-lane-head">
          <span class="diagram-lane-label">全流程支持模块</span>
          <p>质量、设备、物流、运营、EHS 与数字化从项目导入到量产爬坡全程参与。</p>
        </div>
        <div class="diagram-track diagram-track--support">${supportNodes}</div>
      </section>
    </div>
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

function getSectionSubtitles(section) {
  return section.jobs
    .slice()
    .sort((a, b) => {
      const aScore = (a.isHighFrequency ? 2 : 0) + (a.level === "engineer" ? 1 : 0);
      const bScore = (b.isHighFrequency ? 2 : 0) + (b.level === "engineer" ? 1 : 0);
      return bScore - aScore;
    })
    .map((job) => job.name)
    .slice(0, 5);
}

function getJobAnchor(sectionId, jobName) {
  return `${encodeURIComponent(sectionId)}::${encodeURIComponent(jobName)}`;
}

function renderNav(sections) {
  elements.nav.innerHTML = sections
    .map((section) => {
      const subtitles = getSectionSubtitles(section);
      return `
        <div class="nav-group ${state.activeSection === section.id ? "is-active" : ""}">
        <a href="#${encodeURIComponent(section.id)}" class="nav-link ${
          state.activeSection === section.id ? "is-active" : ""
        }" data-nav="${section.id}">
          <span>
            <strong>${section.section}</strong>
            <small>${TYPE_LABELS[section.type]}</small>
          </span>
          <small>${section.jobs.length}</small>
        </a>
        <div class="nav-sublist" ${state.activeSection === section.id ? "" : "hidden"}>
          ${subtitles
            .map(
              (jobName) => `
                <button type="button" class="nav-sublink" data-section="${section.id}" data-job="${jobName}">
                  ${jobName}
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      `;
    })
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

  elements.nav.querySelectorAll(".nav-sublink").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.dataset.section;
      const jobName = button.dataset.job;
      state.process = sectionId;
      state.activeSection = sectionId;
      elements.process.value = sectionId;
      render();
      scrollToJob(sectionId, jobName);
    });
  });
}

function renderSections(sections) {
  elements.sections.innerHTML = sections
    .map((section) => {
      const cards = section.jobs
        .map((job) => {
          const keywordGroups = getKeywordGroups({
            ...job,
            sectionName: section.section,
            sectionType: section.type,
          });
          const intel = getRecruitingIntel({
            ...job,
            sectionName: section.section,
            sectionType: section.type,
          });
          const resume = getSampleResume(
            { ...job, sectionName: section.section, sectionType: section.type },
            intel,
            keywordGroups
          );
          return `
            <article class="job-card" id="${getJobAnchor(section.id, job.name)}" tabindex="0" data-job='${escapeAttribute(
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
              ${renderResumePreview(resume)}
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
          `;
        })
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

function dedupe(items) {
  return [...new Set(items.filter(Boolean))];
}

function listToHtml(items, className) {
  return items.map((item) => `<span class="${className}">${item}</span>`).join("");
}

function bulletListToHtml(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function highlightTerms(text, terms) {
  let output = escapeHtml(text);
  dedupe(terms)
    .filter((term) => term && term.length >= 2)
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      output = output.replace(
        new RegExp(safe, "g"),
        `<span class="resume-highlight">${escapeHtml(term)}</span>`
      );
    });
  return output;
}

function getKeywordGroups(job) {
  const text = [job.sectionName, job.name, job.description, ...(job.keywords || [])].join(" ");
  const groups = [];
  const baseKeywords = dedupe(job.keywords || []);

  const processTerms = [];
  const toolTerms = [];
  const qualityTerms = [];
  const resultTerms = [];
  const systemTerms = [];

  if (/冲压|成形|回弹|模具/.test(text)) {
    processTerms.push("冲压工艺", "成形分析", "模具调试", "回弹控制", "首件确认");
  }
  if (/焊|连接|焊钳|机器人/.test(text)) {
    processTerms.push("焊接工艺", "连接工艺", "车身尺寸", "机器人调试", "焊点质量");
  }
  if (/涂装|电泳|喷涂|密封|前处理/.test(text)) {
    processTerms.push("前处理", "电泳", "喷涂工艺", "密封工艺", "漆膜缺陷分析");
  }
  if (/总装|装配|拧紧|加注|EOL|诊断/.test(text)) {
    processTerms.push("装配工艺", "防错设计", "拧紧控制", "EOL测试", "整车诊断");
  }
  if (/PACK|模组|电池|气密/.test(text)) {
    processTerms.push("模组装配", "PACK装配", "气密测试", "绝缘测试", "追溯管理");
  }
  if (/电驱|电机|电控|逆变器|台架/.test(text)) {
    processTerms.push("电驱装配", "电机工艺", "电控测试", "NVH", "下线测试");
  }
  if (/压铸|铸造|熔炼/.test(text)) {
    processTerms.push("大型压铸", "铸造工艺", "试模", "熔炼控制", "后处理");
  }
  if (/机加|CNC|刀具|三坐标/.test(text)) {
    processTerms.push("CNC加工", "刀具寿命", "尺寸能力", "程序优化", "三坐标测量");
  }
  if (/质量|SQE|IQE|PQE|OQE|APQP/.test(text)) {
    qualityTerms.push("APQP", "PPAP", "8D", "FMEA", "SPC", "MSA", "控制计划");
  }
  if (/EHS|安全|环保|危废|职业健康/.test(text)) {
    qualityTerms.push("双重预防机制", "隐患排查", "承包商管理", "危废合规", "职业健康");
  }
  if (/PLC|自动化|电气|OT|MES|WMS|SCADA|BI|数据/.test(text)) {
    systemTerms.push("PLC", "HMI", "SCADA", "MES", "WMS", "OT网络", "SQL/BI");
  }
  if (/设备|维修|公辅|TPM/.test(text)) {
    toolTerms.push("TPM", "点检", "预防性维护", "故障诊断", "备件管理", "OEE");
  }
  if (/采购|供应商|物流|计划|仓储|PMC|齐套/.test(text)) {
    systemTerms.push("SAP/ERP", "MRP", "JIT/JIS", "拉动补料", "齐套管理", "库位规划");
    resultTerms.push("交付达成", "库存周转", "缺件闭环", "供应商导入");
  }

  if (!toolTerms.length) {
    if (/机器人/.test(text)) toolTerms.push("发那科", "ABB", "库卡", "离线编程");
    if (/焊/.test(text)) toolTerms.push("焊钳", "焊接参数", "示教", "夹具定位");
    if (/涂装/.test(text)) toolTerms.push("喷枪", "机器人喷涂", "漆雾控制", "烘炉");
    if (/PACK|电池/.test(text)) toolTerms.push("激光焊", "点胶", "气密仪", "高压测试");
    if (/电驱/.test(text)) toolTerms.push("测试台", "EOL台架", "扭矩校验", "绝缘耐压");
    if (/压铸/.test(text)) toolTerms.push("压铸岛", "模温机", "真空系统", "熔炼炉");
    if (/机加|CNC/.test(text)) toolTerms.push("数控系统", "刀具补偿", "夹具", "三坐标");
  }

  if (!resultTerms.length) {
    resultTerms.push("良率提升", "节拍达成", "停线下降", "返修率下降", "项目 SOP");
  }

  groups.push({ title: "基础检索词", items: baseKeywords });
  if (processTerms.length) groups.push({ title: "工艺 / 业务词", items: dedupe(processTerms) });
  if (toolTerms.length) groups.push({ title: "设备 / 工装 / 工具词", items: dedupe(toolTerms) });
  if (qualityTerms.length) groups.push({ title: "质量 / 管理工具词", items: dedupe(qualityTerms) });
  if (systemTerms.length) groups.push({ title: "系统 / 软件词", items: dedupe(systemTerms) });
  groups.push({ title: "结果导向词", items: dedupe(resultTerms) });

  return groups.filter((group) => group.items.length > 0);
}

function renderKeywordGroups(groups) {
  return groups
    .map(
      (group) => `
        <section class="keyword-group">
          <p class="keyword-group-title">${group.title}</p>
          <div class="list-row">
            ${group.items
              .map(
                (item) =>
                  `<button type="button" class="keyword-chip" data-keyword="${escapeHtml(item)}">${escapeHtml(item)}</button>`
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function getSampleResume(job, intel, keywordGroups) {
  const focusTerms = dedupe([
    ...(job.keywords || []).slice(0, 4),
    ...keywordGroups.flatMap((group) => group.items.slice(0, 2)),
  ]).slice(0, 8);
  const years = job.level === "management" ? "8年" : job.level === "operator" ? "4年" : "6年";
  const education = job.level === "operator" ? "大专" : "本科";
  const companyA = intel.sourceCompanies[0] || "某头部主机厂";
  const companyB = intel.sourceCompanies[1] || "某核心零部件企业";
  const projectTarget = job.isNewEnergy ? "新能源车型 SOP 导入" : "量产车型 SOP 导入";
  const projectTitle = job.isNewEnergy ? "新能源量产爬坡项目" : "量产工艺优化项目";
  const achievements = dedupe([
    "支撑 SOP 节点达成",
    "推动良率提升 3%-8%",
    "降低返修或停线风险",
    "完成跨部门问题闭环",
  ]).slice(0, 3);
  const tools = dedupe(keywordGroups.flatMap((group) => group.items).slice(0, 10));
  const risks = dedupe([
    "是否真的做过量产导入而不是只做文档维护",
    "是否能讲清楚异常定位路径和闭环动作",
    "是否有和质量、设备、生产协同推进的证据",
  ]).slice(0, 3);

  const summary = `具备${years}${job.sectionName}相关经验，长期负责${job.name}工作，熟悉${focusTerms.slice(0, 4).join("、")}，能独立推动${projectTarget}中的问题识别、方案落地和量产稳定化。`;
  const exp1 = `在${companyA}负责${job.name}，主导${focusTerms.slice(0, 3).join(" / ")}相关工作，围绕节拍、良率和异常闭环优化现场流程，支撑项目按节点推进至 SOP。`;
  const exp2 = `在${companyB}参与跨部门协同，联动研发、质量、设备或供应链处理量产爬坡问题，推动${focusTerms.slice(3, 6).join(" / ") || "关键工艺和质量指标"}稳定达成。`;
  const skills = dedupe([
    ...focusTerms,
    ...intel.interviewQuestions.slice(0, 1).map(() => "项目复盘"),
  ]).join("、");

  return {
    name: "张某某",
    role: `${job.name} | ${job.sectionName}`,
    metaLeft: `${years}经验 / ${education} / 汽车制造行业`,
    metaRight: `${job.isNewEnergy ? "新能源方向" : "量产制造方向"} / ${LEVEL_LABELS[job.level] || "岗位"}`,
    summary,
    experiences: [exp1, exp2],
    skills,
    focusTerms,
    projectTitle,
    achievements,
    tools,
    risks,
  };
}

function renderResumePreview(resume) {
  return `
    <section class="resume-preview" aria-label="示范简历预览">
      <div class="resume-preview-head">
        <p class="resume-preview-title">示范简历预览</p>
        <span class="resume-preview-meta">${resume.metaLeft}</span>
      </div>
      <p class="resume-preview-copy">${highlightTerms(resume.summary, resume.focusTerms.slice(0, 4))}</p>
      <div class="resume-preview-keywords">
        ${resume.focusTerms.slice(0, 3).map((term) => `<span class="resume-preview-chip">${escapeHtml(term)}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderSampleResume(resume, view = "summary") {
  if (view === "full") {
    return `
      <div class="resume-head">
        <div>
          <h3 class="resume-name">${resume.name}</h3>
          <p class="resume-role">${resume.role}</p>
        </div>
        <div class="resume-meta">
          <div>${resume.metaLeft}</div>
          <div>${resume.metaRight}</div>
        </div>
      </div>
      <section class="resume-section">
        <p class="resume-section-title">职业概述</p>
        <p class="resume-summary">${highlightTerms(resume.summary, resume.focusTerms)}</p>
      </section>
      <section class="resume-section">
        <p class="resume-section-title">项目经历</p>
        <p class="resume-entry"><strong>${resume.projectTitle}</strong>：${highlightTerms(resume.experiences[0], resume.focusTerms)}</p>
        <p class="resume-entry">${highlightTerms(resume.experiences[1], resume.focusTerms)}</p>
      </section>
      <section class="resume-section">
        <p class="resume-section-title">关键成绩</p>
        <ul class="resume-list">
          ${resume.achievements.map((item) => `<li>${highlightTerms(item, resume.focusTerms)}</li>`).join("")}
        </ul>
      </section>
      <section class="resume-section">
        <p class="resume-section-title">系统 / 工具 / 关键词</p>
        <p class="resume-skills">${highlightTerms(resume.tools.join("、"), resume.focusTerms)}</p>
      </section>
      <section class="resume-section">
        <p class="resume-section-title">招聘关注点</p>
        <ul class="resume-list">
          ${resume.risks.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  return `
    <div class="resume-head">
      <div>
        <h3 class="resume-name">${resume.name}</h3>
        <p class="resume-role">${resume.role}</p>
      </div>
      <div class="resume-meta">
        <div>${resume.metaLeft}</div>
        <div>${resume.metaRight}</div>
      </div>
    </div>
    <section class="resume-section">
      <p class="resume-section-title">职业概述</p>
      <p class="resume-summary">${highlightTerms(resume.summary, resume.focusTerms)}</p>
    </section>
    <section class="resume-section">
      <p class="resume-section-title">核心经历</p>
      <p class="resume-entry">${highlightTerms(resume.experiences[0], resume.focusTerms)}</p>
      <p class="resume-entry">${highlightTerms(resume.experiences[1], resume.focusTerms)}</p>
    </section>
    <section class="resume-section">
      <p class="resume-section-title">关键能力 / 关键词</p>
      <p class="resume-skills">${highlightTerms(resume.skills, resume.focusTerms)}</p>
    </section>
  `;
}

function bindResumeViewToggle(resume) {
  const buttons = elements.resumeViewToggle.querySelectorAll("[data-resume-view]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.resumeView;
      buttons.forEach((item) =>
        item.classList.toggle("is-active", item.dataset.resumeView === view)
      );
      elements.dialogSampleResume.innerHTML = renderSampleResume(resume, view);
    });
  });
}

function inferCompanyExtensions(job) {
  const text = [job.sectionName, job.name, ...(job.keywords || [])].join(" ");
  const matches = [];

  if (/PACK|模组|电池|气密|BMS|电芯/.test(text)) {
    matches.push(...COMPANY_GROUPS.battery);
  }
  if (/电驱|电机|电控|逆变器|台架/.test(text)) {
    matches.push(...COMPANY_GROUPS.edrive);
  }
  if (/焊|机器人|焊钳|连接/.test(text)) {
    matches.push(...COMPANY_GROUPS.robotics);
  }
  if (/涂装|电泳|喷涂|密封|涂料/.test(text)) {
    matches.push(...COMPANY_GROUPS.coating);
  }
  if (/压铸|熔炼|铸造/.test(text)) {
    matches.push(...COMPANY_GROUPS.diecasting);
  }
  if (/CNC|机加|刀具|三坐标/.test(text)) {
    matches.push(...COMPANY_GROUPS.machining);
  }
  if (/物流|仓储|包装|PMC|齐套/.test(text)) {
    matches.push(...COMPANY_GROUPS.logistics);
  }
  if (/MES|WMS|SCADA|OT|工业网络|BI/.test(text)) {
    matches.push(...COMPANY_GROUPS.software);
  }
  if (/SQE|IQE|PQE|OQE|供应商|内外饰|底盘|车身/.test(text)) {
    matches.push(...COMPANY_GROUPS.supplier);
  }

  return dedupe([...COMPANY_GROUPS.oem, ...matches]).slice(0, 8);
}

function inferInterviewExtensions(job) {
  const text = [job.name, job.description, ...(job.keywords || [])].join(" ");
  const questions = [];

  if (/PLC|电气|自动化|SCADA|MES|WMS|OT/.test(text)) {
    questions.push("你实际改过哪些程序、逻辑或接口，如何验证上线后的稳定性？");
  }
  if (/APQP|PPAP|8D|FMEA|CP|MSA|SPC/.test(text)) {
    questions.push("这些质量工具你在哪个项目里真正用过，输出物如何影响量产结果？");
  }
  if (/机器人|焊接|激光焊|焊钳/.test(text)) {
    questions.push("你调过哪些焊接或机器人参数，判定有效的依据是什么？");
  }
  if (/冲压|模具|成形|回弹/.test(text)) {
    questions.push("遇到模具和成形问题时，你先看材料、模面还是设备参数，为什么？");
  }
  if (/喷涂|电泳|前处理|密封|涂料/.test(text)) {
    questions.push("你如何定义涂装工艺窗口，哪些参数偏移最容易引发批量问题？");
  }
  if (/拧紧|加注|EOL|诊断|终检|淋雨|四轮定位/.test(text)) {
    questions.push("下线测试或终检异常时，你如何做首轮分层和快速判责？");
  }
  if (/PACK|气密|模组|电池/.test(text)) {
    questions.push("电池相关岗位里，你通常怎么控制气密、绝缘和追溯一致性？");
  }
  if (/计划|物流|仓储|齐套|拉动/.test(text)) {
    questions.push("你如何用数据判断缺件是计划问题、库存问题还是执行问题？");
  }
  if (/EHS|安全|环保|危废|职业健康/.test(text)) {
    questions.push("你做过哪些现场稽核或风险整改，怎样确保不是纸面闭环？");
  }
  if (/班组长|线长|工段长|生产主管|制造经理/.test(text)) {
    questions.push("你如何带班组稳定达成日产量，同时控制流失率和返修率？");
  }

  return questions;
}

function inferPoachExtensions(job) {
  const text = [job.sectionName, job.name, ...(job.keywords || [])].join(" ");
  const directions = [];

  if (/设备|维修|自动化|PLC|机器人/.test(text)) {
    directions.push("可以从设备 OEM、系统集成商、驻厂售后和产线维保团队反向挖人");
  }
  if (/模具|检具|夹具/.test(text)) {
    directions.push("可以从模具厂、夹具检具厂、试模团队补充工艺和现场问题解决能力");
  }
  if (/质量|SQE|IQE|PQE|OQE|OQC/.test(text)) {
    directions.push("可以从核心零部件供应商质量团队平移，重点看问题闭环深度");
  }
  if (/PACK|电池|电驱|电机|电控|压铸/.test(text)) {
    directions.push("新能源特色工艺建议同时看主机厂、核心部件厂和设备厂三路人才池");
  }
  if (/MES|WMS|SCADA|OT|数据|BI/.test(text)) {
    directions.push("可从制造软件实施商挖交付型人才，从主机厂挖懂业务流程的人");
  }

  return directions;
}

function getRecruitingIntel(job) {
  const base = SECTION_INTEL[job.sectionName] || {
    companies: COMPANY_GROUPS.oem,
    directions: ["优先看做过量产制造项目并能描述具体结果的人"],
    questions: ["请结合一个真实项目说明你负责的范围、难点和结果。"],
  };

  return {
    sourceCompanies: dedupe([...base.companies, ...inferCompanyExtensions(job)]).slice(0, 8),
    poachDirections: dedupe([...base.directions, ...inferPoachExtensions(job)]).slice(0, 5),
    interviewQuestions: dedupe([...base.questions, ...inferInterviewExtensions(job)]).slice(0, 6),
    note: "以下内容为基于流程模块、岗位名称和关键词自动推导的招聘建议，适合做初版 mapping 和面试准备，正式使用前建议按目标公司口径再收敛一次。",
  };
}

function openDialog(job) {
  const intel = getRecruitingIntel(job);
  const keywordGroups = getKeywordGroups(job);
  const sampleResume = getSampleResume(job, intel, keywordGroups);
  elements.dialogSection.textContent = job.sectionName;
  elements.dialogTitle.textContent = job.name;
  elements.dialogDescription.textContent = job.description;
  elements.dialogKeywords.innerHTML = (job.keywords || [])
    .map((keyword) => `<button type="button" class="keyword-chip" data-keyword="${keyword}">${keyword}</button>`)
    .join("");
  elements.dialogKeywordGroups.innerHTML = renderKeywordGroups(keywordGroups);
  elements.dialogSourceCompanies.innerHTML = listToHtml(intel.sourceCompanies, "source-chip");
  elements.dialogPoachDirections.innerHTML = bulletListToHtml(intel.poachDirections);
  elements.dialogInterviewQuestions.innerHTML = bulletListToHtml(intel.interviewQuestions);
  elements.dialogSampleResume.innerHTML = renderSampleResume(sampleResume, "summary");
  elements.dialogNote.textContent = intel.note;
  elements.resumeViewToggle.querySelectorAll("[data-resume-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.resumeView === "summary");
  });

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
  bindResumeViewToggle(sampleResume);

  elements.dialog.querySelectorAll("[data-keyword]").forEach((chip) => {
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

function scrollToJob(sectionId, jobName) {
  const target = document.getElementById(getJobAnchor(sectionId, jobName));
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("job-card-pulse");
    window.setTimeout(() => target.classList.remove("job-card-pulse"), 1400);
  } else {
    scrollToSection(sectionId);
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
