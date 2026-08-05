export interface ApplicationItem {
  name: string;
  focus: string;
  candidateProduct: string;
  inquiryInput: string;
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

export const faqItems: FaqItem[] = [
  { question: 'MOQ 最低起订量是多少？', answer: '[待企业确认：各产品 MOQ]。起订量通常需要结合产品、规格、颜色和包装方式确认。' },
  { question: '可以先打样吗？', answer: '[待企业确认：打样政策、费用和周期]。询样时请提供用途与目标参数。' },
  { question: '正常交期需要多久？', answer: '[待企业确认：常规交期]。实际交期以规格、数量、原料和生产安排为准。' },
  { question: '提供哪些包装方式？', answer: '[待企业确认：包装方式]。如需唛头、标签或托盘，请在询价时说明。' },
  { question: '运输如何安排？', answer: '[待企业确认：运输与交付方式]。报价前需确认收货地点和贸易条款。' },
  { question: '是否支持规格定制？', answer: '[待企业确认：可定制范围]。请提供克重、幅宽、颜色、卷长和用途。' },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: 'nonwoven-procurement-checklist',
    title: '无纺布采购前需要确认哪些信息？',
    summary: '从用途、材料、克重、幅宽、包装到执行要求，整理无纺布、针刺布与土工布询价前需要确认的基础信息。',
    publishedAt: '2026-08-04',
    updatedAt: '2026-08-04',
  },
];
