(() => {
  const STORAGE_KEY = 'stefanie-portfolio-language';
  const selector = document.querySelector('#portfolio-language');
  if (!selector) return;
  const storage = {
    get() { try { return window.localStorage.getItem(STORAGE_KEY); } catch (error) { return null; } },
    set(value) { try { window.localStorage.setItem(STORAGE_KEY, value); } catch (error) {} }
  };

  const ui = {
    'contact.phone': ['电话 / WeChat', '電話 / WeChat', 'Phone / WeChat'],
    'nav.cases': ['案例', '案例', 'Cases'],
    'nav.approach': ['方法', '方法', 'Approach'],
    'nav.accounts': ['账号', '帳號', 'Accounts'],
    'nav.contact': ['联系', '聯絡', 'Contact'],
    'nav.allCases': ['全部案例', '全部案例', 'All cases'],
    'nav.strategy': ['策略', '策略', 'Strategy'],
    'nav.results': ['成果', '成果', 'Results'],
    'nav.system': ['系统', '系統', 'System'],
    'nav.evidence': ['证据', '證據', 'Evidence'],
    'nav.method': ['方法', '方法', 'Method'],
    'nav.language': ['语言', '語言', 'Language'],
    'cta.viewCases': ['查看精选项目', '查看精選項目', 'View selected cases'],
    'cta.openCase': ['查看完整案例', '查看完整案例', 'Open full case'],
    'cta.back': ['← 返回全部案例', '← 返回全部案例', '← Back to all cases'],
    'footer.selected': ['精选作品与能力', '精選作品與能力', 'Selected work & capabilities'],
    'footer.allCases': ['全部案例', '全部案例', 'All cases'],
    'footer.caseNav': ['案例导航', '案例導航', 'Case navigation'],
    'home.selectedOutcomes': ['项目成果摘要', '項目成果摘要', 'Selected outcomes'],
    'home.positioning': ['能做策略，也能落地', '能做策略，也能落地', 'A strategist who can execute'],
    'home.selectedCases': ['精选案例', '精選案例', 'Selected cases'],
    'home.approach': ['我的工作方法', '我的工作方法', 'How I work'],
    'home.accounts': ['账号 portfolio', '帳號 portfolio', 'Account portfolio'],
    'home.contact': ['如果你正在做品牌出海，我们可以聊聊。', '如果你正在做品牌出海，我們可以聊聊。', 'If you are building for overseas markets, let’s talk.'],
    'case.publishedSamples': ['已发布内容样例', '已發布內容樣例', 'Published content samples'],
    'case.allContent': ['全部内容样例', '全部內容樣例', 'All content samples'],
    'case.workbook': ['工作簿证据', '工作簿證據', 'Workbook evidence'],
    'case.source': ['来源', '來源', 'Source'],
    'case.readingNote': ['阅读说明', '閱讀說明', 'Reading note'],
    'case.monthlyRecord': ['月度记录', '月度記錄', 'Monthly record'],
    'case.snsPlan': ['社媒策划计划', '社媒策劃計劃', 'SNS plan'],
    'case.fromPosting': ['从发布内容到运营系统', '從發布內容到運營系統', 'From posting to operating'],
    'case.fullCycle': ['把内容决策变得可见', '把內容決策變得可見', 'Make every content decision visible.'],
    'case.fogattiHero': ['从参数陈述，到 RV 生活伙伴。', '從參數陳述，到 RV 生活夥伴。', 'From specifications to an RV life partner.'],
    'case.empstormHero': ['让咖啡机进入真实的家庭时刻。', '讓咖啡機進入真實的家庭時刻。', 'Put the coffee machine into real family moments.'],
    'case.dataHero': ['把社媒运营，变成团队可以共同决策的系统。', '把社媒運營，變成團隊可以共同決策的系統。', 'Turn social operations into a system the team can decide with.'],
    'case.aiHero': ['让 AI 进入业务细节，而不是停留在“帮我写一段文案”。', '讓 AI 進入業務細節，而不是停留在「幫我寫一段文案」。', 'Bring AI into the business details, not just “write me a caption.”'],
    'home.hero': ['我把产品，做成海外用户愿意买的品牌。', '我把產品，做成海外用戶願意買的品牌。', 'I turn products into brands people overseas want to buy.'],
    'home.heroCopy': ['我是 Stefanie Ouyang，一名面向海外市场的 GTM 与品牌营销从业者。我从受众与竞品出发，完成产品定位、内容策略、社媒运营、KOL 协同与数据复盘。', '我是 Stefanie Ouyang，一名面向海外市場的 GTM 與品牌營銷從業者。我從受眾與競品出發，完成產品定位、內容策略、社媒運營、KOL 協同與數據復盤。', 'I am Stefanie Ouyang, a GTM and brand marketing practitioner focused on overseas markets. I work from audiences and competitors to product positioning, content strategy, social operations, KOL collaboration and performance review.'],
    'home.heroNote': ['不是只负责发布内容，而是把内容放进产品上市、品牌建设和业务转化的完整链路里。', '不是只負責發布內容，而是把內容放進產品上市、品牌建設和業務轉化的完整鏈路裡。', 'I do more than publish content: I connect it to product launches, brand building and business conversion.'],
    'home.outcomeNote': ['以下为我在海外品牌项目中记录并复盘的结果摘要；每个数字都对应具体案例页的项目口径。', '以下為我在海外品牌項目中記錄並復盤的結果摘要；每個數字都對應具體案例頁的項目口徑。', 'The figures below summarize outcomes I recorded and reviewed across overseas brand projects; each number has a defined case-page scope.'],
    'home.positioningLead': ['从品牌问题出发，找到值得被传播的产品价值，再把它落到每一个平台和每一个触点。', '從品牌問題出發，找到值得被傳播的產品價值，再把它落到每一個平台和每一個觸點。', 'I start with the brand problem, find the product value worth spreading, then make it work across every platform and touchpoint.'],
    'home.positioningCopy': ['我的工作横跨 agency 与 in-house：既做过多行业客户的品牌出海全案，也主导过单一品牌的新品上市、预算管理、社媒体系与数据追踪。', '我的工作橫跨 agency 與 in-house：既做過多行業客戶的品牌出海全案，也主導過單一品牌的新品上市、預算管理、社媒體系與數據追蹤。', 'My work spans agency and in-house roles: integrated overseas brand programs for multiple industries, as well as launches, budget management, social systems and tracking for individual brands.'],
    'home.methodLead': ['看市场、受众、竞品和业务目标。', '看市場、受眾、競品和業務目標。', 'Read the market, audience, competitors and business goal.'],
    'home.methodPosition': ['找到产品值得被记住的理由。', '找到產品值得被記住的理由。', 'Find the reason the product deserves to be remembered.'],
    'home.methodBuild': ['把定位翻译成内容与视觉语言。', '把定位翻譯成內容與視覺語言。', 'Translate the positioning into content and visual language.'],
    'home.methodActivate': ['通过社媒、KOL、广告和渠道落地。', '通過社媒、KOL、廣告和渠道落地。', 'Activate through social, KOLs, paid media and channels.'],
    'home.methodLearn': ['用数据复盘，再回到下一轮策略。', '用數據復盤，再回到下一輪策略。', 'Review the data, then feed it into the next strategy cycle.'],
    'home.accountsIntro': ['我曾参与运营的海外社媒账号，按平台归档；点击品牌名称即可打开对应账号。', '我曾參與運營的海外社媒帳號，按平台歸檔；點擊品牌名稱即可打開對應帳號。', 'Overseas social accounts I have worked on, organized by platform. Select a brand name to open the account.']
  };

  const traditional = {
    '运营': '運營', '运营者': '運營者', '运营系统': '運營系統', '运营效率': '運營效率', '内容': '內容', '市场': '市場', '增长': '增長', '项目': '項目', '数据': '數據', '设计': '設計', '视觉': '視覺', '语言': '語言', '规则': '規則', '复盘': '復盤', '通过': '通過', '统一': '統一', '业务': '業務', '协作': '協作', '购买': '購買', '经验': '經驗', '负责': '負責', '个人': '個人', '设备': '設備', '资料': '資料', '计划': '計劃', '记录': '記錄', '选择': '選擇', '发现': '發現', '开始': '開始', '团队': '團隊', '简体中文': '簡體中文', '繁体中文': '繁體中文', '账号': '帳號', '发布': '發布', '复用': '複用', '链接': '連結', '转化': '轉化', '协同': '協同', '专业': '專業', '能力': '能力', '完整': '完整', '继续': '繼續', '实现': '實現', '质量': '質量', '细节': '細節', '场景': '場景', '视觉系统': '視覺系統', '内容策略': '內容策略', '竞品': '競品', '受众': '受眾', '组织': '組織', '发现': '發現', '对比': '對比', '页面': '頁面', '工具': '工具', '规则': '規則', '写入': '寫入', '转换': '轉換', '审校': '審校', '简洁': '簡潔', '专业能力': '專業能力', '后台': '後台', '平台': '平台', '其中': '其中', '并且': '並且', '以及': '以及', '还': '還', '时': '時', '为': '為', '与': '與', '这': '這', '个': '個', '从': '從', '里': '裡', '发': '發', '现': '現', '过': '過', '来': '來', '长': '長', '会': '會', '说': '說', '让': '讓', '变': '變', '为': '為', '国': '國', '际': '際', '机': '機', '电': '電', '脑': '腦', '网': '網', '类': '類', '点': '點', '线': '線', '体': '體', '态': '態', '单': '單', '数': '數', '项': '項', '资': '資', '讯': '訊', '讯息': '訊息', '开': '開', '关': '關', '导': '導', '读': '讀', '写': '寫', '说': '說', '见': '見', '闻': '聞', '间': '間', '问': '問', '题': '題', '决': '決', '断': '斷', '达': '達', '动': '動', '态': '態', '过': '過', '发': '發', '联': '聯', '系': '係', '构': '構', '层': '層', '环': '環', '节': '節', '标': '標', '准': '準', '确': '確', '认': '認', '审': '審', '核': '核', '复': '復', '盘': '盤', '据': '據', '销': '銷', '售': '售', '额': '額', '费': '費', '用': '用', '优': '優', '化': '化', '进': '進', '阶': '階', '数': '數', '值': '值', '产': '產', '品': '品', '务': '務', '营': '營', '销': '銷', '与': '與', '广': '廣', '告': '告', '报': '報', '告': '告'
  };

  const exact = {
    'Cases': ['案例', '案例', 'Cases'], 'Approach': ['方法', '方法', 'Approach'], 'Accounts': ['账号', '帳號', 'Accounts'], 'Contact': ['联系', '聯絡', 'Contact'],
    'Selected outcomes': ['项目成果摘要', '項目成果摘要', 'Selected outcomes'], 'A strategist who can execute': ['能做策略，也能落地', '能做策略，也能落地', 'A strategist who can execute'], 'Selected cases': ['精选案例', '精選案例', 'Selected cases'], 'How I work': ['我的工作方法', '我的工作方法', 'How I work'], 'Account portfolio': ['账号 portfolio', '帳號 portfolio', 'Account portfolio'],
    'Open full case': ['查看完整案例', '查看完整案例', 'Open full case'], 'Published content samples': ['已发布内容样例', '已發布內容樣例', 'Published content samples'], 'Workbook evidence': ['工作簿证据', '工作簿證據', 'Workbook evidence'], 'All cases': ['全部案例', '全部案例', 'All cases'], 'Strategy': ['策略', '策略', 'Strategy'], 'Results': ['成果', '成果', 'Results'], 'System': ['系统', '系統', 'System'], 'Evidence': ['证据', '證據', 'Evidence'], 'Method': ['方法', '方法', 'Method'],
    '← 返回全部案例': ['← 返回全部案例', '← 返回全部案例', '← Back to all cases'], 'Selected work & capabilities': ['精选作品与能力', '精選作品與能力', 'Selected work & capabilities'],
    '项目背景': ['项目背景', '項目背景', 'Project context'], '项目工作：FOGATTI 上市规划': ['项目工作：FOGATTI 上市规划', '項目工作：FOGATTI 上市規劃', 'Project work: FOGATTI launch planning'], '项目工作：Empstorm 北美市场进入': ['项目工作：Empstorm 北美市场进入', '項目工作：Empstorm 北美市場進入', 'Project work: Empstorm North America market entry'], 'Empstorm 北美市场品牌进入': ['Empstorm 北美市场品牌进入', 'Empstorm 北美市場品牌進入', 'Empstorm North America market entry'], '洞察：北美家庭的高级感，不只是参数': ['洞察：北美家庭的高级感，不只是参数', '洞察：北美家庭的高級感，不只是參數', 'Insight: premium is more than specifications in North American homes'], '先找结构性机会': ['先找结构性机会', '先找結構性機會', 'Find the structural opportunity'], '让同一个产品对不同的人说不同的话': ['让同一个产品对不同的人说不同的话', '讓同一個產品對不同的人說不同的話', 'Give the same product a different entry point for each audience'], 'ACDL：把长决策拆成可推进的动作': ['ACDL：把长决策拆成可推进的动作', 'ACDL：把長決策拆成可推進的動作', 'ACDL: Break a long decision into progressable actions'], '平台不是分发清单，而是角色分工': ['平台不是分发清单，而是角色分工', '平台不是分發清單，而是角色分工', 'Platforms are roles, not a distribution checklist'], '内容与资产：一套主张，多次复用': ['内容与资产：一套主张，多次复用', '內容與資產：一套主張，多次複用', 'Content and assets: one proposition, many uses'], '把上市做成一个可复盘的循环': ['把上市做成一个可复盘的循环', '把上市做成一個可復盤的循環', 'Turn the launch into a learning loop'], '项目成果与口径': ['项目成果与口径', '項目成果與口徑', 'Outcomes and measurement scope'], '相关素材': ['相关素材', '相關素材', 'Selected content samples'], '我在这个案例里证明的能力': ['我在这个案例里证明的能力', '我在這個案例裡證明的能力', 'What this case demonstrates'],
    '洞察：当地的高级感，不只是参数': ['洞察：当地的高级感，不只是参数', '洞察：當地的高級感，不只是參數', 'Insight: premium is more than specifications'], '研究方法：Google Trends 与 Brandwatch，用于观察市场语境、受众兴趣与内容机会。': ['研究方法：Google Trends 与 Brandwatch，用于观察市场语境、受众兴趣与内容机会。', '研究方法：Google Trends 與 Brandwatch，用於觀察市場語境、受眾興趣與內容機會。', 'Research method: Google Trends and Brandwatch to observe market language, audience interest and content opportunities.'], '核心创意：把产品颜色变成文化接口': ['核心创意：把产品颜色变成文化接口', '核心創意：把產品顏色變成文化接口', 'Core idea: turn product color into a cultural interface'], '执行方案：四个动作形成一个闭环': ['执行方案：四个动作形成一个闭环', '執行方案：四個動作形成一個閉環', 'Execution: four actions form one loop'], '素材逻辑：同一套视觉，服务不同意图': ['素材逻辑：同一套视觉，服务不同意图', '素材邏輯：同一套視覺，服務不同意圖', 'Asset logic: one visual system, different intent'], '本地化不是翻译，而是调整使用语境': ['本地化不是翻译，而是调整使用语境', '本地化不是翻譯，而是調整使用語境', 'Localization is not translation; it is context design'], '成果：从认知到销售的可见变化': ['成果：从认知到销售的可见变化', '成果：從認知到銷售的可見變化', 'Outcomes: visible movement from awareness to sales'],
    '为什么需要重构': ['为什么需要重构', '為什麼需要重構', 'Why the system needed to be rebuilt'], '从“记录发生了什么”到“知道下一步做什么”': ['从“记录发生了什么”到“知道下一步做什么”', '從「記錄發生了什麼」到「知道下一步做什麼」', 'From recording what happened to knowing what to do next'], '系统架构：四层信息，统一语言': ['系统架构：四层信息，统一语言', '系統架構：四層資訊，統一語言', 'System architecture: four layers, one language'], 'Excel 运营证据：从计划到结果的同一条链路': ['Excel 运营证据：从计划到结果的同一条链路', 'Excel 運營證據：從計劃到結果的同一條鏈路', 'Excel evidence: one chain from plan to result'], '工作流：日追踪，周复盘，月度沉淀': ['工作流：日追踪，周复盘，月度沉淀', '工作流：日追蹤，周復盤，月度沉澱', 'Workflow: track daily, review weekly, consolidate monthly'], '跨部门协作：让表格服务于决策': ['跨部门协作：让表格服务于决策', '跨部門協作：讓表格服務於決策', 'Cross-functional collaboration: make the sheet serve decisions'], '工具化：减少重复劳动，把时间留给判断': ['工具化：减少重复劳动，把时间留给判断', '工具化：減少重複勞動，把時間留給判斷', 'Tooling: reduce repetition and keep time for judgment'], '成果：效率和完整性同时提升': ['成果：效率和完整性同时提升', '成果：效率和完整性同時提升', 'Outcomes: efficiency and completeness improved'], '从“我记得”变成“团队看得见”': ['从“我记得”变成“团队看得见”', '從「我記得」變成「團隊看得見」', 'From “I remember” to “the team can see”'],
    '项目背景': ['项目背景', '項目背景', 'Project context'], '先把“语言问题”拆成四类': ['先把“语言问题”拆成四类', '先把「語言問題」拆成四類', 'First, break language problems into four types'], 'Prompt 不是一句指令，而是一份小型品牌手册': ['Prompt 不是一句指令，而是一份小型品牌手册', 'Prompt 不是一句指令，而是一份小型品牌手冊', 'A prompt is not one instruction; it is a compact brand guide'], '工具规范：给团队一个可交接的输入格式': ['工具规范：给团队一个可交接的输入格式', '工具規範：給團隊一個可交接的輸入格式', 'Tool specification: a handoff-ready input format'], '从工具到团队习惯': ['从工具到团队习惯', '從工具到團隊習慣', 'From tool to team habit'], '成果：从个人经验到标准化解决方案': ['成果：从个人经验到标准化解决方案', '成果：從個人經驗到標準化解決方案', 'Outcomes: from individual experience to a standardized solution'], '把工具放回传播全案': ['把工具放回传播全案', '把工具放回傳播全案', 'Put the tool back into the full communication system'], 'Facebook 双语文案实验区': ['Facebook 双语文案实验区', 'Facebook 雙語文案實驗區', 'Facebook bilingual copy lab']
  };

  const pageTranslations = document.querySelector('#page-translations');
  if (pageTranslations) Object.assign(ui, JSON.parse(pageTranslations.textContent));
  const languageIndex = (lang) => lang === 'zh-TW' ? 1 : lang === 'en' ? 2 : 0;
  const toTraditional = (value) => Object.keys(traditional).sort((a, b) => b.length - a.length).reduce((text, key) => text.split(key).join(traditional[key]), value);
  const current = () => selector.value || storage.get() || 'zh-CN';
  const valueFor = (key, lang) => {
    const row = ui[key];
    return row ? row[languageIndex(lang)] : '';
  };
  const titleCase = (text) => {
    const minor = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'with']);
    const words = [...text.matchAll(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g)];
    let index = 0;
    return text.replace(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g, word => {
      const position = index++;
      if (position > 0 && position < words.length - 1 && minor.has(word.toLowerCase())) return word.toLowerCase();
      // Preserve established spellings such as RV, GTM, AI, YouTube and LinkedIn.
      return /[A-Z]/.test(word.slice(1)) ? word : word[0].toUpperCase() + word.slice(1);
    });
  };
  const update = (lang) => {
    const index = languageIndex(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const value = valueFor(node.dataset.i18n, lang);
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
      node.dataset.i18nAttr.split(',').forEach((name) => {
        const key = node.dataset[`i18n${name[0].toUpperCase()}${name.slice(1)}`];
        const value = key ? valueFor(key, lang) : '';
        if (value) node.setAttribute(name, value);
      });
    });
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,li,th,td,small,figcaption,button').forEach((node) => {
      if (node.hasAttribute('data-i18n') || node.closest('[translate="no"]')) return;
      if (node.children.length) return;
      const text = node.textContent.trim();
      if (!text) return;
      const row = exact[text];
      if (row) node.textContent = row[index];
      else if (lang === 'zh-TW' && /[\u4e00-\u9fff]/.test(text)) node.textContent = toTraditional(text);
    });
    selector.value = lang;
    document.querySelectorAll('h1,h2,h3,h4').forEach(node => {
      if (!node.children.length && !node.closest('[translate="no"]') && /[A-Za-z]/.test(node.textContent) && !/[\u4e00-\u9fff]/.test(node.textContent)) node.textContent = titleCase(node.textContent);
    });
    storage.set(lang);
    const title = document.title;
    if (lang === 'en') document.title = title.replace(/ — Stefanie Ouyang$/, ' — Stefanie Ouyang');
  };

  const initial = storage.get() || document.documentElement.lang || 'zh-CN';
  selector.value = ['zh-CN', 'zh-TW', 'en'].includes(initial) ? initial : 'zh-CN';
  selector.addEventListener('change', () => update(selector.value));
  update(selector.value);
})();
