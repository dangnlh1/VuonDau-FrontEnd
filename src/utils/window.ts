let openedWindow: Window | null = null;
export function openWindow(paymentUrl: string) {
    openedWindow = window.open(paymentUrl, 'payment', 'width=500,height=500')
}
export function closeWindow() {
    console.log('close window', openedWindow);

    openedWindow?.close();
}
