const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).send('Access denied. No role found.');
        }
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).send('Access denied. You do not have the required role.');
        }
        next();
    };
};
module.exports = authorizeRole;
