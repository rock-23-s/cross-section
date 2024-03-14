/**
 * 封装批量引入文件数据过滤
 */
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  const requireAll = requireContext.keys().map(key => {
    const name = key.replace(/\.\/(.*)\.\w+$/, '$1');
    return { name, value: requireContext(key) };
  })
  return requireAll
}

/**
 * 批量引入的数据集合，可直接用此方法
 */
const resetImportList = (req: __WebpackModuleApi.RequireContext) => {
  let routeList: {name: string, value: string}[] = []
  try {
    routeList = importAll(req)
  } catch (error) {
    console.error(error);
    routeList = []
  }
  return routeList
}

export {
  importAll,
  resetImportList
}