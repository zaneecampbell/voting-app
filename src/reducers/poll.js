const pollDefaultState = {
    id: 'placeholder',
    optionsData: {
        options: ['placeholder'],
        question: 'from redux with love'
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