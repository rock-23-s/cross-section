import { Avatar } from "antd"
import defaultAvatar from '@/assets/defaultAvatar.png'

type ArtistAvatarType = {
  url?: string;
  size?: number;
  className?: string
}

const ArtistAvatar: React.FC<ArtistAvatarType> = (props) => {
  const { url, size, className } = props;

  return <>
    <Avatar className={className || ''} shape="square" size={size || 45} src={url || defaultAvatar}/>
  </>
}

export default ArtistAvatar
