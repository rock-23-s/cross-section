import Icon from '@ant-design/icons';

import home from '@/assets/slider_left/home.svg';
import homeActive from '../assets/slider_left/home_active.svg'
import search from '../assets/slider_left/search.svg'
import searchActive from '../assets/slider_left/search_active.svg'
import library from '@/assets/slider_left/library.svg'
import plus from '@/assets/slider_left/plus.svg'


/**
 * 
 * 导出图标
 * 
 */

export const HomeIcon = (props: any) => (
  <Icon component={() => <img src={home} alt="" width={props.width || 16} />} {...props} />
);
export const HomeActiveIcon = (props: any) => (
  <Icon component={() => <img src={homeActive} alt="" width={props.width || 16} />} {...props} />
);
export const SearchIcon = (props: any) => (
  <Icon component={() => <img src={search} width={props.width || 16} alt="" />} {...props} />
);
export const SearchActiveIcon = (props: any) => (
  <Icon component={() => <img src={searchActive} width={props.width || 16} alt="" />} {...props} />
);
export const LibraryIcon = (props: any) => (
  <Icon component={() => <img src={library} width={props.width || 16} alt="" />} {...props} />
);
export const PlusIcon = (props: any) => (
  <Icon component={() => <img src={plus} width={props.width || 16} alt="" />} {...props} />
);


