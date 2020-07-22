import { NotebookPanel, INotebookTracker } from '@jupyterlab/notebook';

import { Cell } from '@jupyterlab/cells';

import { UUID } from '@lumino/coreutils';

import { ArrayExt, toArray } from '@lumino/algorithm';

export function addNotebookId(notebook: NotebookPanel): string {
  const metadata: any | undefined = notebook.model.metadata.get('presto');
  let id: string;

  if (metadata !== undefined) {
    if (metadata.id !== undefined) {
      return metadata.id;
    }
    id = UUID.uuid4();
    notebook.model.metadata.set('presto', { ...metadata, id });
  } else {
    id = UUID.uuid4();
    notebook.model.metadata.set('presto', { id });
  }

  return id;
}

export function getNotebookId(notebook: NotebookPanel): string | undefined {
  const metadata: any | undefined = notebook.model.metadata.get('presto');
  if (metadata === undefined || metadata.id === undefined) {
    return undefined;
  }
  return metadata.id;
}

export function getNotebookById(
  id: string,
  tracker: INotebookTracker
): NotebookPanel | undefined {
  return tracker.find((notebook) => getNotebookId(notebook) === id);
}

export function addCellId(cell: Cell): string {
  const metadata: any | undefined = cell.model.metadata.get('presto');
  let id: string;

  if (metadata !== undefined) {
    if (metadata.id !== undefined) {
      return metadata.id;
    }
    id = UUID.uuid4();
    cell.model.metadata.set('presto', { ...metadata, id });
  } else {
    id = UUID.uuid4();
    cell.model.metadata.set('presto', { id });
  }

  return id;
}

export function getCellId(cell: Cell): string | undefined {
  const metadata: any | undefined = cell.model.metadata.get('presto');
  if (metadata === undefined || metadata.id === undefined) {
    return undefined;
  }
  return metadata.id;
}

export function getCellById(
  id: string,
  tracker: INotebookTracker
): Cell | undefined {
  const notebooks = toArray(tracker.filter(() => true));
  for (const notebook of notebooks) {
    const cells = notebook.content.widgets;
    const value = ArrayExt.findFirstValue(
      cells,
      (cell) => getCellId(cell) === id
    );
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}
