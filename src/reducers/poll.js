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
        console.log(action.optionsData)
            return state = action.optionsData;
        default:
            return state;
    }
};