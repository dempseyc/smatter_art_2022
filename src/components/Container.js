import React from 'react'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Display from './Display'
// import Editor from './Editor'
import EditorToggle from './EditorToggle'

export default function Container () {
    return (
      <div className="Container">
        <Display
            numSets={useStoreState( state => state.dotSets.length)}
        />
        {/* <Editor
            numSets={useStoreState( state => state.dotSets.length)}
            editorMode={useStoreState( state => state.editorMode)}
        /> */}
        <EditorToggle
            editorMode={useStoreState( state => state.editorMode)}
            updateEditorMode={useStoreActions((actions) => actions.updateEditorMode)}
        />
      </div>
    )
}
