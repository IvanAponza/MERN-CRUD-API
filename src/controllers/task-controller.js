

export const getTasks = (req, res) => {
    res.send('GET Tasks');
}
export const getTask = (req, res) => {
    res.send('GET Task');
}
export const createTasks = (req, res) => {
    res.send('POST Task');
}
export const updateTasks = (req, res) => {
    res.send('UPDATE Task');
}
export const deleteTasks = (req, res) => {
    res.send('DELETE Task');
}