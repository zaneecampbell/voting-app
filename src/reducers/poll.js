const pollDefaultState = {
    id: 'placeholder',
    optionsData: {
        options: [{ option: '', count: 0 }, { option: '', count: 0 }, { option: '', count: 0 }],
        question: 'Loading...'
    }
};

export default (state = pollDefaultState, action) => {
    switch (action.type) {
        case 'ADD':
            return state = action.optionsData;
        case 'SET':
            return state = action.optionsData;
        default:
            return state;
    }
};