import database from '../firebase/firebase'

export const addOptions = (optionsData, id) => ({
    type: 'ADD',
    optionsData,
    id
});

export const startAddOptions = (optionsData) => {
    return (dispatch) => {
        const {
            question = '',
            options = [],
            id = ''
        } = optionsData;
        const Data = { question, ...options, id}

        return database.ref(`polls`).push({
            question: optionsData.question,
            options: optionsData.options
        }).then((ref) => {
            dispatch(addOptions({
                id: ref.key,
                optionsData
            }));
        });
    }
}

//     const newPoll = database.ref(`polls`).push({
//         question: this.state.question,
//         options: optionsArray
//     });

//     const pollId = newPoll.key
// }