import styles from './index.less'
import { useState } from 'react'
import { Divider, Layout } from 'antd';
import classnames from 'classnames'
import { LibraryIcon } from '../icons/sider_left'

// 引入左侧sider
import SiderList from '../pages/siderList'
// 引入Content
import ContentCenter from '../pages/content'
// 引入右侧sider
import MusicMessage from '../pages/musicMessage'

const { Header, Footer, Sider, Content } = Layout;

const LayoutComponent: React.FC = () => {

  // 是否折叠
  const [isCollapsed, setIsCollapsed] = useState(false)
  /**
   * 折叠显示的图标事件
   */
  const siderCollapse = (colleapse: boolean, type: string) => {
    console.log(colleapse, type)
    setIsCollapsed(!isCollapsed)
  }


  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout className={styles.layout_content} >
        <Sider
          className={styles.layout_left_sider}
          onCollapse={siderCollapse}
          collapsible
          collapsed={isCollapsed}
          breakpoint="md"
          trigger={
            null
          }
        >
          <SiderList collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
        </Sider>
        <Content>
          <ContentCenter />
        </Content>
        <Sider className={styles.layout_right_sider}>
          <MusicMessage />
        </Sider>
      </Layout>
      <Footer className={styles.layout_footer}>footer</Footer>
    </Layout>
  )
}

export default LayoutComponent