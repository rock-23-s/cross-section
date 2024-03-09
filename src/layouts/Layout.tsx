import styles from './index.less'
import { Layout } from 'antd';


const { Header, Footer, Sider, Content } = Layout;



const LayoutComponent: React.FC = () => {
  return <>
    <Layout className={styles.layout}>
      <Sider className={styles.layout_sider}>
        Sider
      </Sider>
      <Footer className={styles.layout_footer}>
        Footer
      </Footer>
    </Layout>
  </>
}

export default LayoutComponent