import Icon from '@ant-design/icons';


// 批量引入
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  const requireAll = requireContext.keys().map(key => {
    const name = key.replace(/\.\/(.*)\.\w+$/, '$1');
    console.log(name, requireContext(key))
    return { name, value: requireContext(key) };
  })
  return requireAll
}

let routeList: {name: string, value: string}[] = []
try {
  routeList = importAll(require.context('../assets/slider_left', true, /\.svg$/))
} catch (error) {
  console.log(error);
  routeList = []
}
/**
 * 
 * 导出图标
 * 
 */
const IconFont = (props: {name: string, width?: string | number, className?: string}) => {
  const ListItem = routeList.find(item => item.name === props.name)
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