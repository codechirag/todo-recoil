export const addItem = (data) => { 
    console.log('action');
    return {
        type: 'ADD_ITEM',
        data: data
    }
}

