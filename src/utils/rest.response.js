export const ok = (res, data) => {
    res.status(200).send(data)
}

export const created = (res, data) => {

}
export const noContent = (res) => {
    res.status(204).send()
}
export const notFound = (res) => {

}
export const unauthorized = (res) => {

}
export const forbidden = (res) => {

}
export const internalServerError = (res, customError) => {
    res.status(500).send({ message: customError ? customError : 'Internal error' })
}

//export default {
//    ok, created, noContent, notFound, unauthorized, forbidden, internalServerError
//}