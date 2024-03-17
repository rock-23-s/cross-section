import styles from './index.less'
import { useState } from 'react'
import { Layout } from 'antd';
import classNames from 'classnames';
// 引入左侧sider
import SiderList from '../pages/siderList'
// 引入Content
import ContentCenter from '../pages/content'
// 引入右侧sider
import MusicMessage from '../pages/musicMessage'
// 引入footer
import LayoutFooter from "../pages/footer";

const { Header, Footer, Sider, Content } = Layout;

const LayoutComponent: React.FC = () => {

  // 是否折叠
  const [isCollapsed, setIsCollapsed] = useState(false)

  /**
   * 折叠显示的图标事件
   */
  const siderCollapse = (colleapse: boolean, type: string) => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout className={styles.layout_content} >
        <Sider
          className={classNames({
            [styles.layout_content_leftSider]: !isCollapsed,
            [styles.layout_content_collapsed]: isCollapsed
          })}
          onCollapse={siderCollapse}
          collapsible
          collapsed={isCollapsed}
          breakpoint="lg"
          trigger={
            null
          }
        >
          <SiderList collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
        </Sider>
        <Content>
          <ContentCenter />
        </Content>
        <Sider className={styles.layout_content_rightSider}>
          <MusicMessage />
        </Sider>
      </Layout>
      <Footer className={styles.layout_footer}>
        <LayoutFooter />
      </Footer>
    </Layout>
  )
}

export default LayoutComponent