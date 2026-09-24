export interface PinnedComment {
  user: string
  comment: string
}

export type CommentsByObject = Record<string, PinnedComment[]>

