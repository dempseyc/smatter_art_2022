import { createStore, action, computed } from 'easy-peasy'
// import { notDeepEqual } from 'assert'
// import { Reference } from 'eslint-scope'
// import { update } from 'immutable'

// question is, will 'compute' update the dot data per dot update, if notDeepEqual, bear Reference
// instead of copy of dot.
const bySet = function (dots) {
    let sets = {0:[],1:[],2:[],3:[],4:[]};
    // wanting to look like { 0: [<array of dots>], 2: [<another array of dots>] }
    dots.forEach( (dot, index) => {
      // dot.index = index;
      sets[`${dot.dotSetIndex}`] = [...sets[`${dot.dotSetIndex}`], {index: index, id: dot.id}];
    });
    console.log('bySet',sets);
    return sets;

}

export default createStore({
    init: false,
    animOn: false,
    startAnim: action ((state) => { state.animOn = true }),
    stopAnim: action ((state) => { state.animOn = false }),
    dotSets: [{
        qty: 4,
        size: 21,
        color: 'black',
        behavior: 'global',
    },
    {
        qty: 8,
        size: 34,
        color: 'red',
        behavior: 'global',
    },
    ],
    dotData: [],
    qtyChanging: {status:false, setId:0},
    updateQtyChanging: action ((state, payload) => { 
      state.qtyChanging = {status: payload.status, setId: payload.setId};
      }),
    editorState: {activeLayer: 0},
    editMode: false,
    updatedAt: Date.now(),
    
    updateDotSets: action ((state, payload) => { state.dotSets = payload }),
    updateDotSet: action ((state, payload) => { state.dotSets[payload.index][payload.param] = payload.value }),
    updateQty: action ((state,payload) => { state.dotSets[payload.index].qty = payload.val }),
    nextIdx: 0,
    updateNextIdx: action ((state,payload) => { state.nextIdx = payload }),
    updateInit: action ((state,payload) => { state.init = true }),

    initDotData: action ((state, payload) => {
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
    // updateEditorState: action ((state,payload) => {state.editorState[payload.param] = payload.value}),
    updateEditMode: action ((state,payload) => {state.editMode = payload}),

    dotsBySet: computed((state) => bySet(state.dotData)),

  })


///// USE LIKE:

// import { useStoreState, useStoreActions } from 'easy-peasy';
// const name = useStoreState((state) => state.name);
// const setName = useStoreActions((actions) => actions.setName);