module.exports = {
    default : async (req) => {
        let data = {};
        data.me = req.user;
        return data;
    }
}