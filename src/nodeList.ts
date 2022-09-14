import * as vscode from 'vscode';
import { ThemeIcon } from 'vscode';
import { ListApi } from './api';
import { Entry } from './types';
import { v4 as uuidv4 } from 'uuid';
import { findIndexById, showLoadingWithProgress } from './utils';


export class NodeListProvider implements vscode.TreeDataProvider<Entry> {

	state: Entry[] = [];
	private _onDidChangeTreeData: vscode.EventEmitter<Entry | undefined | void> = new vscode.EventEmitter<Entry | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<Entry | undefined | void> = this._onDidChangeTreeData.event;

	refreshAllLists(): void {
		showLoadingWithProgress(() => ListApi.getAllList().then(data => {
				this.state = data;
				this.refresh();
			})
		);
	}

	refreshList(listId: string): void {
		this.fetchItem(listId);
	}

	refresh(data?: Entry): void {
		if (data) {
			this._onDidChangeTreeData.fire(data);
		} else {
			this._onDidChangeTreeData.fire(undefined);
		}
	}
	
	async fetchItem(listId: string) {
		const objIndex = findIndexById(this.state, listId);

		showLoadingWithProgress(() => {
			ListApi.getListItem(listId).then(data => {
				this.state[objIndex].listItems = data;
				this.refresh();
			})
		})
	}

	async addItem(listId: string) {
		const objIndex = findIndexById(this.state, listId);
		const newItemId = uuidv4();
		const newItem: Entry = {
			id: newItemId,
			name: `Item${newItemId}`
		}
		this.state[objIndex].listItems?.push(newItem)
		this.refresh();
	}

	deleteItem(itemId: string) {
		vscode.window
		.showWarningMessage("Do you want delete this item?", {modal: true}, "Yes")
		.then(answer => {
			if (answer === "Yes") {
				this.state.map((list: Entry) => {
					const objIndex = findIndexById(list.listItems!, itemId)
					if (objIndex > -1) { 
						list.listItems?.splice(objIndex, 1);
						this.refresh();
					}
				})
			}
		})
	}

	getTreeItem(element: Entry): vscode.TreeItem {
		if(element.listItems) {
			return new ListContainer(element, {
				command: "nodeList.fetchItem", title: "Fetch Item", arguments: [element]
			});
		}
		return new ListItem(element);
	}

	getChildren(element?: Entry): Thenable<Entry[]> | Entry[] | undefined {
		if (element) {
			if(element.listItems) {
				return element.listItems
			}
		} else {
			if(this.state.length == 0) {
				this.refreshAllLists();
			} else {
				return this.state;
			}
		}
	}
}

export class ListContainer extends vscode.TreeItem {

	constructor(
		public readonly entry: Entry,
		public readonly command?: vscode.Command
	) {
		super(entry.name, vscode.TreeItemCollapsibleState.Collapsed);
		this.id = entry.id;
		this.contextValue = entry.listItems?.length ? 'listContainer' : 'emptyListContainer'
	}

	iconPath = new ThemeIcon("list-tree");
}

export class ListItem extends vscode.TreeItem {

	constructor(
		public readonly  entry: Entry,
		public readonly command?: vscode.Command
	) {
		super(entry.name, vscode.TreeItemCollapsibleState.None);
		this.id = entry.id;
	}

	iconPath = new ThemeIcon("files");
	contextValue = "listItem";
}