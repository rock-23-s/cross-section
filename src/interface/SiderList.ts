import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];
export type MenuPropsAnd = Required<MenuProps>