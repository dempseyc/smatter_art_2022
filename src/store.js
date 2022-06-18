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
    frame: 0,
    dotSets: [{
        qty: 10,
        size: 3,
        color: 'black',
        behavior: 'global',
    }],
    dotData: [],
    editorState: {},
    editorMode: false,
    updatedAt: Date.now(),

    stepFrame: action ((state, payload) => { state.frame = payload }),
    
    updateDotSets: action ((state, payload) => { state.dotSets = payload }),
    updateDotSet: action ((state, payload) => { state.dotSets[payload.index] = payload.dotSet }),

    initDotData: action ((state, payload) => { 
      state.init = true;
      state.updatedAt = Date.now();
      state.dotData = payload; //not works
      console.log(payload);
      // state.dotData = payload.map(i => i);  //not works
      // state.dotData = JSON.parse(JSON.stringify(payload)); //not works
      // console.log(JSON.parse(JSON.stringify(payload)));
    }),

    reset: action ((state, payload) => {
      state.init = false;
      state.updatedAt = Date.now();
      state.dotData = [];
      console.log(payload);
    }),
    
    updateDotData: action ((state, payload) => { 
        state.updatedAt = Date.now();
        state.dotData = payload; //get anim?
      }),
    updateDot: action ((state, payload) => { state.dotData[payload.index] = payload.dot}),
    
    updateEditorState: action ((state,payload) => {state.editorState[payload.param] = payload.value}),
    updateEditorMode: action ((state,payload) => {state.editorMode = payload}),

    dotsBySet: computed((state) => bySet(state.dotData))

  })


///// USE LIKE:

// import { useStoreState, useStoreActions } from 'easy-peasy';
// const name = useStoreState((state) => state.name);
// const setName = useStoreActions((actions) => actions.setName);