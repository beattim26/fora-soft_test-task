const checkName = (name) => {
  if (!name) return true;
  return name.match(/^[A-Za-z0-9_]+$/) ? true : false;
};

export { checkName };
