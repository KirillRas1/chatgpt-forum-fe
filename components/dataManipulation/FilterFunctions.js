export const filterOlderThan = (items, thresholdDate) =>
  items.filter(
    item =>
      new Date(item.created_at).getTime() >= new Date(thresholdDate).getTime()
  );
