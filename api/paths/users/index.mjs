export default function () {
    function POST(req, res, _next) {
        res.status(200).json({});
    }

    return {
        POST,
    };
}
