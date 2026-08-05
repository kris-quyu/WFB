export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  slug: 'product-a' | 'product-b' | 'product-c';
  displayName: string;
  confirmedName: string;
  image: string;
  imageAlt: string;
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
    displayName: '无纺布',
    confirmedName: '无纺布',
    image: '/images/product-nonwoven.png',
    imageAlt: '天瑞无纺布白色卷材实际产品照片',
    summary: '无纺布以卷材形式供应，常用于包装防护、家具辅料、过滤、农业覆盖及其他加工场景，具体选型需要结合用途和目标规格。',
    material: '[待企业确认：无纺布具体材质与配比]',
    process: '[待企业确认：无纺布具体生产工艺]',
    specifications: [
      { label: '克重', value: '[待企业确认：无纺布克重范围]' },
      { label: '幅宽', value: '[待企业确认：无纺布幅宽范围]' },
      { label: '颜色', value: '[待企业确认：无纺布可选颜色]' },
      { label: '卷长', value: '[待企业确认：无纺布卷长]' },
    ],
    features: ['可按用途讨论克重、幅宽和颜色', '实际手感、强度与外观以样品和确认规格为准'],
    applications: ['包装与防护', '家具与家居辅料', '过滤、农业覆盖及其他加工用途'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '[待企业确认：无纺布包装方式]',
    purchaseChecklist: commonChecklist,
  },
  {
    slug: 'product-b',
    displayName: '针刺布',
    confirmedName: '针刺布',
    image: '/images/product-needle-punched-fabric.png',
    imageAlt: '天瑞白色针刺布卷材实际产品照片',
    summary: '针刺布通过针刺方式使纤维网形成结构，常见于过滤、衬垫、防护、家具辅料及工业加工，实际性能取决于原料和规格。',
    material: '[待企业确认：针刺布纤维原料]',
    process: '针刺工艺；具体流程与后整理方式待企业确认',
    specifications: [
      { label: '克重', value: '[待企业确认：针刺布克重范围]' },
      { label: '幅宽', value: '[待企业确认：针刺布幅宽范围]' },
      { label: '颜色', value: '[待企业确认：针刺布可选颜色]' },
      { label: '卷长', value: '[待企业确认：针刺布卷长]' },
    ],
    features: ['可根据后续加工方式沟通厚度与手感', '强度、密度等指标以确认样品或检测资料为准'],
    applications: ['过滤与工业加工', '衬垫与防护', '家具及其他辅料用途'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '[待企业确认：针刺布包装方式]',
    purchaseChecklist: commonChecklist,
  },
  {
    slug: 'product-c',
    displayName: '土工布',
    confirmedName: '土工布',
    image: '/images/product-geotextile.png',
    imageAlt: '天瑞黑色土工布卷材实际产品照片',
    summary: '土工布常用于工程中的隔离、过滤、排水或防护场景，选型需要结合铺设位置、土体条件、设计要求和执行标准。',
    material: '[待企业确认：土工布具体材质]',
    process: '[待企业确认：土工布具体生产工艺]',
    specifications: [
      { label: '克重', value: '[待企业确认：土工布克重范围]' },
      { label: '幅宽', value: '[待企业确认：土工布幅宽范围]' },
      { label: '颜色', value: '[待企业确认：土工布可选颜色]' },
      { label: '卷长', value: '[待企业确认：土工布卷长]' },
    ],
    features: ['铺设环境和工程要求是选型依据', '力学与渗透等指标须以真实产品资料和项目要求核对'],
    applications: ['道路与场地基础', '排水、过滤与隔离', '边坡、水利及其他工程防护场景'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '[待企业确认：土工布包装方式]',
    purchaseChecklist: commonChecklist,
  },
];

export const getProduct = (slug: Product['slug']) => products.find((product) => product.slug === slug);
