const { getUserId, addFriendRelationship, getAllFriends, checkIfFriendshipExists } = require('../../database/controllers');

module.exports.getAllFriends = async (req, res) => {
  try {
    const { userID } = req.params;
    res.status(200).json(await getAllFriends(userID));
  } catch (err) {
    res.status(500).send('server error');
  }
};

module.exports.addFriend = async (req, res) => {
  try {
    const { userID } = req.params;
    const { friendUsername } = req.body;
    const friendID = await getUserId(friendUsername);
    if (friendID === null) {
      res.status(200).send('username not found');
      return;
    }
    if (friendID === userID) {
      res.status(200).send('you can\'t add yourself as a friend');
      return;
    }
    const doesFriendshipAlreadyExist = await checkIfFriendshipExists(userID, friendID) !== null;
    if (doesFriendshipAlreadyExist) {
      res.status(200).send('user is already your friend');
      return;
    }
    await addFriendRelationship(userID, friendID);
    res.status(201).send('added friend');
  } catch {
    res.status(500).send('server error');
  }
};
