const initialState = [
    {username: 'georemoreno', msg: 'Não pode deixar casca de fruta em cima da mesa. Não pode deixar casca de fruta em cima da mesa' },
    {username: 'michelleromao', msg: 'Ao sujar o prato, lave!!!' },
]

export default function rulesReducer(state = [], action){
    switch(action.type){
        case 'ADD_RULE':
            initialState.push(action.payload)
            return initialState
        default:
            return initialState
    }
}