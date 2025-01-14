import React from 'react';
import { Popover, Radio } from 'antd';
import { isMenuDivider } from '@/shared';
import type { MenuItem as IMenuItem } from '@/shared';

interface MenuItemProps {
  menuInfo: Exclude<IMenuItem, 'MenuDividerType'>;
  handleDelete: (item: IMenuItem) => void;
}

/**
 * 菜单项组件，支持鼠标悬停时显示删除等功能。
 *
 * @param menuInfo 菜单项信息对象
 * @returns 返回渲染的菜单项组件
 */
const MenuItem: React.FC<MenuItemProps> = ({ menuInfo, handleDelete }) => {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  /* @ts-ignore */
  const label = menuInfo?.label ?? '';

  const PopContent = (
    <Radio.Group>
      <Radio.Button value="delete" onClick={() => handleDelete(menuInfo)}>
        删除
      </Radio.Button>
    </Radio.Group>
  );

  return isMenuDivider(menuInfo) ? null : (
    <Popover placement="topLeft" content={PopContent} trigger="hover">
      {label}
    </Popover>
  );
};

export default MenuItem;
