const asyncHandler = (fn) => (req, res, next) => {
    return Promise
    .resolve(fn(req, res, next))
    .catch((error) => {
        res.status(500).json({ message: error.message, success: false });
    });
}


export default asyncHandler;
//const asyncHandler= () => {}
//const asyncHandler= (fn) => {() => {}}//{}removed
//const asyncHandler= (fn) => (req, res, next) => {}
//how we got to the following lines of code

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(500).json({ message: error.message, success: false });
//     }
// }
