import {
  BeanzWhiteLogo,
  DisCordLogoIcon,
  InstagramLogoIcon,
  LanguagesIcon,
  SmallDownArrowIcon,
  TwisterLogoIcon,
} from '@/components/Icons';
import { USAFlag, VietNamFlag } from '@/components/Icons/nationFlags';
import { HeaderItem } from '@/config/interfaces';
import pathNames from '@/config/pathNames';
import { v4 as uuid } from 'uuid';

const headerRightSideList: HeaderItem[] = [
  {
    id: uuid(),
    label: <BeanzWhiteLogo />,
    path: pathNames.beanz,
  },
  {
    id: uuid(),
    label: 'world',
    path: pathNames.world,
  },
  {
    id: uuid(),
    label: 'gallery',
    path: pathNames.gallery,
  },
  {
    id: uuid(),
    label: 'more',
    rightIcon: <SmallDownArrowIcon />,
    childrens: [
      {
        id: uuid(),
        label: 'the garden',
        path: pathNames.garden,
      },
      {
        id: uuid(),
        label: 'manifesto',
        path: pathNames.manifesto,
      },
      {
        id: uuid(),
        label: 'careers',
        path: pathNames.careers,
      },
      {
        id: uuid(),
        label: 'updates',
        path: pathNames.updates,
      },
      {
        id: uuid(),
        label: 'license',
        path: pathNames.license,
      },
      {
        id: uuid(),
        label: 'terms & conditions',
        path: pathNames.termsandconditions,
      },
    ],
  },
  {
    id: uuid(),
    label: 'buy',
    rightIcon: <SmallDownArrowIcon />,
    childrens: [
      {
        id: uuid(),
        label: 'azuki (os)',
        path: pathNames.garden,
        rightIcon: '↗',
      },
      {
        id: uuid(),
        label: 'azuki (lr)',
        path: pathNames.garden,
        rightIcon: '↗',
      },
      {
        id: uuid(),
        label: 'beanz (os)',
        path: pathNames.garden,
        rightIcon: '↗',
      },
      {
        id: uuid(),
        label: 'beanz (lr)',
        path: pathNames.garden,
        rightIcon: '↗',
      },
    ],
  },
  {
    id: uuid(),
    label: <TwisterLogoIcon />,
    rightIcon: <SmallDownArrowIcon />,
  },
  {
    id: uuid(),
    label: <InstagramLogoIcon />,
    rightIcon: <SmallDownArrowIcon />,
  },
  {
    id: uuid(),
    label: <DisCordLogoIcon />,
  },
  {
    id: uuid(),
    label: <LanguagesIcon />,
    rightIcon: <SmallDownArrowIcon />,
    childrens: [
      {
        id: uuid(),
        label: 'english (en)',
        rightIcon: <USAFlag />,
      },
      {
        id: uuid(),
        label: 'vietnamese (vi)',
        rightIcon: <VietNamFlag />,
      },
    ],
  },
  {
    id: uuid(),
    label: 'connect',
    onClick: pathNames.connectParams,
  },
];

export default headerRightSideList;
