export interface EquipmentItem {
  name: string;
  purpose: string;
  model: string;
  count: string;
}

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

export const equipmentItems: EquipmentItem[] = [
  {
    name: '[待企业确认：设备真实名称]',
    purpose: '现场照片显示该设备用于无纺布材料连续加工与收卷，具体工艺作用需企业确认。',
    model: '[待企业确认：设备型号]',
    count: '[待企业确认：设备数量]',
  },
  {
    name: '[待企业确认：辅助设备名称]',
    purpose: '[待企业确认：辅助设备用途]',
    model: '[待企业确认：辅助设备型号]',
    count: '[待企业确认：辅助设备数量]',
  },
];

export const qualitySteps = [
  { title: '来料确认', description: '记录原料名称、批次与随附资料；企业实际检查项目待确认。' },
  { title: '过程检查', description: '记录生产过程中的规格与外观状态；检查频次待企业确认。' },
  { title: '成品检查', description: '按订单要求核对成品规格、包装和标识；具体指标待确认。' },
  { title: '留样与记录', description: '是否留样、保存多久及记录方式由企业提供真实流程。' },
];

export const applications: ApplicationItem[] = [
  { name: '包装与防护', focus: '克重、强度、外观与包装方式', candidateProduct: '[待企业确认：对应产品]', inquiryInput: '被包装物、使用方式和尺寸' },
  { name: '家具与家居', focus: '材质、手感、颜色与尺寸稳定性', candidateProduct: '[待企业确认：对应产品]', inquiryInput: '具体部位、加工方式和目标规格' },
  { name: '农业与园艺', focus: '使用环境、透气性、耐候需求与铺设方式', candidateProduct: '[待企业确认：对应产品]', inquiryInput: '使用地区、周期和覆盖方式' },
  { name: '过滤与工业', focus: '过滤对象、粒径、阻力与温湿度条件', candidateProduct: '[待企业确认：对应产品]', inquiryInput: '介质、工况和目标指标' },
  { name: '一次性用品', focus: '接触用途、柔软度、卫生与合规要求', candidateProduct: '[待企业确认：对应产品]', inquiryInput: '产品用途、执行标准和加工方式' },
  { name: '其他定制用途', focus: '材料、克重、幅宽、颜色和后加工要求', candidateProduct: '[待企业确认：对应产品]', inquiryInput: '样品、图纸或完整规格表' },
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
    summary: '从用途、材料、克重、幅宽、包装到质量要求，整理一份可直接用于询价的基础清单。',
    publishedAt: '2026-08-04',
    updatedAt: '2026-08-04',
  },
];
