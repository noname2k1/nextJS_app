import { Connect } from '@/config/interfaces';
import { v4 as uuid } from 'uuid';
const connectList: Connect[] = [
  {
    id: uuid(),
    label: 'metamask',
    target: '',
  },
  {
    id: uuid(),
    label: 'walletconnect (beta)',
    target: '',
  },
  {
    id: uuid(),
    label: 'walletlink (beta)',
    target: '',
  },
];

export default connectList;
