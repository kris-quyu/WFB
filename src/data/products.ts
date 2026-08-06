export interface ProductSpecification {
  label: string;
  value: string;
}

export type ProductSlug = 'product-a' | 'product-b' | 'product-c';

export interface Product {
  slug: ProductSlug;
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
  selectionFocus: string[];
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
    material: '行业常见原料包括聚丙烯、聚酯等；实际材质以样品或订单要求为准',
    process: '无纺材料通常由纤维成网后通过热粘合、机械加固等方式形成，具体类型需要结合用途确认',
    specifications: [
      { label: '克重', value: '根据用途、手感和后续加工要求确认' },
      { label: '幅宽', value: '根据成品尺寸、裁切方式和损耗要求确认' },
      { label: '颜色', value: '根据样品、色样或订单要求确认' },
      { label: '卷长', value: '结合克重、幅宽、包装和运输方式确认' },
    ],
    features: ['可按用途讨论克重、幅宽和颜色', '实际手感、强度与外观以样品和确认规格为准'],
    applications: ['包装与防护', '家具与家居辅料', '过滤、农业覆盖及其他加工用途'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '通常采用卷材包装；标签、外包装和运输要求在询价时确认',
    purchaseChecklist: commonChecklist,
    selectionFocus: ['最终用途', '材质与克重', '幅宽与卷长', '颜色与后续加工'],
  },
  {
    slug: 'product-b',
    displayName: '针刺布',
    confirmedName: '针刺布',
    image: '/images/product-needle-punched-fabric.png',
    imageAlt: '天瑞白色针刺布卷材实际产品照片',
    summary: '针刺布通过针刺方式使纤维网形成结构，常见于过滤、衬垫、防护、家具辅料及工业加工，实际性能取决于原料和规格。',
    material: '行业常见原料包括涤纶、丙纶及其他纤维，实际配方以样品或订单要求为准',
    process: '常见流程包括开松混合、梳理成网、针刺加固和整理收卷',
    specifications: [
      { label: '克重', value: '结合厚度、密度、手感和使用部位确认' },
      { label: '幅宽', value: '根据裁切排版、后续加工和成品尺寸确认' },
      { label: '颜色', value: '根据样品、色样和外观要求确认' },
      { label: '卷长', value: '结合克重、幅宽、包装和搬运要求确认' },
    ],
    features: ['可根据后续加工方式沟通厚度与手感', '强度、密度等指标以确认样品或检测资料为准'],
    applications: ['过滤与工业加工', '衬垫与防护', '家具及其他辅料用途'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '通常采用卷材包装；单卷要求、标签和外包装在询价时确认',
    purchaseChecklist: commonChecklist,
    selectionFocus: ['克重与厚度', '硬挺度与手感', '颜色与尺寸', '使用工况'],
  },
  {
    slug: 'product-c',
    displayName: '土工布',
    confirmedName: '土工布',
    image: '/images/product-geotextile.png',
    imageAlt: '天瑞黑色土工布卷材实际产品照片',
    summary: '土工布常用于工程中的隔离、过滤、排水或防护场景，选型需要结合铺设位置、土体条件、设计要求和执行标准。',
    material: '行业常见原料包括聚酯、聚丙烯等合成纤维，实际材质需结合产品资料确认',
    process: '土工布有短纤针刺、长丝和机织等常见类型，工程选型应以设计要求为依据',
    specifications: [
      { label: '克重', value: '根据工程设计指标、用途和铺设条件确认' },
      { label: '幅宽', value: '结合铺设面积、搭接方式和施工条件确认' },
      { label: '颜色', value: '以产品类型、设计资料或样品要求为准' },
      { label: '卷长', value: '结合幅宽、单卷重量、运输和现场吊装条件确认' },
    ],
    features: ['铺设环境和工程要求是选型依据', '力学与渗透等指标须以真实产品资料和项目要求核对'],
    applications: ['道路与场地基础', '排水、过滤与隔离', '边坡、水利及其他工程防护场景'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '通常采用卷材包装；单卷规格、标签和运输防护要求需提前确认',
    purchaseChecklist: commonChecklist,
    selectionFocus: ['工程用途', '设计指标', '幅宽与卷长', '铺设条件与数量'],
  },
];

export const getProduct = (slug: ProductSlug) => products.find((product) => product.slug === slug);
