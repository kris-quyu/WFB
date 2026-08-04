export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  slug: 'product-a' | 'product-b' | 'product-c';
  displayName: string;
  confirmedName: string;
  summary: string;
  material: string;
  process: string;
  specifications: ProductSpecification[];
  features: string[];
  applications: string[];
  customization: string[];
  packaging: string;
  purchaseChecklist: string[];
}

const commonChecklist = [
  '确认用途、接触介质与使用环境',
  '提供目标克重、幅宽、卷长与颜色',
  '说明包装、标签与运输要求',
  '如有执行标准或检测项目，请在询价时提供',
];

export const products: Product[] = [
  {
    slug: 'product-a',
    displayName: '产品 A',
    confirmedName: '[待企业确认：产品 A 真实名称]',
    summary: '用于展示企业第一类主营无纺布产品，真实材料、工艺和用途需由企业确认。',
    material: '[待企业确认：产品 A 材质]',
    process: '[待企业确认：产品 A 工艺]',
    specifications: [
      { label: '克重', value: '[待企业确认：产品 A 克重范围]' },
      { label: '幅宽', value: '[待企业确认：产品 A 幅宽范围]' },
      { label: '颜色', value: '[待企业确认：产品 A 可选颜色]' },
      { label: '卷长', value: '[待企业确认：产品 A 卷长]' },
    ],
    features: ['规格以企业确认资料为准', '可定制范围需结合设备和订单确认'],
    applications: ['[待企业确认：产品 A 主要应用]'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '[待企业确认：产品 A 包装方式]',
    purchaseChecklist: commonChecklist,
  },
  {
    slug: 'product-b',
    displayName: '产品 B',
    confirmedName: '[待企业确认：产品 B 真实名称]',
    summary: '用于展示企业第二类主营无纺布产品，页面不预设未经确认的性能结论。',
    material: '[待企业确认：产品 B 材质]',
    process: '[待企业确认：产品 B 工艺]',
    specifications: [
      { label: '克重', value: '[待企业确认：产品 B 克重范围]' },
      { label: '幅宽', value: '[待企业确认：产品 B 幅宽范围]' },
      { label: '颜色', value: '[待企业确认：产品 B 可选颜色]' },
      { label: '卷长', value: '[待企业确认：产品 B 卷长]' },
    ],
    features: ['材料组成需由企业确认', '物理指标需以真实检测记录为准'],
    applications: ['[待企业确认：产品 B 主要应用]'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '[待企业确认：产品 B 包装方式]',
    purchaseChecklist: commonChecklist,
  },
  {
    slug: 'product-c',
    displayName: '产品 C',
    confirmedName: '[待企业确认：产品 C 真实名称]',
    summary: '用于展示企业第三类主营无纺布产品，适用场景和参数等待真实资料。',
    material: '[待企业确认：产品 C 材质]',
    process: '[待企业确认：产品 C 工艺]',
    specifications: [
      { label: '克重', value: '[待企业确认：产品 C 克重范围]' },
      { label: '幅宽', value: '[待企业确认：产品 C 幅宽范围]' },
      { label: '颜色', value: '[待企业确认：产品 C 可选颜色]' },
      { label: '卷长', value: '[待企业确认：产品 C 卷长]' },
    ],
    features: ['产品定义等待企业资料', '特殊规格需单独评估'],
    applications: ['[待企业确认：产品 C 主要应用]'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '[待企业确认：产品 C 包装方式]',
    purchaseChecklist: commonChecklist,
  },
];

export const getProduct = (slug: Product['slug']) => products.find((product) => product.slug === slug);
