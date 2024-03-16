import { useMemo, useState } from 'react'
import classnames from 'classnames';
// 样式
import styles from './index.less';
// 图标
import { IconFont } from '@/icons/index'
// UI
import { Menu, Dropdown } from 'antd';
// type
import type { MenuPropsAnd } from '@/interface/SiderList'
// 拆分模块公共依赖数据
import { getItem } from '@/models/siderList'
// 歌单列表组件
import PlayList from './playlist'


type SiderListType = {
  /** 收缩框状态 */
  collapsed: boolean;
  /** 设置收缩框 */
  setCollapsed: (flag: boolean) => void;
}

const SiderList: React.FC<SiderListType> = (props) => {
  const { collapsed, setCollapsed } = props
  /** 选中menu：用来控制图标的展示 */
  const [selectMenu, setSelectMenu] = useState('')

  /** 收缩框的menu菜单 */
  const menuList: MenuPropsAnd['items'] = [
    getItem(
      '主页',
      'home',
      selectMenu === 'home'
        ?
        <IconFont name='home_active' width="25" />
        :
        <IconFont name='home' width="25" />
    ),
    getItem(
      '搜索',
      'search',
      selectMenu === 'search'
        ?
        <IconFont name='search_active' width="23" />
        :
        <IconFont name='search' width="23" />
    ),
  ];

  /** 点击+显示下拉框的菜单列表 */
  const dropList: MenuPropsAnd['items'] = [
    {
      key: '1',
      label: (
        <span>
          <IconFont
            name='musicClass'
            width={25}
            className={styles.siderList_library_gather_dropDown_icon}
          />
          创建新歌单
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <IconFont
            name='file'
            width={25}
            className={styles.siderList_library_gather_dropDown_icon}
          />
          创建歌单文件夹
        </span>
      ),
    }
  ];

  /**
   * menu click 事件
   */
  const menuClick = (item: {key: string}) => {
    setSelectMenu(item.key)
  }

  /** 渲染是否收缩的dom 封装 */
  const renderCollapsed = (key: string) => useMemo(() => {
    const collapsedObj: { [key: string]: any } = {
      libraryDom: <span className={styles.siderList_library_topMenu_button_text}>音乐库</span>,
      dropdownDom: <>
        <Dropdown
          overlayClassName={styles.siderList_library_topMenu_gather_dropDown}
          menu={{ items: dropList }}
          trigger={['click']}
        >
          <IconFont name='plus' width="22" />
        </Dropdown>
        <IconFont className={styles.siderList_library_topMenu_gather_arrow} name='arrow' width="22" />
      </>
    }
    return !collapsed && collapsedObj[key]
  }, [collapsed])

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
        {/* 顶部菜单 */}
        <div className={styles.siderList_library_topMenu}>
          {/* 音乐库按钮 */}
          <div
            className={
              classnames({
                [styles.siderList_library_topMenu_button]: true,
                [styles.siderList_library_topMenu_align]: collapsed
              })
            }
            onClick={() => setCollapsed(!collapsed)}
          >
            <IconFont
              name='library'
              width="23"
              className={styles.siderList_library_topMenu_button_icon}
            />
            {renderCollapsed('libraryDom')}
          </div>
          <div className={styles.siderList_library_topMenu_gather}>
            {renderCollapsed('dropdownDom')}
          </div>
        </div>

        {/* 列表按钮 */}
        <PlayList collapsed={collapsed} />
      </div>
    </div>
  </>
}

export default SiderList