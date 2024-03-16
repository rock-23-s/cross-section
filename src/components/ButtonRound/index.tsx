/**
 * 封装的原因完全是因为相同的Button类型，想复用和抽离，所以把它进行了拆分。
 * name: 按钮名字
 * clickHandle：点击事件
*/

import { Button } from "antd"
import React, { useMemo } from "react"
// 样式
import styles from './index.less'
import classNames from "classnames";

type ButtonRoundType = {
  /** button value */
  name: string,
  /** 按钮的点击事件 */
  clickHandle: () => void;
  /** class */
  className?: string;
}

const ButtonRound:React.FC<ButtonRoundType> = (props) => {
  const { name, clickHandle } = props

  /**
   * 封装的样式
   * @param name value内容
   * @param clickHandle 点击事件
   * @returns JSX.Element
   */
  const menuTab = (name: string, clickHandle: () => void) => useMemo(() => {
    return <Button
      type="primary"
      shape="round"
      size={"small"}
      onClick={clickHandle}
    >
      {name}
    </Button>
  }, [])
  return <>
    <span className={classNames(styles.buttonRound, props.className)}>
      {menuTab(name, clickHandle)}
    </span>
  </>
}

export default ButtonRound
