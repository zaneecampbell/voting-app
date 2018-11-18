import database from '../firebase/firebase'

// Adds options from CreatePage to firebase and redux
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
        const Data = { question, ...options, id }

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

// Pulls option information for Votepage and ResultsPage from firebase
export const setOptions = (optionsData) => ({
    type: 'SET',
    optionsData
});

export const startSetOptions = (id) => {
    return (dispatch) => {
        return database.ref(`polls/${id}`)
            .once('value')
            .then((snapshot) => {
                const optionsData = snapshot.val();
                dispatch(setOptions({ optionsData }));
            }).catch((e) => {
                console.log('Error fetching data', e);
            });
    };
};

// Updates firebase vote count for option that was selected (no reason to set redux since I'll be pulling from firebase on the next page regardless can reuse startSetOption for ResultsPage)
export const startUpdateOptions = (selected, id) => {
    const index = selected.slice(-1);
    return (dispatch) => {
        return database.ref(`polls/${id}/options/${index}/count`).transaction((count) => {
            return count + 1;
        }).catch((e) => {
            console.log('Error adding count', e);
        });
    }
};

// On ResultsPage updates vote count in real time with listener from firebase
export const startRealTimeOptions = (id) => {
    return (dispatch) => {
        return database.ref(`polls/${id}`).on('value', (snapshot) => {
            const optionsData = snapshot.val();
            dispatch(setOptions({optionsData}));
        });
    }
}

//     const newPoll = database.ref(`polls`).push({
//         question: this.state.question,
//         options: optionsArray
//     });

//     const pollId = newPoll.key
// }