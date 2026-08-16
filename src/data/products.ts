import { withBase } from '../utils/path';

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
  '说明最终用途、使用部位、接触介质与使用环境',
  '有现用样品时，提供实物或清晰的正反面图片',
  '提供目标克重、幅宽、卷长、颜色和采购数量',
  '说明后加工、包装、标签、运输以及执行标准或检测项目',
];

export const products: Product[] = [
  {
    slug: 'product-a',
    displayName: '无纺布',
    confirmedName: '无纺布',
    image: withBase('/images/product-nonwoven.png'),
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
    features: [
      '不能只按产品名称判断或报价；同为无纺布，原料、成网与加固方式、克重和手感可能不同',
      '涉及承重、过滤、接触或耐候要求时，需要提供目标指标、现用样品或完整使用条件',
    ],
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
    image: withBase('/images/product-needle-punched-fabric.png'),
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
    features: [
      '不能只凭厚度或手感选型；纤维原料、克重、密实程度和后整理都会影响实际表现',
      '用于过滤时，需要说明介质、温湿度、颗粒情况、运行方式和目标指标',
    ],
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
    image: withBase('/images/product-geotextile.png'),
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
    features: [
      '不能只按克重采购；相同克重的土工布也可能因原料、结构和工艺不同而具有不同性能',
      '工程用途应结合设计文件、执行标准、铺设条件以及力学、过滤或排水指标核对',
    ],
    applications: ['道路与场地基础', '排水、过滤与隔离', '边坡、水利及其他工程防护场景'],
    customization: ['克重', '幅宽', '颜色', '包装与标签'],
    packaging: '通常采用卷材包装；单卷规格、标签和运输防护要求需提前确认',
    purchaseChecklist: commonChecklist,
    selectionFocus: ['工程用途', '设计指标', '幅宽与卷长', '铺设条件与数量'],
  },
];

export const getProduct = (slug: ProductSlug) => products.find((product) => product.slug === slug);
