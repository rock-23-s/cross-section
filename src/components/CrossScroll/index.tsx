import styles from './index.less'

type CrossScrollType = {
  children: JSX.Element;
}

const CrossScroll: React.FC<CrossScrollType> = ({children}) => {
  return <>
    <div className={styles.crossScroll}>
      {children.props.name === 'musicList' && children.props.children}
      {/* {children} */}
    </div>
  </>
}

export default CrossScroll
