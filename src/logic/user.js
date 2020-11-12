const allowedUpdateForUser = (updates) => {
  const allowedUpdates = [
    "email",
    "phone",
    "firstName",
    "lastName",
    "birthDate",
    "password",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  return isValidOperation;
};

module.exports = { allowedUpdateForUser };
