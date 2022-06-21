import React from 'react'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Display from './Display'
import Editor from './Editor'
import EditorToggle from './EditorToggle'

export default function Container () {
    const init = useStoreState(state => state.init);
    const numSets = useStoreState(state => state.dotSets.length);
    const editorMode = useStoreState( state => state.editorMode);
    console.log('display', init);
    return ( (init) ?
      (<div className="Container">
        <Display
            numSets={numSets}
        />
        <Editor
            numLayers={numSets}
            editorMode={editorMode}
        />
        <EditorToggle
            editorMode={editorMode}
        />
      </div>)
      
      : null
    )
}
