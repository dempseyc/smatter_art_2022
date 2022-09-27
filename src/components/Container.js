import React from 'react'

import { useStoreState, useStoreActions } from 'easy-peasy';

import Display from './Display'
import Editor from './Editor'
import EditorToggle from './EditorToggle'
import ResetButton from './ResetButton'

export default function Container ({init, setInit}) {
    const qtyChanging = useStoreState(state => state.qtyChanging.status);
    const numSets = useStoreState(state => state.dotSets.length);

    console.log('display', init);
    return ( (init && !qtyChanging) ?
      (<div className="Container">
        <Display
            numSets={numSets}
        />
        <Editor
            numLayers={numSets}
        />
        <EditorToggle />
        <ResetButton action={() => setInit(false)}/>
      </div>)
      
      : null
    )
}
