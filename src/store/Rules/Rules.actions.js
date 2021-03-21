export function addRule (rule){
    return{
        type: 'ADD_RULE',
        payload: rule,
    }
}