import pathNames from '@/config/pathNames';
import { v4 as uuid } from 'uuid';
interface NavItemSubList {
  id: string;
  img?: string;
  name: string;
  special?: boolean;
  path: string;
}

interface NavItemList {
  id: string;
  name: string;
  path?: string;
  subItems: NavItemSubList[];
}
const navItemList = [
  {
    id: uuid(),
    name: 'general',
    path: pathNames.manager,
    subItems: [],
  },
  {
    id: uuid(),
    name: 'azuki',
    subItems: [
      {
        id: uuid(),
        img: '',
        name: 'list',
        path: pathNames.manager + '/list?category=azuki',
      },
      {
        id: uuid(),
        img: '',
        name: 'new',
        path: pathNames.manager + '/new?category=azuki',
      },
      {
        id: uuid(),
        img: '',
        name: 'remove',
        special: true,
        path: pathNames.manager + '/remove?category=azuki',
      },
    ],
  },
  {
    id: uuid(),
    name: 'beanz',
    subItems: [
      {
        id: uuid(),
        img: '',
        name: 'list',
        path: pathNames.manager + '/list?category=beanz',
      },
      {
        id: uuid(),
        img: '',
        name: 'new',
        path: pathNames.manager + '/new?category=beanz',
      },
      {
        id: uuid(),
        img: '',
        name: 'remove',
        special: true,
        path: pathNames.manager + '/remove?category=beanz',
      },
    ],
  },
  {
    id: uuid(),
    name: 'song',
    subItems: [
      {
        id: uuid(),
        img: '',
        name: 'list',
        path: pathNames.manager + '/list?category=song',
      },
      {
        id: uuid(),
        img: '',
        name: 'new',
        path: pathNames.manager + '/new?category=song',
      },
      {
        id: uuid(),
        img: '',
        name: 'remove',
        special: true,
        path: pathNames.manager + '/remove?category=song',
      },
    ],
  },
  {
    id: uuid(),
    name: 'user',
    subItems: [
      {
        id: uuid(),
        img: '',
        name: 'list',
        path: pathNames.manager + '/list?category=user',
      },
      {
        id: uuid(),
        img: '',
        name: 'new',
        path: pathNames.manager + '/new?category=user',
      },
      {
        id: uuid(),
        img: '',
        name: 'remove',
        special: true,
        path: pathNames.manager + '/remove?category=user',
      },
    ],
  },
  {
    id: uuid(),
    name: 'TRASH',
    subItems: [],
    path: pathNames.manager + '/trash',
  },
];

export default navItemList;
