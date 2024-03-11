import { useState } from 'react'
import classnames from 'classnames';
import styles from './index.less';
// 引入图标
import { HomeIcon, HomeActiveIcon, SearchIcon, LibraryIcon, SearchActiveIcon, PlusIcon } from '../../icons/sider_left'
// 引入UI
import { Menu, Dropdown } from 'antd';
// 引入type
import type { MenuPropsAnd } from '@/interface/SiderList'
// 引入拆分模块公共依赖数据
import { getItem } from '@/models/siderList'
import type { MenuProps } from 'antd';


type SiderListType = {
  collapsed: boolean;
  setCollapsed: (flag: boolean) => void;
}

const SiderList: React.FC<SiderListType> = (props) => {
  const { collapsed, setCollapsed } = props
  const [selectMenu, setSelectMenu] = useState('')

  const menuList: MenuPropsAnd['items'] = [
    getItem(
      '主页',
      'home',
      selectMenu === 'home'
        ?
        <HomeActiveIcon width="25"/>
        :
        <HomeIcon width="25" />
    ),
    getItem(
      '搜索',
      'search',
      selectMenu === 'search'
        ?
        <SearchActiveIcon width="23" />
        :
        <SearchIcon width="23" />
    ),
  ];
  
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  /**
   * menu click 事件
   */
  const menuClick = (item: {key: string}) => {
    setSelectMenu(item.key)
  }

  return <>
    <div className={styles.siderList}>
      {/* 导航部分 */}
      <div className={styles.siderList_nav}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          items={menuList}
          selectedKeys={[selectMenu]}
          onClick={menuClick}
        />
      </div>
      {/* 音乐库 */}
      <div className={styles.siderList_library}>
        <div>
          {/* 音乐库按钮 */}
          <div
            className={
              classnames({
                [styles.siderList_library_button]: true,
                [styles.siderList_library_align]: collapsed
              })
            }
            onClick={() => setCollapsed(!collapsed)}
          >
            <LibraryIcon width="23" className={styles.siderList_library_button_icon} />
            {!collapsed && <span className={styles.siderList_library_button_text}>音乐库</span>}
          </div>
          <span>
            <Dropdown menu={{ items }} trigger={['click']}>
              <PlusIcon width="23" />
            </Dropdown>
          </span>
        </div>
      </div>
    </div>
  </>
}

export default SiderList