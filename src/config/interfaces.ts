interface Azuki {
  [key: string]: any;
  attributes: {
    [key: string]: any;
    Background: string;
  };
  createdAt: string;
  deleted: boolean;
  image: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

// gallery
interface Primary {
  id: string;
  title: string;
}
interface ChildsSelected {
  parent: Primary;
  childrens: Primary[];
}

interface Error {
  [key: string]: any;
  status?: number;
  message?: string;
  error?: string;
  success?: boolean;
}

// Header
interface HeaderItem {
  id: number | string;
  label?: JSX.Element | string;
  path?: string;
  rightIcon?: JSX.Element | string;
  childrens?: HeaderItem[];
  onClick?: string | Function;
}

// Connect
interface Connect {
  [key: string]: any;
  id: string | number;
  label: string;
  target: string | JSX.Element;
}

export type { Azuki, ChildsSelected, Primary, Error, HeaderItem, Connect };
