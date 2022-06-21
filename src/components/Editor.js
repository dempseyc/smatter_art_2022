// import { useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import LayerButton from './LayerButton'
import LayerPanel from './LayerPanel'
import './Editor.css'

const Editor = (props) => {
    const {numLayers, editorMode } = props;
    const activeLayer = useStoreState(state => state.editorState.activeLayer);
    const setActiveLayer = useStoreActions(actions => actions.setActiveLayer);
    const editMode = editorMode ? 'show' : 'hide';

    const layerNums = [...Array(numLayers).keys()];

    const makeButtons = () => {

        return layerNums.map((num) => {
            return (
                <LayerButton 
                    key={num} 
                    layerNum= {num} 
                    handleClick= { () => {
                        setActiveLayer(num);
                     } }
                    activeLayer= {activeLayer}
                >
                </LayerButton>
            )
        })
    }

    const makeLayerPanels = () => {
        return layerNums.map((num) => {
            return(
               <LayerPanel 
                    key= {num} 
                    layerNum= {num} 
                    activeLayer= {activeLayer}
                >
                </LayerPanel> 
            )
        })
    }

    return (
    <div className={`Editor ${editMode}`}>
        <div className="LayerButtons">
            { makeButtons() }      
        </div>
        <div className="layerPanels">
            { makeLayerPanels() }
        </div>
    </div>
    )
}

export default Editor
