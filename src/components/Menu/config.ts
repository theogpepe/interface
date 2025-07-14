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
        label: 'Charts',
        href: '/charts',
      },
      {
        label: 'Pairs DEXSCREENER',
        href: 'https://dexscreener.com/ethereum/f:0x52fbA58f936833F8b643e881Ad308b2e37713a86',
      },
      {
        label: 'Chad Index',
        href: '/chad',
      },
      {
        label: 'Create (Coming Soon)',
        href: '/create',
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
        href: 'https://docs.pepex.io',
      },
    ],
  },
]

export default config
