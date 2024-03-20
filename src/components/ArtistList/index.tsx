/**
 * 艺人列表，显示关注按钮
 */
import ButtonRound from '../ButtonRound'
import styles from './index.less'

type ArtistListType = {
  artist?: string;
  artistDecs?: string;
  isFocus?: boolean;
  buttonName?: string;
}

const ArtistList:React.FC<ArtistListType> = (props) => {
  const { artist, artistDecs, isFocus=false, buttonName } = props

  const focusClick = () => console.log('关注')

  return  <ul className={styles.artistList}>
    {artist && artistDecs &&  <li>
      <p className={styles.artistList_artist}>{artist}</p>
      <p>{artistDecs}</p>
    </li>}
    {isFocus && <li>
      <ButtonRound
        className={styles.artistList_focus}
        name={buttonName || '关注'}
        clickHandle={focusClick}
      />
    </li>}
  </ul>
}

export default ArtistList