import apiClient from '../utils/apiClient'

export interface PostPayload {
  caption: string
  challengeId?: string | null
  mediaUrl?: string
}

export const socialService = {
  async uploadImage(file: File | Blob, filename = 'upload.jpg') {
    const formData = new FormData()
    formData.append('image', file, filename)

    return apiClient('/posts/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  async createPost(payload: PostPayload) {
    return apiClient('/posts', {
      method: 'POST',
      body: payload
    })
  },

  async listPosts(params: { skip?: number; take?: number } = {}) {
    return apiClient('/posts', {
      query: params
    })
  },

  async listFollowingPosts(params: { skip?: number; take?: number } = {}) {
    return apiClient('/posts/following', {
      query: params
    })
  },

  async listMyPosts(params: { skip?: number; take?: number; date?: string } = {}) {
    return apiClient('/posts/me', {
      query: params
    })
  },

  async getPost(id: string) {
    return apiClient(`/posts/${id}`)
  },

  async deletePost(id: string) {
    return apiClient(`/posts/${id}`, {
      method: 'DELETE'
    })
  },

  async likePost(id: string) {
    return apiClient(`/posts/${id}/like`, {
      method: 'POST'
    })
  },

  async unlikePost(id: string) {
    return apiClient(`/posts/${id}/like`, {
      method: 'DELETE'
    })
  },

  async listComments(postId: string, params: { skip?: number; take?: number } = {}) {
    return apiClient(`/posts/${postId}/comments`, {
      query: params
    })
  },

  async createComment(postId: string, payload: { body: string }) {
    return apiClient(`/posts/${postId}/comments`, {
      method: 'POST',
      body: payload
    })
  },

  async deleteComment(postId: string, commentId: string) {
    return apiClient(`/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE'
    })
  },

  async followUser(userId: string) {
    return apiClient(`/users/${userId}/follow`, {
      method: 'POST'
    })
  },

  async unfollowUser(userId: string) {
    return apiClient(`/users/${userId}/follow`, {
      method: 'DELETE'
    })
  },

  async getUserProfile(userId: string) {
    return apiClient(`/users/${userId}`)
  },

  async searchUsers(params: { q?: string; skip?: number; take?: number } = {}) {
    return apiClient('/users/search', {
      query: params
    })
  },

  async suggestedUsers(params: { skip?: number; take?: number } = {}) {
    return apiClient('/users/suggested', {
      query: params
    })
  },

  async getFollowers(userId: string, params: { skip?: number; take?: number } = {}) {
    return apiClient(`/users/${userId}/followers`, {
      query: params
    })
  },

  async getFollowing(userId: string, params: { skip?: number; take?: number } = {}) {
    return apiClient(`/users/${userId}/following`, {
      query: params
    })
  },

  async getMySocialProfile() {
    const profile = await apiClient('/me/profile')
    if (!profile?.userId) return null
    return apiClient(`/users/${profile.userId}`)
  }
}
