import { createStore, action } from 'easy-peasy'

const bySet = function (dots) {
    let sets = {};
    // wanting to look like { 0: [<array of dots>], 2: [<another array of dots>] }
    dots.forEach( dot => sets[dot.dotSetIndex] = [...sets[dot.dotSetIndex], dot] );
    return sets;
}

export default createStore({
    dotSets: [],
    dotData: [],
    editorState: {},

    updateDotSets: action ((state, payload) => { state.dotSets = payload }),
    updateDotSet: action ((state, payload) => { state.dotSets[payload.index] = payload.dotSet }),

    updateDotData: action ((state, payload) => { state.dotData = payload }),
    updateDot: action ((state, payload) => { state.dotData[payload.index] = payload.dot}),

    dotsBySet: computed((state) => bySet(state.dotData) ),

  })


///// USE LIKE:

// import { useStoreState, useStoreActions } from 'easy-peasy';
// const name = useStoreState((state) => state.name);
// const setName = useStoreActions((actions) => actions.setName);