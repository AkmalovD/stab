// Mock reset password — always succeeds (no backend needed)
export async function resetPassword(_email: string) {
    return { success: true, error: null }
}
