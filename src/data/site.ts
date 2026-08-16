import { withBase } from '../utils/path';

export const PLACEHOLDER_PREFIX = '[待企业确认：';

export const siteConfig = {
  siteUrl: 'https://kris-quyu.github.io/',
  companyName: '广州市天瑞无纺布有限公司',
  shortName: '天瑞无纺布',
  tagline: '广州无纺布、针刺布与土工布生产供应',
  foundedAt: '2004-06-01',
  creditCode: '914401017619348288',
  companyType: '有限责任公司（自然人投资或控股）',
  registeredAddress: '广州市白云区良田镇光明村冯坎路29号之一',
  factoryAddress: '广州市白云区良田镇光明村冯坎路29号之一',
  phone: '13822292512',
  wechatQrImage: withBase('/images/wechat-contact.jpg'),
  icpNumber: '[待企业确认：ICP备案号]',
  description:
    '广州市天瑞无纺布有限公司成立于2004年，主要提供无纺布、针刺布与土工布产品，具体规格与供货要求以沟通确认为准。',
} as const;

export const navigation = [
  { label: '首页', href: withBase('/') },
  { label: '关于我们', href: withBase('/#about') },
  { label: '产品中心', href: withBase('/#products') },
  { label: '工厂实力', href: withBase('/#factory') },
  { label: '生产设备', href: withBase('/#equipment') },
  { label: '应用领域', href: withBase('/#applications') },
  { label: '知识中心', href: withBase('/#knowledge') },
] as const;

export function isConfirmedValue(value: string): boolean {
  return value.trim().length > 0 && !value.startsWith(PLACEHOLDER_PREFIX);
}
