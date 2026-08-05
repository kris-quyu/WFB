export const PLACEHOLDER_PREFIX = '[待企业确认：';

export const siteConfig = {
  siteUrl: 'https://www.example.com/',
  companyName: '[待企业确认：企业法定名称]',
  shortName: '[待企业确认：企业简称]',
  tagline: '专注无纺布产品的生产与供应',
  foundedAt: '[待企业确认：成立时间]',
  registeredAddress: '[待企业确认：注册地址]',
  factoryAddress: '[待企业确认：工厂地址]',
  phone: '[待企业确认：联系电话]',
  email: '[待企业确认：企业邮箱]',
  icpNumber: '[待企业确认：ICP备案号]',
  description:
    '我们是一家传统小型无纺布生产企业，网站中的企业、产品和质量信息将在企业核实后公开。',
} as const;

export const navigation = [
  { label: '首页', href: '/' },
  { label: '企业介绍', href: '/about/' },
  { label: '工厂实力', href: '/factory/' },
  { label: '生产设备', href: '/equipment/' },
  { label: '质量检测', href: '/quality/' },
  { label: '产品介绍', href: '/products/' },
  { label: '应用场景', href: '/applications/' },
  { label: 'FAQ / 知识库', href: '/knowledge/' },
] as const;

export function isConfirmedValue(value: string): boolean {
  return value.trim().length > 0 && !value.startsWith(PLACEHOLDER_PREFIX);
}
