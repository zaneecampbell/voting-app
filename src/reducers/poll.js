const pollDefaultState = {
    question: 'hello there stranga'
};

export default (state = pollDefaultState, action) => {
    switch (action.type) {
        case 'ADD':
            return state;
        default:
            return state;
    }
};