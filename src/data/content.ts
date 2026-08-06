import type { ProductSlug } from './products';

export interface ApplicationItem {
  name: string;
  focus: string;
  candidateProduct: string;
  inquiryInput: string;
}

export interface MicroScenario {
  slug: string;
  productSlug: ProductSlug;
  title: string;
  question: string;
  issue: string;
  focus: string[];
  candidateProduct: string;
  inquiryInput: string[];
  featured: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface KnowledgeArticle {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
}

export const applications: ApplicationItem[] = [
  { name: '包装与防护', focus: '根据被包装物和加工方式确认克重、幅宽、颜色与外观', candidateProduct: '无纺布、针刺布', inquiryInput: '被包装物、使用方式、尺寸和数量' },
  { name: '家具与家居', focus: '结合使用部位讨论手感、厚度、颜色和后续加工', candidateProduct: '无纺布、针刺布', inquiryInput: '具体部位、加工方式和目标规格' },
  { name: '过滤与工业', focus: '根据过滤对象、介质和工况确认材料与结构要求', candidateProduct: '针刺布、无纺布', inquiryInput: '介质、工况、目标指标和执行标准' },
  { name: '工程铺设', focus: '结合隔离、过滤、排水或防护用途核对工程要求', candidateProduct: '土工布', inquiryInput: '铺设位置、土体条件、设计指标和工程数量' },
  { name: '农业与覆盖', focus: '根据使用地区、周期和铺设方式确认透气与耐候需求', candidateProduct: '无纺布', inquiryInput: '使用地区、覆盖对象、周期和尺寸' },
  { name: '其他加工用途', focus: '从样品或图纸出发确认材质、克重、幅宽和后加工要求', candidateProduct: '无纺布、针刺布、土工布', inquiryInput: '样品、图片、图纸或完整规格表' },
];

export const microScenarios: MicroScenario[] = [
  {
    slug: 'packaging-scratch-protection',
    productSlug: 'product-a',
    title: '产品包装防尘、防刮用布怎么选',
    question: '产品包装防尘、防刮用布怎么选？',
    issue: '包装防护需要同时考虑被包装物表面、包覆方式和运输过程，不能只按厚薄判断。',
    focus: ['被包装物材质与表面', '包覆或缝制方式', '克重与幅宽', '颜色和外观'],
    candidateProduct: '无纺布；需要更厚实衬垫时也可比较针刺布',
    inquiryInput: ['被包装物照片与尺寸', '使用方式', '目标颜色', '采购数量'],
    featured: true,
  },
  {
    slug: 'furniture-bottom-lining',
    productSlug: 'product-a',
    title: '家具底布、沙发内衬需要确认哪些参数',
    question: '家具底布、沙发内衬需要确认哪些参数？',
    issue: '家具不同部位对遮盖、手感、厚度和后续固定方式的要求不同。',
    focus: ['使用部位', '克重与手感', '幅宽与裁切尺寸', '钉合、缝制或复合方式'],
    candidateProduct: '无纺布；需要衬垫感时可比较针刺布',
    inquiryInput: ['家具部位照片', '现用样品或规格', '裁切尺寸', '预计数量'],
    featured: true,
  },
  {
    slug: 'bag-lining-handfeel',
    productSlug: 'product-a',
    title: '箱包、手袋或制品衬布如何确认厚度与手感',
    question: '箱包、手袋或制品衬布如何确认厚度与手感？',
    issue: '衬布会影响制品的手感、支撑和加工表现，最好结合实物样品讨论。',
    focus: ['使用位置', '目标厚度与手感', '颜色', '缝制或复合工艺'],
    candidateProduct: '无纺布',
    inquiryInput: ['成品用途', '参考样品', '目标尺寸', '后续加工方式'],
    featured: false,
  },
  {
    slug: 'agricultural-covering',
    productSlug: 'product-a',
    title: '农业覆盖使用时如何确认幅宽和使用周期',
    question: '农业覆盖使用时如何确认幅宽和使用周期？',
    issue: '覆盖对象、地区环境和铺设周期会影响材料、幅宽与铺设方式的选择。',
    focus: ['覆盖对象', '使用地区与季节', '铺设周期', '幅宽和固定方式'],
    candidateProduct: '适用于覆盖用途的无纺布类型，具体需按环境确认',
    inquiryInput: ['使用地区', '覆盖面积', '预计周期', '铺设方式'],
    featured: false,
  },
  {
    slug: 'cutting-sewing-lamination',
    productSlug: 'product-a',
    title: '后续需要裁切、缝制或复合时应提前说明什么',
    question: '无纺布后续需要裁切、缝制或复合时应提前说明什么？',
    issue: '后加工方式会影响材料类型、手感、幅宽、公差和包装安排。',
    focus: ['裁切尺寸', '缝制或复合方式', '外观要求', '允许损耗'],
    candidateProduct: '根据后加工方式选择的无纺布',
    inquiryInput: ['工艺图或成品照片', '目标尺寸', '材料要求', '加工数量'],
    featured: false,
  },
  {
    slug: 'sample-without-specification',
    productSlug: 'product-a',
    title: '有样品但没有规格表时如何整理询价信息',
    question: '只有无纺布样品、没有规格表时如何询价？',
    issue: '只有样品时，需要把样品用途、尺寸、外观和现有使用情况一起说明。',
    focus: ['样品材质线索', '克重与厚度测量', '幅宽和颜色', '最终用途'],
    candidateProduct: '以样品比对结果为基础确认无纺布类型',
    inquiryInput: ['实物样品', '正反面照片', '使用部位', '预计采购量'],
    featured: false,
  },
  {
    slug: 'furniture-mattress-layer',
    productSlug: 'product-b',
    title: '家具、床垫夹层使用针刺布要关注什么',
    question: '家具、床垫夹层使用针刺布要关注什么？',
    issue: '夹层材料需要结合所在部位、支撑需求和后续缝制方式讨论。',
    focus: ['使用部位', '克重与厚度', '软硬和手感', '幅宽与裁切方式'],
    candidateProduct: '针刺布',
    inquiryInput: ['夹层位置', '参考样品', '目标尺寸', '缝制或复合方式'],
    featured: false,
  },
  {
    slug: 'footwear-bag-padding',
    productSlug: 'product-b',
    title: '鞋材和箱包衬垫如何确认厚度与硬挺度',
    question: '鞋材和箱包衬垫如何确认厚度与硬挺度？',
    issue: '衬垫的厚度、回弹和硬挺感需要结合成品结构及加工方式判断。',
    focus: ['使用位置', '厚度与硬挺度', '颜色', '冲切、缝制或复合'],
    candidateProduct: '针刺布',
    inquiryInput: ['成品结构图或照片', '参考样品', '目标手感', '数量'],
    featured: false,
  },
  {
    slug: 'filtration-working-condition',
    productSlug: 'product-b',
    title: '过滤用途如何说明介质、工况与目标要求',
    question: '针刺布用于过滤时如何说明介质、工况与目标要求？',
    issue: '过滤选型必须先明确接触介质和运行条件，不能只用克重代替性能要求。',
    focus: ['过滤介质', '温度与湿度', '颗粒或杂质情况', '目标指标与执行要求'],
    candidateProduct: '与具体工况匹配的针刺过滤材料',
    inquiryInput: ['介质说明', '运行工况', '现用材料', '目标测试项目'],
    featured: true,
  },
  {
    slug: 'industrial-padding-protection',
    productSlug: 'product-b',
    title: '工业垫层或防护用布如何选择克重和尺寸',
    question: '工业垫层或防护用针刺布如何选择克重和尺寸？',
    issue: '垫层与防护用途需要结合承托对象、受力方式和重复使用情况选型。',
    focus: ['防护对象', '受力或摩擦情况', '克重与厚度', '成品尺寸'],
    candidateProduct: '针刺布',
    inquiryInput: ['使用现场照片', '接触对象', '目标尺寸', '使用频次'],
    featured: false,
  },
  {
    slug: 'color-handfeel-sample',
    productSlug: 'product-b',
    title: '颜色、手感、厚度有要求时如何提供样品',
    question: '针刺布对颜色、手感和厚度有要求时如何提供样品？',
    issue: '仅凭文字很难统一手感和颜色判断，实物样品或明确色样更有效。',
    focus: ['样品代表性', '目标颜色', '厚度与手感', '允许差异'],
    candidateProduct: '按样品和用途沟通的针刺布',
    inquiryInput: ['完整样品', '颜色参照', '使用部位', '目标数量'],
    featured: false,
  },
  {
    slug: 'needle-punch-process',
    productSlug: 'product-b',
    title: '针刺布常见工艺流程与采购注意事项',
    question: '针刺布常见工艺流程与采购注意事项有哪些？',
    issue: '针刺布通常经过开松混合、梳理成网、针刺加固和整理收卷，原料与规格会影响最终表现。',
    focus: ['纤维原料', '克重与厚度', '针刺后的密实程度', '后整理和收卷'],
    candidateProduct: '针刺布',
    inquiryInput: ['最终用途', '参考样品', '目标规格', '需要关注的性能项目'],
    featured: true,
  },
  {
    slug: 'roadbed-site-separation',
    productSlug: 'product-c',
    title: '路基或场地隔离使用土工布要提供什么信息',
    question: '路基或场地隔离使用土工布要提供什么信息？',
    issue: '隔离用途需要结合上下层材料、铺设位置和施工方式核对产品指标。',
    focus: ['铺设位置', '上下层土体或材料', '设计指标', '搭接与施工条件'],
    candidateProduct: '按工程设计要求选用的土工布',
    inquiryInput: ['工程部位', '设计图或规格表', '铺设面积', '交货地点'],
    featured: true,
  },
  {
    slug: 'filtration-drainage',
    productSlug: 'product-c',
    title: '反滤、排水场景如何说明工程条件',
    question: '土工布用于反滤、排水时如何说明工程条件？',
    issue: '反滤和排水要求与土体颗粒、渗流方向及排水结构有关，需要按设计核对。',
    focus: ['土体情况', '水流与排水方向', '设计指标', '铺设结构'],
    candidateProduct: '满足项目设计指标的土工布',
    inquiryInput: ['土体或介质说明', '结构图', '指标要求', '工程数量'],
    featured: false,
  },
  {
    slug: 'slope-protection-covering',
    productSlug: 'product-c',
    title: '护坡、防护或覆盖用途应关注哪些指标',
    question: '土工布用于护坡、防护或覆盖时应关注哪些指标？',
    issue: '防护对象、坡面条件、暴露环境和固定方式都会影响选型。',
    focus: ['坡面与基层条件', '防护目标', '暴露周期', '固定和搭接方式'],
    candidateProduct: '按防护用途和设计要求选择的土工布',
    inquiryInput: ['现场照片', '坡面尺寸', '设计要求', '施工计划'],
    featured: false,
  },
  {
    slug: 'landscape-project',
    productSlug: 'product-c',
    title: '园林、景观工程如何确认铺设位置和数量',
    question: '园林、景观工程如何确认土工布铺设位置和数量？',
    issue: '园林工程中的隔离、过滤和覆盖部位不同，计算数量前应先确认铺设范围与搭接。',
    focus: ['具体用途', '铺设平面', '搭接和损耗', '现场运输条件'],
    candidateProduct: '与园林工程用途匹配的土工布',
    inquiryInput: ['平面图或尺寸', '铺设部位', '搭接要求', '收货地址'],
    featured: false,
  },
  {
    slug: 'pipeline-foundation',
    productSlug: 'product-c',
    title: '管道或基础施工中的土工布如何核对尺寸',
    question: '管道或基础施工中的土工布如何核对尺寸？',
    issue: '尺寸需要结合沟槽或基础宽度、包覆方式、搭接长度和施工损耗计算。',
    focus: ['施工断面', '包覆或铺设方式', '幅宽与搭接', '卷材搬运条件'],
    candidateProduct: '按设计规格选用的土工布',
    inquiryInput: ['施工图', '断面尺寸', '设计指标', '预计用量'],
    featured: false,
  },
  {
    slug: 'geotextile-inquiry-documents',
    productSlug: 'product-c',
    title: '土工布工程询价需要准备哪些设计资料',
    question: '土工布工程询价需要准备哪些设计资料？',
    issue: '完整的设计资料能减少仅凭产品名称报价造成的规格偏差。',
    focus: ['产品类型', '设计指标', '单卷规格', '执行要求与交货安排'],
    candidateProduct: '以项目设计文件为依据确认的土工布',
    inquiryInput: ['设计图或材料表', '标准与指标', '工程数量', '交货地点和时间要求'],
    featured: true,
  },
];

export const featuredScenarios = microScenarios.filter((scenario) => scenario.featured);

export const getScenariosForProduct = (productSlug: ProductSlug) =>
  microScenarios.filter((scenario) => scenario.productSlug === productSlug);

export const faqItems: FaqItem[] = [
  { question: 'MOQ 最低起订量是多少？', answer: '起订量会受到产品类别、材质、克重、幅宽、颜色和包装方式影响。请先提供用途与目标规格，再确认适合的生产数量和报价。' },
  { question: '可以先打样吗？', answer: '如有现有样品或接近规格，可先沟通样品情况；需要定制打样时，应说明材质、尺寸、颜色、最终用途和后续加工要求。' },
  { question: '正常交期需要多久？', answer: '交期根据产品规格、订单数量、原料准备和当前生产安排确定，以规格确认后的回复为准。' },
  { question: '提供哪些包装方式？', answer: '包装方式需要结合卷材规格、标签、唛头、外包装和运输要求确认，询价时请说明是否有指定包装方案。' },
  { question: '运输如何安排？', answer: '运输安排需要先确认收货地点、产品数量、单卷规格和交付要求，再沟通适合的运输方式与费用。' },
  { question: '是否支持规格定制？', answer: '无纺材料通常可围绕克重、幅宽、颜色、卷长和包装方式沟通，最终以具体产品、样品确认和生产安排为准。' },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: 'nonwoven-procurement-checklist',
    title: '无纺布采购前需要确认哪些信息？',
    summary: '从用途、材料、克重、幅宽、包装到执行要求，整理无纺布、针刺布与土工布询价前需要确认的基础信息。',
    publishedAt: '2026-08-04',
    updatedAt: '2026-08-06',
  },
];
