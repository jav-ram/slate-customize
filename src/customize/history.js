import { Editor, Operation, Path } from 'slate'

export const HISTORY = new WeakMap()
export const SAVING = new WeakMap()
export const MERGING = new WeakMap()

const HistoryEditor = {
  /**
   * Check if a value is a `HistoryEditor` object.
   */

  isHistoryEditor(value) {
    return History.isHistory(value.history) && Editor.isEditor(value)
  },

  /**
   * Get the merge flag's current value.
   */

  isMerging(editor) {
    return MERGING.get(editor)
  },

  /**
   * Get the saving flag's current value.
   */

  isSaving(editor) {
    return SAVING.get(editor)
  },

  /**
   * Redo to the previous saved state.
   */

  redo(editor) {
    editor.redo()
  },

  /**
   * Undo to the previous saved state.
   */

  undo(editor) {
    editor.undo()
  },

  /**
   * Apply a series of changes inside a synchronous `fn`, without merging any of
   * the new operations into previous save point in the history.
   */

  withoutMerging(editor, fn) {
    const prev = HistoryEditor.isMerging(editor)
    MERGING.set(editor, false)
    fn()
    MERGING.set(editor, prev)
  },

  /**
   * Apply a series of changes inside a synchronous `fn`, without saving any of
   * their operations into the history.
   */

  withoutSaving(editor, fn) {
    const prev = HistoryEditor.isSaving(editor)
    SAVING.set(editor, false)
    fn()
    SAVING.set(editor, prev)
  },
}


/**
 * The `withHistory` plugin keeps track of the operation history of a Slate
 * editor as operations are applied to it, using undo and redo stacks.
 */

export const withHistory = (editor, setAction) => {
  const e = editor;
  const { apply } = e;

  e.history = { undos: [], redos: [] }

  e.redo = () => {
    const { history } = e
    const { redos } = history

    if (redos.length > 0) {
      const batch = redos[redos.length - 1]

      HistoryEditor.withoutSaving(e, () => {
        Editor.withoutNormalizing(e, () => {
          for (const op of batch) {
            e.apply(op)
          }
        })
      })

      history.redos.pop()
      history.undos.push(batch)
      setAction(true);
    }
  }

  e.undo = () => {
    const { history } = e
    const { undos } = history

    if (undos.length > 0) {
      const batch = undos[undos.length - 1]

      HistoryEditor.withoutSaving(e, () => {
        Editor.withoutNormalizing(e, () => {
          const inverseOps = batch.map(Operation.inverse).reverse()

          for (const op of inverseOps) {
            // If the final operation is deselecting the editor, skip it. This is
            if (
              op === inverseOps[inverseOps.length - 1] &&
              op.type === 'set_selection' &&
              op.newProperties == null
            ) {
              continue
            } else {
              e.apply(op)
            }
          }
        })
      })

      history.redos.push(batch)
      history.undos.pop()
      setAction(true);
    }
  }

  e.apply = (op) => {
    const { operations, history } = e
    const { undos } = history
    const lastBatch = undos[undos.length - 1]
    const lastOp = lastBatch && lastBatch[lastBatch.length - 1]
    const overwrite = shouldOverwrite(op, lastOp)
    let save = HistoryEditor.isSaving(e)
    let merge = HistoryEditor.isMerging(e)

    if (save == null) {
      save = shouldSave(op, lastOp)
    }

    if (save) {
      if (merge == null) {
        if (lastBatch == null) {
          merge = false
        } else if (operations.length !== 0) {
          merge = true
        } else {
          merge = shouldMerge(op, lastOp) || overwrite
        }
      }

      if (lastBatch && merge) {
        if (overwrite) {
          lastBatch.pop()
        }

        lastBatch.push(op)
      } else {
        const batch = [op]
        undos.push(batch)
      }

      while (undos.length > 100) {
        undos.shift()
      }

      if (shouldClear(op)) {
        history.redos = []
      }
    }

    apply(op)
  }

  return e
}

/**
 * Check whether to merge an operation into the previous operation.
 */

const shouldMerge = (op, prev) => {
  if (op.type === 'set_selection') {
    return true
  }

  if (
    prev &&
    op.type === 'insert_text' &&
    prev.type === 'insert_text' &&
    op.offset === prev.offset + prev.text.length &&
    Path.equals(op.path, prev.path)
  ) {
    return true
  }

  if (
    prev &&
    op.type === 'remove_text' &&
    prev.type === 'remove_text' &&
    op.offset + op.text.length === prev.offset &&
    Path.equals(op.path, prev.path)
  ) {
    return true
  }

  return false
}

/**
 * Check whether an operation needs to be saved to the history.
 */

const shouldSave = (op, prev) => {
  if (op.type === 'set_selection' && op.newProperties == null) {
    return false
  }

  return true
}

/**
 * Check whether an operation should overwrite the previous one.
 */

const shouldOverwrite = (
  op,
  prev
) => {
  if (prev && op.type === 'set_selection' && prev.type === 'set_selection') {
    return true
  }

  return false
}

/**
 * Check whether an operation should clear the redos stack.
 */

const shouldClear = (op) => {
  if (op.type === 'set_selection') {
    return false
  }

  return true
}