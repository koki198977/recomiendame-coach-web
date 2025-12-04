<template>
  <div class="space-y-8">
    <!-- Header -->
    <section class="rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-primary-500">
            Comunidad
          </p>
          <h1 class="mt-3 text-3xl font-semibold text-gray-900">
            Conecta y comparte tu progreso
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Únete a la comunidad de Recomiéndame Coach
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-primary-200 hover:text-primary-600"
            @click="showUsersModal = true"
          >
            🔍 Buscar usuarios
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600"
            @click="showCreateModal = true"
          >
            ✨ Crear post
          </button>
        </div>
      </div>
    </section>

    <!-- Feed Type Selector -->
    <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex rounded-2xl bg-gray-50 p-1">
        <button
          v-for="feed in feedTypes"
          :key="feed.value"
          class="flex-1 rounded-xl px-4 py-2 text-sm font-medium transition"
          :class="feedType === feed.value 
            ? 'bg-primary-500 text-white shadow-sm' 
            : 'text-gray-600 hover:text-primary-600'"
          @click="changeFeedType(feed.value)"
        >
          {{ feed.icon }} {{ feed.label }}
        </button>
      </div>
    </section>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-gray-500">
      <span class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-400"></span>
      <p class="mt-6 text-sm">Cargando feed...</p>
    </div>

    <!-- Error state -->
    <section v-if="error" class="rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700">
      <div class="flex items-start gap-3">
        <span class="mt-0.5 text-lg">⚠️</span>
        <div>
          <p class="font-medium">Error al cargar el feed</p>
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
        <button class="ml-auto text-sm underline" @click="error = ''">
          Ocultar
        </button>
      </div>
    </section>

    <!-- Posts Feed -->
    <div v-if="!loading" class="space-y-6">
      <div v-if="posts.length > 0" class="space-y-6">
        <article
          v-for="post in posts"
          :key="post.id"
          class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md"
        >
          <!-- Post Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                <span class="text-white font-semibold">
                  {{ getAuthorInitials(post) }}
                </span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ getAuthorName(post) }}</h3>
                <p class="text-sm text-gray-500">{{ formatDate(post.createdAt) }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <button
                v-if="feedType === 'all' && !isMyPost(post)"
                class="rounded-xl px-3 py-1 text-xs font-medium transition"
                :class="isFollowingAuthor(post) 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'bg-primary-500 text-white hover:bg-primary-600'"
                @click="toggleFollow(post)"
              >
                {{ isFollowingAuthor(post) ? 'Siguiendo' : 'Seguir' }}
              </button>
              
              <button
                v-if="isMyPost(post)"
                class="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                @click="deletePost(post)"
              >
                🗑️
              </button>
            </div>
          </div>

          <!-- Post Content -->
          <div class="mb-4">
            <p class="text-gray-900 leading-relaxed">{{ post.content }}</p>
            
            <!-- Post Image -->
            <div v-if="post.imageUrl" class="mt-4">
              <img 
                :src="post.imageUrl" 
                :alt="post.content"
                class="w-full max-w-md rounded-2xl object-cover"
              />
            </div>

            <!-- Post Tags -->
            <div v-if="post.tags && post.tags.length > 0" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Post Actions -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center gap-6">
              <button
                class="flex items-center gap-2 text-sm font-medium transition"
                :class="post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'"
                @click="toggleLike(post)"
              >
                <span>{{ post.isLiked ? '❤️' : '🤍' }}</span>
                <span>{{ post.likesCount || 0 }}</span>
              </button>
              
              <button
                class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition"
                @click="openComments(post)"
              >
                <span>💬</span>
                <span>{{ post.commentsCount || 0 }}</span>
              </button>
            </div>
            
            <button
              class="text-sm font-medium text-gray-600 hover:text-primary-600 transition"
            >
              📤 Compartir
            </button>
          </div>
        </article>

        <!-- Load More Button -->
        <div v-if="hasMorePosts" class="text-center">
          <button
            class="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:border-primary-200 hover:text-primary-600"
            @click="loadMorePosts"
            :disabled="loadingMore"
          >
            <span v-if="loadingMore" class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500"></span>
            {{ loadingMore ? 'Cargando...' : 'Cargar más posts' }}
          </button>
        </div>

        <!-- End of Feed -->
        <div v-if="!hasMorePosts && posts.length > 5" class="text-center py-8">
          <p class="text-gray-500">¡Has visto todos los posts! 🎉</p>
        </div>
      </div>

      <!-- Empty State -->
      <section
        v-else
        class="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-8 py-16 text-center shadow-sm"
      >
        <div class="rounded-2xl border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600">
          Sin posts
        </div>
        <h2 class="mt-6 text-2xl font-semibold text-gray-900">
          ¡Sé el primero en compartir!
        </h2>
        <p class="mt-3 max-w-xl text-sm text-gray-600">
          Comparte tu progreso, recetas o motivación con la comunidad
        </p>
        <button
          class="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600"
          @click="showCreateModal = true"
        >
          ✨ Crear mi primer post
        </button>
      </section>
    </div>

    <!-- Create Post Modal -->
    <transition name="fade">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
          <button
            class="absolute right-5 top-5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
            @click="closeCreateModal"
          >
            Cerrar
          </button>
          
          <h3 class="text-xl font-semibold text-gray-900">Crear nuevo post</h3>
          <p class="mt-2 text-sm text-gray-600">
            Comparte tu experiencia con la comunidad
          </p>
          
          <form class="mt-6 space-y-4" @submit.prevent="createPost">
            <div>
              <label class="text-xs uppercase tracking-[0.35em] text-gray-400">Contenido</label>
              <textarea
                v-model="newPost.content"
                rows="4"
                class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="¿Qué quieres compartir hoy?"
                required
              ></textarea>
            </div>
            
            <div>
              <label class="text-xs uppercase tracking-[0.35em] text-gray-400">Tags (opcional)</label>
              <input
                v-model="newPost.tags"
                type="text"
                class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="progreso, receta, motivacion (separados por comas)"
              />
            </div>
            
            <button
              type="submit"
              class="w-full rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="creatingPost || !newPost.content.trim()"
            >
              {{ creatingPost ? 'Publicando...' : 'Publicar post' }}
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Comments Modal -->
    <transition name="fade">
      <div
        v-if="showCommentsModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 class="text-xl font-semibold text-gray-900">Comentarios</h3>
            <button
              class="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
              @click="closeComments"
            >
              Cerrar
            </button>
          </div>
          
          <div class="max-h-[50vh] overflow-y-auto p-6">
            <div v-if="comments.length > 0" class="space-y-4">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="rounded-xl bg-gray-50 p-4"
              >
                <div class="flex items-start gap-3">
                  <div class="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                    <span class="text-white text-xs font-semibold">
                      {{ comment.authorName?.charAt(0).toUpperCase() || 'U' }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium text-gray-900">{{ comment.authorName || 'Usuario' }}</span>
                      <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-gray-700">{{ comment.content }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-gray-500">No hay comentarios aún</p>
            </div>
          </div>
          
          <div class="border-t border-gray-200 p-6">
            <form class="flex gap-3" @submit.prevent="addComment">
              <input
                v-model="newComment"
                type="text"
                class="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Escribe un comentario..."
                :disabled="addingComment"
              />
              <button
                type="submit"
                class="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="addingComment || !newComment.trim()"
              >
                {{ addingComment ? '...' : 'Enviar' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Users Search Modal -->
    <transition name="fade">
      <div
        v-if="showUsersModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 class="text-xl font-semibold text-gray-900">Buscar usuarios</h3>
            <button
              class="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
              @click="showUsersModal = false"
            >
              Cerrar
            </button>
          </div>
          
          <div class="p-6">
            <input
              v-model="userSearchQuery"
              type="text"
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Buscar por nombre o email..."
              @input="searchUsers"
            />
          </div>
          
          <div class="max-h-[50vh] overflow-y-auto p-6 pt-0">
            <div v-if="searchResults.length > 0" class="space-y-3">
              <div
                v-for="user in searchResults"
                :key="user.id"
                class="flex items-center justify-between rounded-xl border border-gray-200 p-4"
              >
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <span class="text-white font-semibold">
                      {{ user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U' }}
                    </span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ user.name || 'Usuario' }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
                
                <button
                  class="rounded-xl px-4 py-2 text-sm font-medium transition"
                  :class="user.isFollowing 
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                    : 'bg-primary-500 text-white hover:bg-primary-600'"
                  @click="toggleFollowUser(user)"
                >
                  {{ user.isFollowing ? 'Siguiendo' : 'Seguir' }}
                </button>
              </div>
            </div>
            
            <div v-else-if="userSearchQuery" class="text-center py-8">
              <p class="text-gray-500">No se encontraron usuarios</p>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-gray-500">Escribe para buscar usuarios</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useState } from '#imports'
import { authService } from '~/services/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const router = useRouter()
const loading = ref(true)
const error = ref('')

const API_BASE = 'https://api-coach.recomiendameapp.cl'

const feedType = ref('all')
const posts = ref([])
const currentPage = ref(0)
const hasMorePosts = ref(true)
const loadingMore = ref(false)

const showCreateModal = ref(false)
const showCommentsModal = ref(false)
const showUsersModal = ref(false)

const selectedPost = ref(null)
const comments = ref([])
const newComment = ref('')
const addingComment = ref(false)

const creatingPost = ref(false)
const newPost = reactive({
  content: '',
  tags: ''
})

const userSearchQuery = ref('')
const searchResults = ref([])
const currentUserId = ref(null)
const currentUserEmail = ref(null)
const followingUsers = ref(new Set())

const authUser = useState('auth-user', () => authService.getCachedUser())

const feedTypes = [
  { value: 'all', label: 'Todos', icon: '🌍' },
  { value: 'following', label: 'Siguiendo', icon: '👥' },
  { value: 'mine', label: 'Míos', icon: '👤' }
]

const POSTS_PER_PAGE = 10

const getAuthToken = () => {
  if (!process.client) return ''
  return localStorage.getItem('recomiendame_access_token') || ''
}

const fetchWithAuth = async (path, options = {}) => {
  const token = getAuthToken()
  if (!token) {
    throw new Error('No se encontró tu sesión. Inicia sesión nuevamente.')
  }

  try {
    return await $fetch(path.startsWith('http') ? path : `${API_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    })
  } catch (err) {
    if (err?.status === 401) {
      if (process.client) {
        localStorage.removeItem('recomiendame_access_token')
        localStorage.removeItem('recomiendame_refresh_token')
        localStorage.removeItem('recomiendame_user_data')
      }
      authUser.value = null
      router.push('/login')
    }
    throw err
  }
}

const loadCurrentUser = async () => {
  try {
    const profileData = await fetchWithAuth('/me/profile')
    currentUserId.value = profileData.userId
    currentUserEmail.value = profileData.email || authUser.value?.email
  } catch (err) {
    console.log('Error loading current user:', err)
    currentUserEmail.value = authUser.value?.email
  }
}

const loadFollowingUsers = async () => {
  try {
    if (!currentUserId.value) return
    const response = await fetchWithAuth(`/users/${currentUserId.value}/following?skip=0&take=100`)
    
    // Manejar diferentes estructuras de respuesta
    let followingList = []
    if (Array.isArray(response)) {
      followingList = response
    } else if (response && Array.isArray(response.items)) {
      followingList = response.items
    } else if (response && Array.isArray(response.following)) {
      followingList = response.following
    }
    
    const followingIds = new Set(followingList.map(user => user.id))
    followingUsers.value = followingIds
    
    console.log('Following users loaded:', followingIds.size)
  } catch (err) {
    console.log('Error loading following users:', err)
  }
}

const loadFeed = async (isRefresh = false) => {
  try {
    if (!isRefresh) loading.value = true
    
    let response
    if (feedType.value === 'all') {
      response = await fetchWithAuth(`/posts?skip=0&take=${POSTS_PER_PAGE}`)
    } else if (feedType.value === 'following') {
      response = await fetchWithAuth(`/posts/following?skip=0&take=${POSTS_PER_PAGE}`)
    } else {
      response = await fetchWithAuth(`/posts/me?skip=0&take=${POSTS_PER_PAGE}`)
    }
    
    // Manejar diferentes estructuras de respuesta
    if (Array.isArray(response)) {
      posts.value = response
    } else if (response && Array.isArray(response.items)) {
      posts.value = response.items
    } else if (response && Array.isArray(response.posts)) {
      posts.value = response.posts
    } else {
      posts.value = []
    }
    
    currentPage.value = 0
    hasMorePosts.value = posts.value.length >= POSTS_PER_PAGE
    
    console.log(`Loaded ${posts.value.length} posts for ${feedType.value} feed`)
  } catch (err) {
    console.error('Error loading feed:', err)
    error.value = err?.data?.message || err?.statusMessage || err?.message || 'No se pudo cargar el feed.'
    posts.value = []
  } finally {
    loading.value = false
  }
}

const loadMorePosts = async () => {
  if (loadingMore.value || !hasMorePosts.value) return

  try {
    loadingMore.value = true
    const nextPage = currentPage.value + 1
    const skip = nextPage * POSTS_PER_PAGE
    
    let response
    if (feedType.value === 'all') {
      response = await fetchWithAuth(`/posts?skip=${skip}&take=${POSTS_PER_PAGE}`)
    } else if (feedType.value === 'following') {
      response = await fetchWithAuth(`/posts/following?skip=${skip}&take=${POSTS_PER_PAGE}`)
    } else {
      response = await fetchWithAuth(`/posts/me?skip=${skip}&take=${POSTS_PER_PAGE}`)
    }
    
    // Manejar diferentes estructuras de respuesta
    let newPosts = []
    if (Array.isArray(response)) {
      newPosts = response
    } else if (response && Array.isArray(response.items)) {
      newPosts = response.items
    } else if (response && Array.isArray(response.posts)) {
      newPosts = response.posts
    }
    
    if (newPosts.length > 0) {
      posts.value = [...posts.value, ...newPosts]
      currentPage.value = nextPage
      hasMorePosts.value = newPosts.length >= POSTS_PER_PAGE
    } else {
      hasMorePosts.value = false
    }
    
    console.log(`Loaded ${newPosts.length} more posts`)
  } catch (err) {
    console.error('Error loading more posts:', err)
  } finally {
    loadingMore.value = false
  }
}

const changeFeedType = (type) => {
  feedType.value = type
  loadFeed()
}

const getAuthorName = (post) => {
  return post.author?.name || post.authorName || 'Usuario'
}

const getAuthorInitials = (post) => {
  const name = getAuthorName(post)
  return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2) || 'U'
}

const isMyPost = (post) => {
  if (currentUserId.value) {
    return post.authorId === currentUserId.value || post.author?.id === currentUserId.value
  }
  if (currentUserEmail.value) {
    return post.authorName === currentUserEmail.value || post.author?.email === currentUserEmail.value
  }
  return false
}

const isFollowingAuthor = (post) => {
  const authorId = post.authorId || post.author?.id
  return authorId ? followingUsers.value.has(authorId) : false
}

const toggleLike = async (post) => {
  try {
    if (post.isLiked) {
      await fetchWithAuth(`/posts/${post.id}/unlike`, { method: 'DELETE' })
      post.likesCount = Math.max(0, (post.likesCount || 0) - 1)
    } else {
      await fetchWithAuth(`/posts/${post.id}/like`, { method: 'POST' })
      post.likesCount = (post.likesCount || 0) + 1
    }
    post.isLiked = !post.isLiked
  } catch (err) {
    console.error('Error toggling like:', err)
  }
}

const toggleFollow = async (post) => {
  const authorId = post.authorId || post.author?.id
  if (!authorId) return

  try {
    if (isFollowingAuthor(post)) {
      await fetchWithAuth(`/users/${authorId}/unfollow`, { method: 'DELETE' })
      followingUsers.value.delete(authorId)
    } else {
      await fetchWithAuth(`/users/${authorId}/follow`, { method: 'POST' })
      followingUsers.value.add(authorId)
    }
  } catch (err) {
    console.error('Error toggling follow:', err)
  }
}

const deletePost = async (post) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return

  try {
    await fetchWithAuth(`/posts/${post.id}`, { method: 'DELETE' })
    posts.value = posts.value.filter(p => p.id !== post.id)
  } catch (err) {
    console.error('Error deleting post:', err)
    error.value = 'No se pudo eliminar el post.'
  }
}

const createPost = async () => {
  if (!newPost.content.trim()) return

  try {
    creatingPost.value = true
    
    const tags = newPost.tags 
      ? newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : []

    const response = await fetchWithAuth('/posts', {
      method: 'POST',
      body: {
        content: newPost.content.trim(),
        tags
      }
    })

    posts.value.unshift(response)
    closeCreateModal()
  } catch (err) {
    console.error('Error creating post:', err)
    error.value = 'No se pudo crear el post.'
  } finally {
    creatingPost.value = false
  }
}

const closeCreateModal = () => {
  showCreateModal.value = false
  newPost.content = ''
  newPost.tags = ''
}

const openComments = async (post) => {
  selectedPost.value = post
  showCommentsModal.value = true
  
  try {
    const response = await fetchWithAuth(`/posts/${post.id}/comments`)
    
    // Manejar diferentes estructuras de respuesta
    if (Array.isArray(response)) {
      comments.value = response
    } else if (response && Array.isArray(response.items)) {
      comments.value = response.items
    } else if (response && Array.isArray(response.comments)) {
      comments.value = response.comments
    } else {
      comments.value = []
    }
  } catch (err) {
    console.error('Error loading comments:', err)
    comments.value = []
  }
}

const closeComments = () => {
  showCommentsModal.value = false
  selectedPost.value = null
  comments.value = []
  newComment.value = ''
}

const addComment = async () => {
  if (!newComment.value.trim() || !selectedPost.value) return

  try {
    addingComment.value = true
    
    const response = await fetchWithAuth(`/posts/${selectedPost.value.id}/comments`, {
      method: 'POST',
      body: {
        content: newComment.value.trim()
      }
    })

    comments.value.push(response)
    selectedPost.value.commentsCount = (selectedPost.value.commentsCount || 0) + 1
    
    // Update the post in the main feed
    const postIndex = posts.value.findIndex(p => p.id === selectedPost.value.id)
    if (postIndex !== -1) {
      posts.value[postIndex].commentsCount = selectedPost.value.commentsCount
    }
    
    newComment.value = ''
  } catch (err) {
    console.error('Error adding comment:', err)
  } finally {
    addingComment.value = false
  }
}

const searchUsers = async () => {
  if (!userSearchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  try {
    const response = await fetchWithAuth(`/users/search?q=${encodeURIComponent(userSearchQuery.value)}`)
    
    // Manejar diferentes estructuras de respuesta
    if (Array.isArray(response)) {
      searchResults.value = response
    } else if (response && Array.isArray(response.items)) {
      searchResults.value = response.items
    } else if (response && Array.isArray(response.users)) {
      searchResults.value = response.users
    } else {
      searchResults.value = []
    }
  } catch (err) {
    console.error('Error searching users:', err)
    searchResults.value = []
  }
}

const toggleFollowUser = async (user) => {
  try {
    if (user.isFollowing) {
      await fetchWithAuth(`/users/${user.id}/unfollow`, { method: 'DELETE' })
      followingUsers.value.delete(user.id)
    } else {
      await fetchWithAuth(`/users/${user.id}/follow`, { method: 'POST' })
      followingUsers.value.add(user.id)
    }
    user.isFollowing = !user.isFollowing
  } catch (err) {
    console.error('Error toggling follow user:', err)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Ahora'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short'
  })
}

onMounted(async () => {
  if (!getAuthToken()) {
    router.push('/login')
    return
  }
  
  authUser.value = authService.getCachedUser()
  await loadCurrentUser()
  await loadFollowingUsers()
  await loadFeed()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>