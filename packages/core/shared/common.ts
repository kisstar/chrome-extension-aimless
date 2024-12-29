import type { MenuProps } from 'antd';
import type { MenuDividerType } from 'antd/es/menu/interface';

export type MenuItem = Required<MenuProps>['items'][number];

export const uuid = () => crypto.randomUUID();

export const isMenuDivider = (item: MenuItem): item is MenuDividerType => {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  return !item?.label;
};
