import Icon from '@ant-design/icons';
import { resetImportList } from '@/utils/importAll';
import { union } from 'lodash'

/**
 * 批量引入完后对所有icon的数据处理
 */
// 引入路径
const slider_left = require.context('../assets/slider_left', true, /\.svg$/)
const content = require.context('../assets/iconSvg', true, /\.svg$/)
const test = require.context('../assets/iconAll', true, /\.svg$/)
// 枚举，便于引入多个路径的处理
const list: any = {
  slider_left,
  // content,
  test
};

const IconList = Object.keys(list).map(item => {
  return resetImportList(list[item])
})
/**
 * 
 * 导出图标
 * 
 */
const IconFont = (props: {name: string, width?: string | number, className?: string}) => {
  const ListItem = union(...IconList).find(item => item.name === props.name)
  return (
    <Icon
      component={() => (
        <img
          src={ListItem?.value}
          alt=""
          width={props.width || 16}
        />
      )}
      {...props}
    />
  );
};

export {
  IconFont
}