const { sendDM, getAllDMsBetween, getUserById } = require('../../database/controllers');

module.exports.sendDM = async (req, res) => {
  console.log(req.body);
  const { userID, recipientID, message } = req.body;
  console.log(!userID || !recipientID || !message);
  if (!userID || !recipientID || !message) {
    res.status(400).send('missing input');
    return;
  }
  await sendDM(userID, recipientID, message);
  res.status(201).end();
};

module.exports.getAllDMsBetween = async (req, res) => {
  const { userID, recipientID } = req.params;
  let messages = await getAllDMsBetween(userID, recipientID) || [];
  const user = await getUserById(userID);
  const recipient = await getUserById(recipientID);
  messages = messages.map(({
    id,
    message,
    userid,
    date,
  }) => {
    const author = userid === user.id ? user : recipient;
    return {
      id,
      message,
      author,
      date,
    };
  });
  res.status(200).json(messages);
};
