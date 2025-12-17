const asyncHandler = function (fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }   
    };
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
