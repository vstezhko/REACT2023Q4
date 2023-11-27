export const getValueByKeyBeginning = <ObjectType>(
  partOfKey: string,
  object: Record<string, ObjectType>
): ObjectType | null => {
  const dataKey = Object.keys(object).findLast((key) => key.startsWith(partOfKey));
  if (dataKey && object[dataKey]) {
    return object[dataKey];
  } else {
    return null;
  }
};
