import IconEye from '../icons/IconEye'
import IconAdjustmentsHorizontal from '../icons/IconAdjustmentsHorizontal'
import './Editor.scss'

import {useStoreState, useStoreActions} from 'easy-peasy'

export default function EditorToggle () {
  const editMode = useStoreState(state => state.editMode);
  const updateEditMode = useStoreActions(actions => actions.updateEditMode);
  const classes = `editor-toggle fab fab-left edit-${editMode}`;

  return (
    <button 
      className={classes}
      onClick={()=>updateEditMode(!editMode)}
    >
        {editMode ? <IconEye /> : <IconAdjustmentsHorizontal /> }
    </button>
  )
}