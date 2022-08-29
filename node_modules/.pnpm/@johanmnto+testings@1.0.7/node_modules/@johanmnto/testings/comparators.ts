/** # eqOb
 * **this function tries to determine if two objects with different references are matching**
 */
export function eqOb(
  remote: { [v: string]: any },
  local: { [v: string]: any }
): boolean {
  let ok = true;

  for (const attributeName in local) {
    if (ok) {
      if (typeof local[attributeName] === "object") {
        if (
          remote[attributeName] !== undefined &&
          local[attributeName] !== undefined
        ) {
          ok = eqOb(remote[attributeName], local[attributeName]);
        } else ok = false;
      } else ok = local[attributeName] === remote[attributeName];
    }
  }

  return ok;
}

/** #autoCp
 * **this function automatically determines the best way to check if 2 values are the same**
 */
export function autoCp(remote: any, local: any): boolean {
  if (typeof remote === "object" && typeof local === "object")
    return eqOb(remote, local);
  else return remote === local;
}
