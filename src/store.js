import { createStore, action, computed } from 'easy-peasy'
import { sizes, colors, styles, $pallette_4 } from './dotStyles'
import utils from './utils'

const maxDotSets = 5;
let setId = 0;

const newDotSet = () => {
  let ranNum = utils.ranMM(1,3);
  let sizeNum = utils.ranMM(0, sizes.length);
  let exp = sizes.length-1-sizeNum;
  let qty = Math.floor(Math.pow(1.5,exp))*2*ranNum;
  // let qty = 8;
  let myId = setId;
  setId += 1;
  return {
      id: myId,
      qty: qty,
      size: sizes[sizeNum],
      color: utils.ranMM(0, $pallette_4.length),
      color2:  utils.ranMM(0, $pallette_4.length),
      style: utils.ranMM(0, styles.length),
      behavior: 'global',
  };
}

const bySet = function (dots) {
    let sets = {};
    dots.forEach( (dot, index) => {
      if (!sets.hasOwnProperty(dot.setId)) { sets[dot.setId] = []; }
      sets[`${dot.setId}`] = [...sets[`${dot.setId}`], {index: index, id: dot.id}];
    });
    return sets;
}

export default createStore({
    init: false,
    animOn: false,
    startAnim: action ((state) => { state.animOn = true }),
    stopAnim: action ((state) => { state.animOn = false }),
    dotSets: [newDotSet(),newDotSet(),newDotSet()].sort((s,s2)=>s2.size - s.size),
    dotData: [],
    qtyChanging: {status:false, setId:0},
    updateQtyChanging: action ((state, payload) => { 
      state.qtyChanging = {status: payload.status, setId: payload.setId};
      }),
    editorState: {activeLayer: 0},
    editMode: false,
    updatedAt: Date.now(),
    
    addDotSet: action ((state, payload) => { 
      if (payload < maxDotSets) {
        let newSet = newDotSet()
        state.dotSets = [...state.dotSets, newSet];
        state.qtyChanging = {status: true, setId: newSet.id};
      }
    }),
    removeDotSet: action ((state,payload) => {
      if (state.dotSets[payload]) {
        state.dotSets = state.dotSets.filter((s,i)=> i !== payload );
      }
    }),
    updateDotSet: action ((state, payload) => { state.dotSets[payload.index][payload.param] = payload.value }),
    updateQty: action ((state,payload) => { state.dotSets[payload.index].qty = payload.val }),
    nextIdx: 0,
    updateNextIdx: action ((state,payload) => { state.nextIdx = payload }),
    updateInit: action ((state,payload) => { state.init = true }),

    initDotData: action ((state, payload) => {
      state.updatedAt = Date.now();
      state.dotData = payload;
    }),

    reset: action ((state, payload) => {
      state.init = false;
      state.animOn = false;
      state.updatedAt = Date.now();
      state.dotData = [];
      state.dotSets = [newDotSet(),newDotSet(),newDotSet()].sort((s,s2)=>s2.size - s.size);
      console.log('reset');
    }),
    
    updateDotData: action ((state, payload) => { 
        state.updatedAt = Date.now();
        state.dotData = payload; //get anim?
      }),
    updateDot: action ((state, payload) => { state.dotData[payload.index] = payload.dot}),
    
    updateActiveLayer: action ((state,payload) => {state.editorState.activeLayer = payload}),
    // updateEditorState: action ((state,payload) => {state.editorState[payload.param] = payload.value}),
    updateEditMode: action ((state,payload) => {state.editMode = payload}),

    dotsBySet: computed((state) => bySet(state.dotData)),

  })


///// USE LIKE:

// import { useStoreState, useStoreActions } from 'easy-peasy';
// const name = useStoreState((state) => state.name);
// const setName = useStoreActions((actions) => actions.setName);