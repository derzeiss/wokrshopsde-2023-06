let nextId = 1;
/**
 * Returns a unique Id incrementing each time it's called.
 * @param prefix optional text prefix, defaults to 'el'
 * @example getNextId() -> 'el-1'; getNextId('foo') -> 'foo-2'; getNextId() -> 'el-3'
 * @returns Unique Id, prefixed by {@link prefix} or 'el'.
 */
export const getNextId = (prefix = "el") => `${prefix}-${nextId++}`;
