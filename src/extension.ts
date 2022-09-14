import * as vscode from 'vscode';
import { NodeListProvider } from './nodeList';
import { Entry } from './types';

export function activate(context: vscode.ExtensionContext) {
	
	const nodeListProvider = new NodeListProvider();
	vscode.window.registerTreeDataProvider('nodeList', nodeListProvider);
	vscode.commands.registerCommand('nodeList.refreshAllList', () => nodeListProvider.refreshAllLists());
	vscode.commands.registerCommand('nodeList.refreshList', (entry: Entry) => nodeListProvider.refreshList(entry.id))
	vscode.commands.registerCommand('nodeList.addItem', (entry: Entry) => nodeListProvider.addItem(entry.id));
	vscode.commands.registerCommand('nodeList.fetchItem', (entry: Entry) => nodeListProvider.fetchItem(entry.id));
	vscode.commands.registerCommand('nodeList.deleteItem', (entry: Entry) => nodeListProvider.deleteItem(entry.id))
	
}

export function deactivate() {}
