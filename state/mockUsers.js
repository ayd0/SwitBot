let mockUsers = [];

module.exports = {
    get: () => mockUsers,
    set: (user) => mockusers.push(user)
};