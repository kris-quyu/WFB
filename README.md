# 传统小型无纺布企业官网

这是一个使用 Astro 静态生成的中文制造企业官网项目，适合部署到 GitHub + EdgeOne Pages + 企业备案域名。

当前项目是“资料待确认”的建设版本。页面结构、SEO 元数据和结构化数据已经就位，但企业事实必须核实后才能正式发布。

## 页面栏目

- `/` 企业首页
- `/about/` 企业介绍
- `/factory/` 工厂实力
- `/equipment/` 生产设备
- `/quality/` 质量检测
- `/products/product-a/` 产品 A
- `/products/product-b/` 产品 B
- `/products/product-c/` 产品 C
- `/applications/` 应用场景
- `/knowledge/` FAQ / 知识库
- `/knowledge/nonwoven-procurement-checklist/` 知识文章示例

## 本地运行

要求：Node.js 22.12 或更高，pnpm 11 或兼容版本。

```text
pnpm install
pnpm run dev
```

完整检查：

```text
pnpm run check
pnpm test
pnpm run build
```

构建产物位于 `dist/`。

## 企业资料集中修改位置

先修改以下数据文件，不要在多个页面分别替换同一事实：

- `src/data/site.ts`：企业名称、简称、域名、成立时间、地址、电话、邮箱、备案号和简介。
- `src/data/products.ts`：三类产品的真实名称、材料、工艺、参数、应用、包装和定制范围。
- `src/data/content.ts`：设备、质量流程、应用场景、FAQ 和知识文章元数据。
- `astro.config.mjs`：将 `https://www.example.com/` 替换为正式备案域名。

字段以 `[待企业确认：……]` 开头时，表示该事实尚未核实。上线前应逐项替换或删除，不要让 AI 推测补齐。

## 上线前必填清单

### 企业主体

- 企业法定名称与常用简称
- 成立时间
- 注册地址与实际工厂地址
- 联系电话与企业邮箱
- 正式域名与 ICP 备案号
- 经过企业确认的简介与经营范围
- Logo 原文件（建议 SVG 或透明 PNG）

### 三类产品

- 产品真实名称和所属类别
- 材料组成与实际生产工艺
- 克重、幅宽、颜色、卷长等可做范围
- 允许偏差、包装方式与 MOQ
- 主要应用和不适用场景
- 可定制项、打样政策与常规交期

### 工厂与设备

- 厂房门头、车间全景、原料区、仓储区、包装和发货照片
- 每张照片的拍摄位置与用途说明
- 设备正式名称、制造商、型号、数量和实际用途
- 生产流程及关键控制点

当前 `public/images/nonwoven-production-line.png` 为用户提供的设备现场图。它只能证明照片中可见的生产现场，不能单独证明设备型号、数量、产能或产品性能。

### 质量资料

- 实际执行的来料、过程和成品检查流程
- 检测项目、频次与记录方式
- 检测设备名称、型号和真实照片
- 实际执行标准的完整名称和编号
- 可公开的证书原件与检测报告

没有证书或报告时，不发布“通过认证”“达到某标准”等结论。

## SEO / GEO 已包含

- 独立页面 title、description、canonical 和 Open Graph 元数据
- `robots.txt` 和 XML sitemap
- Organization、Product、BreadcrumbList、Article、FAQPage JSON-LD
- 语义化标题、参数表、面包屑和站内链接
- 面向采购问题的 FAQ 和知识文章模板

结构化数据只引用页面可见内容，不包含价格、评分、库存、虚构认证或检测结论。

## GitHub 与 EdgeOne Pages

1. 将项目推送到企业 GitHub 私有仓库。
2. 在 EdgeOne Pages 中连接该仓库。
3. 运行环境选择 Node.js 22.12 或更高。
4. 安装命令使用 `pnpm install --frozen-lockfile`。
5. 构建命令使用 `pnpm run build`。
6. 输出目录填写 `dist`。
7. 先使用 EdgeOne 预览域名检查，再绑定企业正式域名。
8. 使用中国大陆节点前，确保域名主体和 ICP 备案符合当前平台与监管要求。
9. 正式域名确定后，同时更新 `astro.config.mjs`、`src/data/site.ts` 和搜索平台提交资料。

## 发布原则

- GitHub 负责代码版本管理，不使用 `github.io` 作为企业正式品牌域名。
- EdgeOne Pages 负责静态构建和访问。
- 企业备案域名是长期官网资产。
- 企业名称、地址、电话、域名应与 1688、爱采购、行业平台和企业资料保持一致。
- 任何产能、客户、出口、认证、专利或检测数据，只有在企业能够证明时才发布。
