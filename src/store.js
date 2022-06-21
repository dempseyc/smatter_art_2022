import { createStore, action, computed } from 'easy-peasy'
// import { notDeepEqual } from 'assert'
// import { Reference } from 'eslint-scope'
// import { update } from 'immutable'

// question is, will 'compute' update the dot data per dot update, if notDeepEqual, bear Reference
// instead of copy of dot.
const bySet = function (dots) {
    let sets = {0:[]};
    // wanting to look like { 0: [<array of dots>], 2: [<another array of dots>] }
    dots.forEach( dot => sets[`${dot.dotSetIndex}`] = [...sets[`${dot.dotSetIndex}`], dot] );
    return sets;
}

export default createStore({
    init: false,
    animOn: false,
    startAnim: action ((state) => { state.animOn = true }),
    stopAnim: action ((state) => { state.animOn = false }),
    dotSets: [{
        qty: 10,
        size: 3,
        color: 'black',
        behavior: 'global',
    }],
    dotData: [],
    editorState: {activeLayer: 0},
    editorMode: false,
    updatedAt: Date.now(),
    
    updateDotSets: action ((state, payload) => { state.dotSets = payload }),
    updateDotSet: action ((state, payload) => { state.dotSets[payload.index] = payload.dotSet }),
    updateQty: action ((state,payload) => { state.dotSets[payload.index].qty = payload.val }),
    nextIdx: 0,
    updateNextIdx: action ((state,payload) => { state.nextIdx = payload }),

    initDotData: action ((state, payload) => {
      state.init = true;
      state.updatedAt = Date.now();
      state.dotData = payload;
      console.log(payload);
    }),

    reset: action ((state, payload) => {
      state.init = false;
      state.animOn = false;
      state.updatedAt = Date.now();
      state.dotData = [];
      console.log('reset');
    }),
    
    updateDotData: action ((state, payload) => { 
        state.updatedAt = Date.now();
        state.dotData = payload; //get anim?
      }),
    updateDot: action ((state, payload) => { state.dotData[payload.index] = payload.dot}),
    
    updateActiveLayer: action ((state,payload) => {state.editorState.activeLayer = payload}),
    updateEditorState: action ((state,payload) => {state.editorState[payload.param] = payload.value}),
    updateEditorMode: action ((state,payload) => {state.editorMode = payload}),

    dotsBySet: computed((state) => bySet(state.dotData)),

  })


///// USE LIKE:

// import { useStoreState, useStoreActions } from 'easy-peasy';
// const name = useStoreState((state) => state.name);
// const setName = useStoreActions((actions) => actions.setName);