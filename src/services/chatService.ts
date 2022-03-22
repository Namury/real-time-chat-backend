export async function chatService() {
  try {
    const courses = "awe"
    return { status: true, courses };
  } catch (err: any) {
    return { status: false, error: err };
  }
}
