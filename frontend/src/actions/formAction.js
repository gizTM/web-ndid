const updateInput = (value) => ({
    type: 'UPDATE_INPUT',
    value: value
})

const callLoading = (value) => ({
    type: 'LOADING',
    loading: value
})

export { updateInput,callLoading }