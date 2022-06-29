// import { useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import LayerButton from './LayerButton'
import LayerPanel from './LayerPanel'
import './Editor.scss'

const Editor = (props) => {
    const {numLayers, editorMode } = props;
    const activeLayer = useStoreState(state => state.editorState.activeLayer);
    const updateActiveLayer = useStoreActions(actions => actions.updateActiveLayer);
    const editMode = useStoreState( state => state.editMode);

    const layerNums = [...Array(numLayers).keys()];

    const newSet = useStoreActions(actions => actions.addDotSet);
    const deleteSet = useStoreActions(actions => actions.removeDotSet);

    const addLayerButton = () => {
        return (
            <LayerButton
                key="add-Layer"
                layerNum={numLayers}
                handleClick={ () => {
                    newSet(numLayers);
                }}
                activeLayer={activeLayer}
                numLayers={numLayers}
            />
        )
    }

    const trashLayerButton = () => {
        return (
            <LayerButton
                key="trash-Layer"
                layerNum={-1}
                handleClick={ () => {
                    deleteSet(activeLayer);
                }}
                activeLayer={activeLayer}
                numLayers={numLayers}
            />
        )
    }

    const makeButtons = () => {
        return layerNums.map((num) => {
            return (
                <LayerButton 
                    key={num} 
                    layerNum={num} 
                    handleClick={ () => {
                        updateActiveLayer(num);
                     } }
                    activeLayer= {activeLayer}
                />
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
                /> 
            )
        })
    }

    return (
    <div className={`Editor edit-${editMode} wrapper-2`}>
        <div className="LayerButtons">
            { makeButtons() } 
            { addLayerButton() }
            { trashLayerButton() }     
        </div>
        <div className="LayerPanels">
            { makeLayerPanels() }
        </div>
    </div>
    )
}

export default Editor
