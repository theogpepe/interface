import { MenuEntry } from '@theogpepe/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: '/',
      },
      {
        label: 'Tokens',
        href: '/',
      },
      {
        label: 'Pairs',
        href: '/',
      },
      {
        label: 'Accounts',
        href: '/',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/theogpepe',
      },
      {
        label: 'Docs',
        href: 'https://github.com/theogpepe',
      },
    ],
  },
]

export default config
