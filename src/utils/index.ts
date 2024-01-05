export async function fetchCalls() {
  try {
    const response = await fetch(
      `https://cerulean-marlin-wig.cyclic.app/activities`
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    return { message: `${error}` };
  }
}
