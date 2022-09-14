import * as vscode from 'vscode';

export function showLoadingWithProgress(callback: () => void): void {
    vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'Loading',
            cancellable: false
        },
        async () => {
            await callback();
        })
}