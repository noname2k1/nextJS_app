import { useAuthStore } from '@/store';
import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';

interface Option {
  id: string;
  label: string;
  separatorTop?: boolean;
  danger?: boolean;
  onClick?: () => void;
}
const optionList: Option[] = [
  {
    id: uuid(),
    label: 'user info',
  },
  {
    id: uuid(),
    label: 'change password',
  },
  {
    id: uuid(),
    label: 'logout',
    separatorTop: true,
    danger: true,
    onClick: () => {
      // logout
      useAuthStore.getState().logout();
      Cookies.remove('refresh_token');
    },
  },
];

export default optionList;
