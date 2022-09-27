import IconReplay from '../icons/IconReplay';
import './Editor.scss'

import {useStoreActions} from 'easy-peasy'

export default function ResetButton ({action}) {
  const reset = useStoreActions(actions => actions.reset);
  const classes = `editor-toggle fab fab-right`;
    const clickHandler = () => {
        reset();
        action();
    }

  return (
    <button 
      className={classes}
      onClick={clickHandler}
    >
        <IconReplay />
    </button>
  )
}