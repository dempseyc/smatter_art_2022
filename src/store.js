import { createStore, action, computed } from 'easy-peasy'

const maxDotSets = 5;

const newDotSet = () => {
  return {
      qty: 4,
      size: 21,
      color: 0,
      childColor: 11,
      childShrink: 0.5,
      behavior: 'global',
  };
}

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
        color: 0,
        childColor: 11,
        childShrink: 0.5,
        behavior: 'global',
    },
    {
        qty: 8,
        size: 34,
        color: 9,
        childColor: 0,
        childShrink: 0.25,
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
    
    addDotSet: action ((state, payload) => { 
      if (payload < maxDotSets) {
        state.dotSets = [...state.dotSets, newDotSet()];
        state.qtyChanging = {status: true, setId: payload};
      }
    }),
    removeDotSet: action ((state,payload) => {
      if (state.dotSets[payload]) {
        state.dotSets = state.dotSets.filter((s,i)=> i !== payload );
        state.qtyChanging = {status: true, setId: payload};
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